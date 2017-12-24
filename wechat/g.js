/**
 * Created by 白 on 2017/12/22.
 */
'use strict'

var sha1 = require('sha1')
var getRawBody = require('raw-body')
var contentType = require('content-type')
var co = require('co')
var util = require('./util')
var Wechat = require('./wechat')

module.exports = function (opts, handler) {
    var wechat = new Wechat(opts)

    return function (req, res, next) {
        var token = opts.token
        var signature = req.query.signature
        var nonce = req.query.nonce
        var timestamp = req.query.timestamp
        var echostr = req.query.echostr

        var str = [token, timestamp, nonce].sort().join('')
        var sha = sha1(str)

        if (req.method === 'GET') {
            if (sha === signature) {
                res.send(echostr + '')
            } else {
                res.send('wrong')
            }
        } else if (req.method === 'POST') {
            if (sha !== signature) {
                res.send('wrong')
                return false
            }
            co(function* () {
                var data = yield getRawBody(req, {
                    length: req.headers['content-length'],
                    limit: '1mb',
                    encoding: 'utf8'             // 待修改
                })
                var content = yield util.parseXMLAsync(data)
                var message = util.formatMessage(content.xml)
                var context = {
                    req: req,
                    res: res
                }
                context.weixin = message
                handler.call(context, next)   ////////
                wechat.reply.call(context)            ///////
            })
        }
    }
}

