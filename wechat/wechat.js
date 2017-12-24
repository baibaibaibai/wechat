/**
 * Created by 白 on 2017/12/23.
 */
'use strict'

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var util = require('./util')
var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    accessToken: prefix + 'token?grant_type=client_credential'
}

function Wechat(opts) {
    var that = this
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken

    this.getAccessToken()
        .then(function (data) {
            try {
                data = JSON.parse(data)
            } catch (e) {
                return that.updateAccessToken(data)
            }

            if (that.isValidAccessToken(data)) {
                return Promise.resolve(data)
            } else {
                return that.updateAccessToken
            }
        })
        .then(function (data) {
            that.accese_token = data.accese_token
            that.expires_in = data.expires_in

            that.saveAccessToken(data)
        })
}

Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || !data.accese_token || data.expires_in) {
        return false
    }
    var accese_token = data.accese_token
    var expires_in = data.expires_in
    var now = (new Date().getTime())

    if (now < expires_in) {
        return true
    } else {
        return false
    }
}

Wechat.prototype.updateAccessToken = function (data) {
    var appID = this.appID
    var appSecret = this.appSecret
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret

    return new Promise(function (resolve, reject) {
        request({url: url, json: true}).then(function (res) {
            var data = res.body
            var now = (new Date().getTime())
            var expires_in = now + (data.expires_in - 20) * 1000

            data.expires_in = expires_in

            resolve(data)
        })
    })
}

Wechat.prototype.reply = function () {
    var content = this.body
    var message = this.weixin
    var xml = util.tpl(content, message)
    this.res.status(200);
    this.res.type('application/xml');
    this.res.send(xml)
}
module.exports = Wechat