let server = require('http')
let router = require('router')
let fs = require('filesystem')

let authPath = new java.io.File(rootPath, 'authorization.json').getAbsolutePath()
let authorizarions = fs.readJson(authPath)

setupMiddlewares(router)
setupRoutes(router)

server.createServer(5000, router)

function setupMiddlewares(router) {
  let auth = require('authentication')

  router.addMiddleware(auth)

  router.addMiddleware(function (params, request, response) {
    let requiredRole = authorizarions[request.requestURI]

    if (!requiredRole) {
      return true
    }

    if (requiredRole !== request.userData.data.role) {
      response.error.json('Authorization failed via middlewares', 401)
      return false
    }

    return true
  })
}

function setupRoutes(router) {
  router.addRoute('/app/prod/getAll', 'app/secure/estoque/produtos/getAll')
}
