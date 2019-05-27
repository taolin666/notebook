var http = require('http')
var fs = require('fs')
var express = require('express');
// var path = require('path')
var app = express()
// app.use(express.static(path.join(__dirname, './src/components/HelloWorld.vue')));
app.get()
http.createServer(function(req, res){
  console.log(res.send('1111111111111'))
  res.send('1111111111111')
}).listen('8080')