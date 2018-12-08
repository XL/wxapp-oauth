const urllib = require('urllib');
const crypto = require('crypto');
const URL = 'https://api.weixin.qq.com/sns/jscode2session';

class Oauth {
  constructor({appid, secret} = {}) {
    if (!appid) throw new Error('ERR_APPID_FAIL');
    if (!mchid) throw new Error('ERR_MCHID_FAIL');

    this.appid = appid;
    this.secret = secret;
  }

  async getUser(code, encryptedData, iv) {
    if (!code) throw new Error('ERR_CODE_FAIL');

    let pkg = {
      appid: this.appid,
      secret: this.secret,
      js_code: code,
      grant_type: 'authorization_code'
    };
    let {status, data} = await urllib.request(URL, {method: 'GET', dataType: 'json', data: pkg});
    if (status !== 200) throw new Error('ERR_REQUEST_STATUS');
    if (data.errcode || data.errmsg) throw new Error(data.errmsg);

    if (encryptedData) data.userInfo = this.decrypt(encryptedData, data.session_key, iv);
    return data;
  }

  decrypt(encryptedData, key, iv) {
    key = new Buffer(key, 'base64');
    iv = new Buffer(iv, 'base64');
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedData, 'base64', 'utf8');
        decoded += decipher.final('utf8');
    return JSON.parse(decoded);
  }
}

module.exports = config => new Oauth(config);
