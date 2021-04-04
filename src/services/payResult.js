import instance from './instance';
import Cookie from '../util/cookie'
export default {
  checkOrder(orderId) {
    return instance.get(`/tutor-student-order/api/purchase/orders/${orderId}`);
  },
  getTeacherInfo(orderId) {
    return instance.get(
      `/ada-student-order/api/order-info/team-mentor?orderId=${orderId}`
    );
  },
  getSteamTeacherInfo(orderId) {
    return instance.get(
      `/ada-student-order/api/steam/orders/${orderId}/teacher`
    );
  },
  transferLesson(orderId, targetLessonId) {
    return instance.post(`/ada-student-order/api/orders/${orderId}/transfer?targetLessonId=${targetLessonId}&UDID=${encodeURIComponent(Cookie.get('deviceId')).slice(0, 64)}`) 
  },
};
