// var http = require('http')
var fs = require('fs')
var express = require('express');
var path = require('path')
// var path = require('path')
var app = express()
// app.use(express.static(path.join(__dirname, './src/components/HelloWorld.vue')));
// app.createServer(function(req, res){
//   console.log(res.send('1111111111111'))
//   app.get('add',function())
//   res.send('1111111111111')
// }).listen('8081')

app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
})
app.get('/add', function (req, res) {
  console.log('req.params2', req.query)
  readFileAndWriteFile(path.join(__dirname, './src/data.json'), function(data) {
    let info = JSON.parse(data || [])
    console.log('info', info)
    info.push(req.query)
    fs.writeFile(path.join(__dirname, './src/data.json'), JSON.stringify(info), function(err) {
      if (err) {
        console.log('err', err)
      }
      res.send('ok')
    })
  })
})
app.post('/query', function(req, res) {
  readFileAndWriteFile(path.join(__dirname, './src/data.json'), function(data) {
    let list = JSON.parse(data || [])
    console.log('list', list)
    res.send(list)
  })
})
app.listen(8081, () => {console.log('连接8081')})
function readFileAndWriteFile(path, callback) {
  fs.readFile(path, 'utf-8', (err , data) => {
    if(err) {
      throw err
    }
    // console.log(data)
    callback(data)
  })
}
