var adminApiConfig = require('./adminApiConfig.js')
import axios from 'axios';
/**
 * api config
 */
const adminLoginApiUrl = adminApiConfig.default.adminLoginApiUrl
const successCode = adminApiConfig.default.successCode

/* 管理员登陆
 * @envelopeId：营业执照
 */
async function adminLogin(userid, password, ctx) {
    if (userid === undefined) {
        console.log('adminLogin 参数中缺少参数userid\n')
        return
    }
    console.log('adminLogin 请求地址\n' + adminLoginApiUrl)
    console.log('adminLogin 请求前\n' + new Date())
    const response = await ctx.$axios.post(adminLoginApiUrl, {
        userid: userid,
        password: password
    })
    const dic = response.data
    const resultCode = dic.resultCode
    const resultMsg = dic.resultMsg
    if (resultCode !== successCode) {
        var error = new Error()
        error.code = resultCode
        error.msg = resultMsg
        throw error
    }
    const info = dic.data;
    return info
}

export {adminLogin}
