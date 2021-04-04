import instance from './instance';

export function getCouponVoucher (userId, orderId, lessonIds, isDualLesson) {
  return instance.get(`${process.env.VUE_APP_DOMAIN}/tutor-ybc-parents/api/dual-lesson/dual-certificate/${userId}?isDualLesson=${isDualLesson}&orderId=${orderId}&lessonIds=${lessonIds}`)
}
