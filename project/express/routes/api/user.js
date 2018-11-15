// @login & register
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').secretOrKey;
const passport = require('passport');

// 全球公认的头像
const gravatar = require('gravatar');

/**@api api/user/test
 * @description 测试接口
 * @public
 */
router.get('/test', (req, res) => {
  res.json({
    msg: 'login works'
  })
})

/**
 * @api api/user/register
 * @description 注册接口
 * @public
 */
router.post('/register', (req, res) => {
  const {account, email, avatar, pwd, data, identity} = req.body;
  // 查询是否存在
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: '邮箱已被注册'
      })
    } else {
      const newUser = new User({
        account, email, pwd, data, avatar: gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: 'mm'}), identity
      })
      newUser.save().then((user) => {
        res.send(user)
      })
    }
  })
})

/**@api api/user/login
 * @description 登录接口返回token
 * @public
 */
router.post('/login', (req, res) => {
  const {email, pwd} = req.body;
  // 查询是否存在
  User.findOne({ email }).then((user) => {
    if (user) {
      const {account, email, avatar, pwd, identity} = user;
      // 密码匹配
      if (user.pwd == pwd) {
        // jwt.sign('规则', '加密名字', '过期时间', '回调函数')
        const rule = { id: user.id };
        jwt.sign(rule, keys, {expiresIn: 3600}, (err, token) => {
          if (err) throw err;
          res.json({
            msg: '登录成功',
            token: `Bearer ${token}`,
            account,
            email,
            avatar,
            identity,
          })
        })
      } else {
        res.json({mag: '密码错误'})
      }
    } else {
      return res.status(404).json({
        msg: '用户不存在'
      })
    }
  })
})

/**
 * @api api/user/currentLoginInfo
 * @description 验证token是否正确
 * @private
 */
router.get('/currentLoginInfo', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    msg: '请求成功',
    id: req.user.id,
    account: req.user.account,
    email: req.user.email,
    identity: req.user.identity,
    avatar: req.user.avatar
  })
})

module.exports = router