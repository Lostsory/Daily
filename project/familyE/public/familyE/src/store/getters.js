const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  homeInfo: state => state.app.homeInfo,
  activeRouter: state => state.app.activeRouter,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo
}
export default getters
