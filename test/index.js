const assert = require('assert');
const weappOauth = require('../lib');
const config = {
  appid: 'appid',
  secret: 'secret'
};
let code = '';
let encryptedData = '';
let iv = '';
let session_key = '';

describe('weapp oauth', () => {
  it.skip('换取用户信息: getUser', async () => {
    let res = await weappOauth(config).getUser(code);
    assert.ok(res.openid);
    assert.ok(res.session_key);
  });

  it.skip('换取用户信息: getUser with encryptedData', async () => {
    let res = await weappOauth(config).getUser(code, encryptedData, iv);
    assert.ok(res.openId);
    assert.ok(res.nickName);
    assert.ok(res.gender);
  });

  it.skip('用户信息解密: decryptData', async () => {
    let res = await weappOauth().decryptUser(encryptedData, session_key, iv);
    assert.ok(res.openId);
    assert.ok(res.nickName);
    assert.ok(res.gender);
  });
});
