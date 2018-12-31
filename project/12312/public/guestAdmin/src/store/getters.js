const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  homeInfo: state => state.app.homeInfo,
  activeRouter: state => state.app.activeRouter,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters
