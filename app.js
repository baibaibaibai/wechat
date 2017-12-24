/**
 * Created by 白 on 2017/12/22.
 */
'use strict'
var express = require('express')
var path = require('path')
var wechat = require('./wechat/g')
var utils = require('./libs/utils')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var weixin = require('./weixin')
var config = require('./config')
// var bodyParser = require('body-parser');

var app = new express()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(wechat(config.wechat, weixin.reply))

app.listen(1234)
console.log('listening: 1234')