import instance from './instance';
import { getProductId, getOwnProductId, version } from '../util/device'
import Cookie from '../util/cookie'
const urlParam = `_hostProductId=${getProductId()}&_productId=${getOwnProductId()}&platform=mobile&version=${version}&UDID=${encodeURIComponent(Cookie.get('deviceId')).slice(0, 64)}`

export default {
	checkLogin () {
        return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-user-api/api/users/current/summary?${urlParam}`)
    },
    getBundleLessonBasicInfo(lessonId) {
        return instance.get(`/tutor-primary-advert/api/promotion-page/lessons/${lessonId}?${urlParam}`)
    },
    createOrder(data) {
        const config = {
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            emulateJSON: true
        }
        return instance.post(`/ada-student-order/api/orders/ybc-external?_checkProgrammingLevel=true&${urlParam}`, data, config)
    },
    createPromotionOrder(data) {
        const config = {
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            emulateJSON: true
        }
        return instance.post(`/ada-student-order/api/orders/ybc-promotion?_checkProgrammingLevel=true&${urlParam}`, data, config)
    },
    checkOrder(orderId) {
        return instance.get(`/tutor-student-order/api/purchase/orders/${orderId}?${urlParam}`)
    },
    deleteOrderByOrderId(orderId) {
        return instance.delete(`/tutor-commerce/api/orders/${orderId}?${urlParam}`);
    },
    orderPageAdsReport (data) {
        return instance.post('/ada-advert/api/ads-report/form-reservation', data);
    },
    payClickAdsReport (data) {
        return instance.post('/ada-advert/api/ads-report/pay-clicked', data);
    },
    payVerifiedAdsReport (data) {
        return instance.post('/ada-advert/api/ads-report/pay-verified ', data);
    }
}