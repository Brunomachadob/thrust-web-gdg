let etl = require('etl')
let file = new java.io.File(rootPath, 'planilha.xlsx').getAbsolutePath()
let count = 1

let printCPF = function (options, values) {
  show('cpf: ', values.C)
  count++
}

function run(params, request, response) {
  etl({})
    .set_input_xlsx_file(file, 0)
    .take_fields_from_header_row()
    .for_each(printCPF)

  print('rows:', count)

  response.json({ rows: count })
}

exports = {
  run: run
}
