import instance from './instance';
import { getProductId, getOwnProductId, version } from '../util/device'
import Cookie from '../util/cookie'
const urlParam = `_hostProductId=${getProductId()}&_productId=${getOwnProductId()}&platform=mobile&version=${version}&UDID=${encodeURIComponent(Cookie.get('deviceId')).slice(0, 64)}`

export const activityId = 11;
export function getCurrentUser () {
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-student-profile/api/users/current/summary`)
}
export function getAnalysisUser () {
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-user-api/api/users/current/summary`)
}
export function getRecomendInfoList (activityId, isPreview = false) {
  activityId = activityId || activityId
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activities/${activityId}?isPreview=${isPreview}`)
}
export function getImgs (id, previewExperiments = '', isPreview = false) {
  const aId = id || activityId
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activities/${aId}/extra-info?previewExperiments=${previewExperiments}&isPreview=${isPreview}`)
}
export function getUserDisplayInfo (activityId) {
  activityId = activityId || activityId
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/user-display-info?activityId=${activityId}&${urlParam}`)
}
export function postOpenWelfardDialog (activityId) {
  activityId = activityId || activityId
  return instance.post(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/user-operations/add-user-operation-log?activityId=${activityId}&${urlParam}`, {
    type: 2
  })
}
export function getTodayPurchasedUsersCount () {
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/today-purchased-users-count`)
}
export function getRecentActivityUserInfo (activityId) {
  activityId = activityId || activityId
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/order-users/latest-list?activityId=${activityId}&${urlParam}`)
}
export function getLessonGroups (gradeList, activityId, ybcSaleChannelNo) {
  let urls = []
  gradeList.forEach(element => {
    urls.push(`/tutor-student-lesson/api/groups/${element.lessonBundleId}/lessons?studyPhase=xiaoxue`)
  })
  return instance.get(`${process.env.VUE_APP_DOMAIN}/primary/combo?_ybcActivityId=${activityId}&_ybcSaleChannelNo=${ybcSaleChannelNo}&${urlParam}&urls=${encodeURIComponent(urls.join(','))}`).then((res) => {
    return res
  })
}
export function getChannelByKeyfrom (gradeList, activityId, keyfrom) {
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/sale-channels/with-keyfrom?keyfrom=${keyfrom}`).then((res) => {
    return res
  }).then((ybcSaleChannelNo) => {
    return getLessonGroups(gradeList, activityId, ybcSaleChannelNo)
  })
}
export function getLessonBundle (activityId, keyfrom, isPreview = false) {
  let list
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activity-lesson-bundles?activityId=${activityId}&isPreview=${isPreview}&${urlParam}`).then((res) => {
    return res
  }).then((gradeList) => {
    list = gradeList
    return getChannelByKeyfrom(gradeList, activityId, keyfrom)
  }).then((results) => {
    list.map((item, index) => {
      item.list = results[index].list
    })
    return list
  })
}
export function addOne (activityId, startUserId) {
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/upload-records/posters/scans/add-one?activityId=${activityId}&userId=${startUserId}`)
}
