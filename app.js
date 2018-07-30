var http = require('http')
var soap = require('soap')
const chalk = require('chalk')
let url = 'https://test.developer.intuit.com/QBWC/TroubleshootWebServiceFS/Service.asmx?wsdl'
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')

qbws = {
  TroubleshootWebServiceFS: {
    TroubleshootWebServiceFSSoap: {}
  }
}

qbws.TroubleshootWebServiceFS.TroubleshootWebServiceFSSoap.serverVersion =  function (args) {
        console.log('args', args)
        console.log('nick nick...')
        var retVal = 'nick nick'
         return {
              serverVersionResult: { string: retVal }
          };
      }
qbws.TroubleshootWebServiceFS.TroubleshootWebServiceFSSoap.TroubleshootWebServiceFSSoap12 = function (args) {
  console.log('args', args)
  console.log('nick nick...')
  var retVal = 'nick nick'
  return {
      serverVersionResult: { string: retVal }
  };
}

var xml = require('fs').readFileSync('./full_qbwc.wsdl', 'utf8')


var app = express();
app.use(logger('dev'));
app.get('/', (req, res) => res.send('Hello world'))


app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){
    let soapServer = soap.listen(app, '/wsdl', qbws, xml);
    soapServer.log = function soapServerLog(type, data) {
      console.log(type + ': ' + data)
    }

    console.log('express is listening port 8001...')
});