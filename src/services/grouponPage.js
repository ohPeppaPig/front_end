import instance from './instance';
import { getProductId, getOwnProductId, version } from '../util/device'
import Cookie from '../util/cookie'
const urlParam = `_hostProductId=${getProductId()}&_productId=${getOwnProductId()}&platform=mobile&version=${version}&UDID=${encodeURIComponent(Cookie.get('deviceId')).slice(0, 64)}`

export default {
    getActivityId (keyfrom) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activities/activityId?keyfrom=${keyfrom}`)
    },
    getImages (id) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activities/${id}/extra-info`)
    },
	getBundles (id) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activity-lesson-bundles?activityId=${id}&${urlParam}`)
    },
    getChannelByKeyfrom (keyfrom) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/sale-channels/with-keyfrom?keyfrom=${keyfrom}`)
    },
    getLessonGroups (gradeList, id, ybcSaleChannelNo) {
        let urls = []
        gradeList.forEach(element => {
            urls.push(`/tutor-student-lesson/api/groups/${element.lessonBundleId}/lessons?studyPhase=xiaoxue&`)
        })
        return instance.get(`${process.env.VUE_APP_DOMAIN}/primary/combo?_ybcActivityId=${id}&_ybcSaleChannelNo=${ybcSaleChannelNo}&${urlParam}&urls=${encodeURIComponent(urls.join())}`)
    },
    /* getLatestOrderUser (id) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activities/${id}/latest-order-user?${urlParam}`)
    }, */
    //获取最新成单用户信息（假用户）
    getLatestOrderUser (id) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/order-users/latest?activityId=${id}`)
    },
    getPaidUserList (id) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/order-users/latest-list?activityId=${id}`)
    },
    getTimeTable (lessonId) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-lesson/api/timetable?lessonId=${lessonId}`)
    },
    getActivityConfig (activityId) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activity-config/v2?activityId=${activityId}`)
    },
    getTodayPurchasedUsersCount () {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/today-purchased-users-count`)
    },
    getGroupUsers (activityId) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/order-users/latest-join-groupon-infos?activityId=${activityId}&count=20`)
    },
    getActivityStatus (activityId) {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activities/${activityId}`);
    },
    getYmmEntryButtonConfig(activityId) {
      return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activity-config/ymmEntryButtonFlag?activityId=${typeof activityId === 'undefined' ? '' : activityId}`)
    },
    getYmmEntryLayerConfig(activityId) {
      return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-activity/api/activity-config/ymmEntryLayerFlag?activityId=${typeof activityId === 'undefined' ? '' : activityId}`)
    }
}