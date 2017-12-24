/**
 * Created by 白 on 2017/12/24.
 */
'use strict'

exports.reply = function (next) {
    var message = this.weixin

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            this.body = '你偷偷关注了我'
        } else if (message.Event === 'unsubscribe') {
            console.log('取关了')
            this.body = ''
        } else if (message.Event === 'LOCATION') {
            this.body = '您上报的位置是：' + message.Latitude
        } else if (message.Event === 'CLICK') {
            this.body = '您点击了菜单：' + message.EventKey
        } else if (message.Event === 'SCAN') {
            this.body = '看到你扫了一下'
        } else if (message.Event === 'VIEW') {
            this.body = '您点击了菜单中的链接：' + message.EventKey
        }
    } else if (message.MsgType === 'text') {
        var content = message.Content
        var reply = '您说的 ' + message.Content + ' 太复杂了'

        if (content === '1') {
            reply = '111111'
        } else if (content === '2') {
            reply = '222222'
        } else if (content === '3') {
            reply = '333333'
        } else if (content === '4') {
            reply = [{
                title: 'xiaoying',
                description1: 'lalala',
                picUrl: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=8d989d100ffa513d55aa6bdc0d6c554c/3b87e950352ac65c0c2f6ebffcf2b21192138ad7.jpg',
                url: 'https://www.baidu.com/'
            }, {
                title: 'huge',
                description1: 'hahaha',
                picUrl: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=8d989d100ffa513d55aa6bdc0d6c554c/3b87e950352ac65c0c2f6ebffcf2b21192138ad7.jpg',
                url: 'https://www.baidu.com/'
            }]
        }
        this.body = reply
    }
    next
}