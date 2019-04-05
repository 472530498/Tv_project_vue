var adminApiConfig = require('./adminApiConfig.js')
/**
 * api config
 */
const adminLoginApiUrl = adminApiConfig.default.adminLoginApiUrl
const successCode = adminApiConfig.default.successCode
const insertVideoInfoApiUrl = adminApiConfig.default.insertVideoInfo
const selectVideoAllApiUrl = adminApiConfig.default.selectVideoAll
const deleteVideoApiUrl = adminApiConfig.default.deleteVideo
const updateVideoApiUrl = adminApiConfig.default.updateVideo
const insertAdminUrl = adminApiConfig.default.insertAdmin

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

async function insertVideoInfo(sourceName, sourceUrl, sourceTypeId, sourceTypeName, ctx) {
    if (sourceName === undefined) {
        console.log('insertVideoInfo 参数中缺少参数sourceName\n')
        return
    }
    if (sourceUrl === undefined) {
        console.log('insertVideoInfo 参数中缺少参数sourceUrl\n')
        return
    }
    if (sourceTypeId === undefined) {
        console.log('insertVideoInfo 参数中缺少参数sourceTypeId\n')
        return
    }
    if (sourceUrl === undefined) {
        console.log('insertVideoInfo 参数中缺少参数sourceUrl\n')
        return
    }
    if (ctx === undefined) {
        console.log('insertVideoInfo 参数中缺少参数ctx\n')
        return
    }
    console.log('insertVideoInfo 请求地址\n' + insertVideoInfoApiUrl)
    console.log('insertVideoInfo 请求前\n' + new Date())
    const insertData = {
        video_name: sourceName,
        video_url: sourceUrl,
        video_zone_tags_id: sourceTypeId,
        video_zone_tags_name: sourceTypeName
    }
    const response = await ctx.$axios.post(insertVideoInfoApiUrl, {insertData: insertData})
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

async function insertAdmin(ctx) {
    console.log('insertVideoInfo 请求地址\n' + insertAdminUrl)
    console.log('insertVideoInfo 请求前\n' + new Date())
    const response = await ctx.$axios.post(insertAdminUrl)
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

async function deleteVideo(vid, ctx) {
    console.log('deleteVideo 请求地址\n' + deleteVideoApiUrl)
    console.log('deleteVideo 请求前\n' + new Date())
    const url = deleteVideoApiUrl.replace('{vid}', vid)
    const response = await ctx.$axios.get(url)
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
    console.log(info)
    return info
}

async function selectVideoAll(ctx) {
    console.log('selectVideoAll 请求地址\n' + selectVideoAllApiUrl)
    console.log('selectVideoAll 请求前\n' + new Date())
    const response = await ctx.$axios.get(selectVideoAllApiUrl)
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
    console.log(info)
    return info
}

async function updateVideo(updateData, ctx) {
    console.log('updateVideoApiUrl 请求地址\n' + updateVideoApiUrl)
    console.log('updateVideoApiUrl 请求前\n' + new Date())
    const response = await ctx.$axios.post(updateVideoApiUrl, {updateData: updateData})
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
    console.log(info)
    return info
}

export {adminLogin, insertVideoInfo, selectVideoAll, deleteVideo, updateVideo, insertAdmin}
