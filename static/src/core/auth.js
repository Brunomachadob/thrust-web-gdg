export default class VueAuth {
  static install (Vue) {
    let loggedIn = (window.sessionStorage.getItem('loggedIn') === 'true')

    Vue.$auth = {
      loggedIn: function () {
        return loggedIn
      },
      login: function () {
        loggedIn = true
        window.sessionStorage.setItem('loggedIn', 'true')
      },
      logout: function (cb) {
        loggedIn = false
        window.sessionStorage.setItem('loggedIn', 'false')
      }
    }
  }
}
