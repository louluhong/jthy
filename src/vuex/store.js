import Vue from 'vue'
import Vuex from 'vuex'

//基本
import base from './modules/base'
//签约
import qianyue from './modules/qianyue'
//选择城市
import address from './modules/address'
//拍照
import pictureurl from './modules/pictureurl'
//签约管理
import qyadmin from './modules/qyadmin'
//宝宝模块
import bady from './modules/bady'
// 问诊

/*//聊天
import chat from './modules/chat'
//家庭账户
import jiating from './modules/jiating'
//签约
import qianyue from './modules/qianyue'*/

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        base,
        qianyue,
        address,
        pictureurl,
        qyadmin,
        bady
       
        /*chat,
        jiating,
        qianyue*/
    },
    strict: process.env.NODE_ENV !== 'production'//进行自动判断严格模式还是非严格模式（开发环境下是严格模式）做这个判断是为了避免不必要的性能损耗
})