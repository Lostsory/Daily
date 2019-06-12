import { login, logout, getInfo } from '@/api'
import { removeToken, setToken } from '@/utils/auth'
import router from '@/router'

const user = {
  state: {
    token: '',
    userInfo: {},
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const { isAdmin } = userInfo
      return login(userInfo).then(res => {
        const { token, userInfo } = res.data
        setToken(token)
        if (res.data.httpCode === '200') {
          commit('SET_TOKEN', token)
          commit('SET_USERINFO', userInfo)
          // 是否为后台管理页面
          if (isAdmin) {
            router.push('/admin/homeSetting')
          }
        }
      })
    },
    // 退出登录
    Logout({ commit }) {
      const token = ''
      setToken(token)
      commit('SET_TOKEN', token)
      router.push('/login')
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut() {
      logout().then(() => {
        router.push({ path: '/login' })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
