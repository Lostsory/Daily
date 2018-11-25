var crypto = require('crypto');
var pwd = '123456';

/* var md5 = crypto.createHash('md5');
var newPwd = md5.update(pwd).digest('hex');
console.log(newPwd); */

const key2 = crypto.scryptSync('secret', 'salt', 64, { N: 1024 });
console.log(key2.toString('hex'));
