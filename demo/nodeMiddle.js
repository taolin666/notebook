// Node做中间件（1）函数式
// 1引request
// 传入ip
  //声明debug 为 什么环境
  //声明user 为 cookie signedCookies
  // 判断是qa还是prd，给ip赋值对应的ip值
  // user = debug ? 'admin': user
  // 将请求的数据传入。例：
  // var reqStream = request({
    // uri:host + req.url
    // encoding: null,
    // headers:{
        // 'X-BANMA-USER': user,
        // 'X-BANMA-OEMCODE': 'SMPV',
    // }
  // })
  // 最后做结果处理
//   const request = require('request')
//   function handleReq(req, requestStream, res) {
//     req.pipe(
//       requestStream
//         .on('error', function(err) {
//           res.json({
//             status: '1',
//             error: true,
//           });
//         })
//         .on('response', function(response) {
//           res.set(response.headers);
//           if (response.statusCode === 200) {
//             response.pipe(res);
//           } else {
//             res.json({
//               error: true,
//               errorCode: response.statusCode,
//             });
//           }
//         })
//     );
//   }
//   exports.genMiddleware = function(urls) {
//   return function(req, res, next) {
//     var debug = req.app.get('env') === 'development' ? true : false;
//     var user = (req.signedCookies && req.signedCookies.user) || '';
//     var host;

//     if (req.hostname === 'saic-bcc-dev.ebanma.com' || debug) {
//       host = urls.daily;
//     } else if (req.app.locals.machine === 'qa') {
//       host = urls.qa;
//     } else if (req.app.locals.machine === 'prd') {
//       host = urls.prd;
//     }

//     user = debug ? 'admin' : user;
//     var reqStream = request({
//       uri: host + req.url,
//       encoding: null,
//       headers: {
//         'X-BANMA-USER': user,
//         'X-BANMA-OEMCODE': 'SMPV',
//       },
//     });

//     handleReq(req, reqStream, res);
//   };
// };
// exports.getAppUrl = function (req) {
//   var local_uri;

//   if (req.app.locals.machine === 'prd') {
//     local_uri = 'http://saic-bcc.ebanma.com/'
//   } else {
//     local_uri = `http://saic-bcc-${req.app.locals.machine}.ebanma.com/`;
//   }

//   return local_uri;
// }




// Node做中间件，函数式=》在index页面做另一种处理
// var express = require('express');
// var router = express.Router();
// var fns = require('../fns');
// var request = require('request');
// var getAppUrl = require('./util').getAppUrl;
// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.redirect('/page');
// });
// router.get('/logout', function (req, res, next) {
//   res.clearCookie('token');
//   res.clearCookie('user');
//   res.clearCookie('username');
//   res.clearCookie('userinfo');
//   var logouturl = 'https://sso.saicmotor.com/pkmslogout';
//   if (req.app.locals.machine === 'qa') {
//     logouturl = 'https://bsso-qa.zebred.com/logout';
//   }
//   res.redirect(logouturl + `?service=${getAppUrl(req)}${req.pathname}`);
// });
// function printData(res, fnsList, permList, errorMsg) {
//   var template = {};
//   if (fnsList && fnsList.length) {
//     template.sidebar = JSON.stringify(fnsList);
//   } else {
//     template.sidebar = '[]';
//   }
//   if (permList && permList.length) {
//     template.perms = JSON.stringify(permList);
//   } else {
//     template.perms = '[]';
//   }
//   if (errorMsg) {
//     template.errorMsg = JSON.stringify(errorMsg);
//   }
//   res.setHeader('Cache-Control', 'no-store');
//   res.render('index', template);
// }
// function getFilterFn(req) {
//   let filterFn = function (fl, pms) {
//     for (let i = 0; i < fl.length; i++) {
//       if (fl[i].permCode) {
//         if (!~pms.indexOf(fl[i].permCode)) {
//           var index = fl.indexOf(fl[i]);
//           fl.splice(index, 1);
//           i--;
//         }
//       } else if (fl[i].sub && fl[i].sub.length) {
//         filterFn(fl[i].sub, pms);
//       }
//       if (fl[i] && !fl[i].route && (!fl[i].sub || !fl[i].sub.length)) {
//         fl.splice(i, 1);
//         i--;
//       }
//     }
//   };
//   return filterFn;
// }
// router.get(/^\/page(\/.*)*$/, function (req, res, next) {
//   var debug = req.app.get('env') === 'development' ? true : false;
//   var host;
//   var userName = (req.signedCookies && req.signedCookies.user) || '';
//   var fnList = fns();
//   if (req.hostname === 'localhost' || req.app.locals.machine === 'daily') {
//     host = 'http://saic-acl-daily.ebanma.com';
//   } else if (req.app.locals.machine === 'qa') {
//     host = 'http://saic-acl-qa.ebanma.com';
//   } else if (req.app.locals.machine === 'pp') {
//     host = 'http://saic-acl-pp.ebanma.com';
//   } else if (req.app.locals.machine === 'prd') {
//     host = 'http://saic-acl.ebanma.com';
//   }
//   if (debug || req.app.locals.machine === 'daily') {
//     printData(res, fnList, []);
//   } else {
//     var url = '/userPermApply/getUserPermListByClassfiyId';
//     url += '?classifyId=2';
//     url += '&userName=' + userName;
//     request(
//       {
//         uri: host + url,
//         method: 'POST',
//         headers: {
//           'X-BANMA-USER': userName,
//           'X-BANMA-OEMCODE': 'SMPV'
//         }
//       },
//       function (err, response, body) {
//         var fnsList = [];
//         var permList = [];
//         var fnBody = {};
//         if (err) {
//           console.log(err);
//           printData(res, fnsList, permList, `错误信息: ${err && err.msg}, 调用接口回调里发生错误`);
//           return;
//         }
//         if (!response) {
//           printData(res, fnsList, permList, '调用权限接口错误，无response返回');
//           return;
//         }
//         if (response.statusCode === 200) {
//           try {
//             fnBody = JSON.parse(body);
//             if (fnBody.code !== 0) {
//               printData(res, fnsList, permList, `错误信息: ${fnBody.msg}, code: ${fnBody.code}`);
//               return;
//             }
//           } catch (e) {
//             fnBody = {};
//           }
//           if (fnBody.code === 0) {
//             permList = fnBody.data.permList || [];
//             var perms = permList.map(function (p) {
//               return p.permCode;
//             });
//             fnsList = JSON.parse(JSON.stringify(fnList));
//             var filterFn = getFilterFn(req);
//             filterFn(fnsList, perms);
//             return printData(res, fnsList, permList);
//           }
//         } else {
//           printData(res, fnsList, permList, `调用权限http请求statusCode: ${response.statusCode}`);
//           return;
//         }
//       }
//     );
//   }
// });
// module.exports = router;