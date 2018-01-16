function hello (params, request, response) {
  response.write("[GET] Hello, you sent me the following params: " + JSON.stringify(params))
}

function helloPost(params, request, response) {
  response.write("[POST] Hello, you sent me the following params: " + JSON.stringify(params))
}

exports = {
  hello: hello,
  POST: {
    helloPost: helloPost
  }
}
