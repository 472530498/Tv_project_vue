/**
 * initialize fluio
 */
/* eslint-disable */
// const baseApiUrl = ''
// const baseApiUrl = ''
const baseApiUrl = 'http://127.0.0.1:7001'
const adminLoginApiUrl = baseApiUrl + '/commonModel/stateManager/login' // 管理员登陆
const insertVideoInfo = baseApiUrl + '/commonModel/videoManager/insertVideo' // 增加视频信息
const selectVideoAll = baseApiUrl + '/commonModel/videoManager/selectVideoAll' // 查询所有视频列表
const deleteVideo = baseApiUrl + '/commonModel/videoManager/deleteVideo/{vid}' // 删除指定视频
const updateVideo = baseApiUrl + '/commonModel/videoManager/updateVideo' // 更新指定视频信息
const insertAdmin = baseApiUrl + '/commonModel/stateManager/insertAdmin' // 增加管理员
const successCode = 1

export default {
    successCode: successCode,
    baseApiUrl: baseApiUrl,
    adminLoginApiUrl: adminLoginApiUrl,
    insertVideoInfo: insertVideoInfo,
    selectVideoAll: selectVideoAll,
    deleteVideo: deleteVideo,
    updateVideo: updateVideo,
    insertAdmin: insertAdmin
}
