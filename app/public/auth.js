let auth = require('authentication')
let db = require('database').createDbInstance(getConfig().database)

let ERROR_USUARIO_SENHA_REQUIRED = 'Os parâmetros username e password são requeridos'
let ERROR_USUARIO_SENHA_INVALIDOS = 'Usuário ou senha inválidos'

function login (params, request, response) {
  if (!params.username || !params.password) {
    response.error.json(ERROR_USUARIO_SENHA_REQUIRED)
    return
  }

  let rs = db.execute('select * from users where username = :username', {
    username: params.username
  })

  if (rs.length == 0) {
    response.error.json(ERROR_USUARIO_SENHA_INVALIDOS)
    return
  }

  let user = rs[0]

  if (user.password != params.password) {
    response.error.json(ERROR_USUARIO_SENHA_INVALIDOS)
    return
  }

  auth.createAuthentication(params, request, response, user.id, 'thrust-web-gdg', {
    username: user.username,
    role: user.role
  })

  response.json({
    loggedIn: true
  })
}

function logout (params, request, response) {
  auth.destroyAuthentication(params, request, response)
}

exports = {
  login: login,
  logout: logout
}
