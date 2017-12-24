/**
 * Created by 白 on 2017/12/24.
 */
'use strict'

var path = require('path')
var utils = require('./libs/utils')
var wechat_file = path.join(__dirname, './config/wechat.txt')

var config = {
    wechat: {
        appID: 'wx04ea9fd4c53e4da4',
        appSecret: '93cb0ea301f23cb135c42be756bd3344',
        token: 'wangyiying',
        getAccessToken: function () {
            return utils.readFileAsync(wechat_file)
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data)
            return utils.writeFileAsync(wechat_file, data)
        }
    }
}

module.exports = config