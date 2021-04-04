import instance from './instance';
import PidCryptUtil from 'pidcrypt/pidcrypt_util'
import Pidcrypt from 'pidcrypt'
import 'pidcrypt/rsa'
import { getProductId, getOwnProductId, version } from '../util/device'
import Cookie from '../util/cookie'
const urlParam = `_hostProductId=${getProductId()}&_productId=${getOwnProductId()}&platform=mobile&version=${version}&UDID=${encodeURIComponent(Cookie.get('deviceId')).slice(0, 64)}`
const RSA_KEY_BASE64 = 'ANKi9PWuvDOsagwIVvrPx77mXNV0APmjySsYjB1/GtUTY6cyKNRl2RCTt608m9nYk5VeCG2EAZRQmQNQTyfZkw0Uo+MytAkjj17BXOpY4o6+BToi7rRKfTGl6J60/XBZcGSzN1XVZ80ElSjaGE8Ocg8wbPN18tbmsy761zN5SuIl'
import qs from 'qs';

let Encrypt = {
    init () {
        const RSA_KEY = PidCryptUtil.convertToHex(PidCryptUtil.decodeBase64(RSA_KEY_BASE64))
        this.rsa = new Pidcrypt.RSA()
        this.rsa.setPublic(RSA_KEY, '10001', 16)
    },

    produce (msg) {
        if (!this.rsa) {
        this.init()
        }
        var raw = this.rsa.encryptRaw(msg)
        return PidCryptUtil.encodeBase64(PidCryptUtil.convertFromHex(raw))
    }
}

export default {
	getVcode (phone) {
		const data = new FormData();
        data.append('phone', Encrypt.produce(phone))
        const config = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            emulateJSON: true
        }
        return instance.post(`${process.env.VUE_APP_APE_API_PRE_FIX}/verifier/api/sms?${urlParam}`, data, config)
	},
	login (formData) {
        let data = {
            phone: Encrypt.produce(formData.phone),
            verification: Encrypt.produce(formData.vcode)
        }
        return instance.post(`${process.env.VUE_APP_APE_API_PRE_FIX}/accounts/api/login?${urlParam}`, qs.stringify(data))
    },
    redirectToWeixinBind (url) {
        this.redirectToWexin('bind', url)
    },
    redirectToWeixinLogin (url) {
        this.redirectToWexin('login', url)

    },
    redirectToWexin (action, url) {
        let redirectUrl = `${process.env.VUE_APP_DOMAIN}/tutor-ybc-wechat/api/wechat/${action}/oauth2-callback?${urlParam}&skipLoginPageRedirect=true&userInfoScope=true&redirect=` + encodeURIComponent(url)
        let path = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.VUE_APP_ID}&redirect_uri=` + encodeURIComponent(redirectUrl) + '&response_type=code&scope=snsapi_userinfo&state=loginRedirect#wechat_redirect'
        location.replace(path)
    }
}