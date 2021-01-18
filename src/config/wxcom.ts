declare const APPID: string;
declare const NONCESTR: string;
declare const AGENTID: string;
declare const APPNAME: string;

export default {
    config: {
        appId: APPID, // 企业微信 id
        debug: true,
        nonceStr: NONCESTR, // 加密字符串
        timestamp: (new Date()).getTime(), // 加密时间戳
    },
    // 这里的 agentid 为企业微信申请的 应用 id
    agentid: AGENTID,
    // 这里的 appName 为 http://weichat-certcenter.talefun.com/ 认证中心配置的 appName
    appName: APPNAME,
};