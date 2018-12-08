# weapp-oauth for nodejs
[![travis][travis]][travis-u] [![npm][npm]][npm-u] [![node][node]][node-u] [![issues][issues]][issues-u] [![commit][commit]][commit-u]

- code获取用户基础信息
- code和encryptedData获取用户信息
- session_key和encryptedData解密用户信息

## 安装
```Bash
npm i @gxinglu/wxapp-oauth

## 实例化
```javascript
const config = {
  appid: '小程序appid',
  secret: '小程序secret'
};

// 实例化调用
const oauth = require('@xinglu/wxapp-oauth')(config);
let res = await oauth.api(...);

// 链式调用, 同一体系下多个小程序配置
const oauth = require('@xinglu/wxapp-oauth');
let res = await oauth(config).api(...);
```

## API 列表
### getUser: 通过code获取用户信息:
```javascript
let user = await oauth.getUser(code, encryptoData<可选>, iv<可选>);
// user: {openid, unionid, session_key, expires_in}
// user.userInfo: {openId, nickName, gender, language, city, province, country, avatarUrl, unionId, watermark}
```
#### 特殊说明
- encryptoData和iv为可选参数, 存在时进行解密并附加一个名为userInfo的Object;
- unionid返回规则: [UnionID机制说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/uinionID.html)

### decrypt: 解密用户信息
```javascript
let user = oauth.decrypt(encryptoData, session_key, iv);
```

[travis]: https://img.shields.io/travis/XL/wxapp-oauth.svg
[travis-u]: https://travis-ci.org/XL/wxapp-oauth

[npm]: https://img.shields.io/npm/v/wxapp-oauth.svg
[npm-u]: https://www.npmjs.com/package/wxapp-oauth

[node]: https://img.shields.io/node/v/wxapp-oauth.svg
[node-u]: https://nodejs.org/en/download/

[commit]: https://img.shields.io/github/last-commit/XL/wxapp-oauth.svg
[commit-u]: https://github.com/XL/wxapp-oauth/commits/master

[issues]: https://img.shields.io/github/issues/XL/wxapp-oauth.svg
[issues-u]: https://github.com/XL/wxapp-oauth/issues
