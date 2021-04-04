import instance from './instance';
import { getProductId, getOwnProductId, version } from '../util/device'
import Cookie from '../util/cookie'
const urlParam = `_hostProductId=${getProductId()}&_productId=${getOwnProductId()}&platform=mobile&version=${version}&UDID=${encodeURIComponent(Cookie.get('deviceId')).slice(0, 64)}`
import WX from 'weixin-js-sdk';
import qs from 'qs';

export default {
	async payWeChatViaSdk (data) {
		const config = await instance.post(`${process.env.VUE_APP_DOMAIN}/tutor-commerce/api/pay/weixin?${urlParam}`, qs.stringify(data))
		return new Promise((resolve, reject) => {
            const { timeStamp, nonceStr, package: packageStr, signType, paySign } = config;
            WX.chooseWXPay({
                timestamp: timeStamp,
                package: packageStr,
                nonceStr, signType, paySign,
                success() {
                    resolve({ success: true, message: '微信支付成功' });
                },
                fail() {
                    reject({ success: false, message: '微信支付失败' });
                },
                complete() {
                },
                cancel() {
                    reject({ success: false, message: '微信支付取消' });
                }
			})
		});
    },
    payWeChatViaRedirect (data) {
		return instance.post(`${process.env.VUE_APP_DOMAIN}/tutor-commerce/api/pay/weixin?mweb=true&${urlParam}`, qs.stringify(data))
    }
}