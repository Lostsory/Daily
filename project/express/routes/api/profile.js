// profile增删改查
const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const passport = require('passport');

/**
 * @api api/profill/add
 * @description 创建信息接口
 * @private
 */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {type, desc, income, expend, cash} = req.body;
  new Profile({
    type, desc, income, expend, cash
  }).save().then((profile) => {
    res.send(profile)
  }).catch((err) => {
    console.log(err);
  });
})

/**
 * @api api/profill/delete
 * @description 删除信息接口
 * @private
 */
router.delete('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {
    id 
  } = req.query;
  Profile.findByIdAndDelete(id).then((profile) => {
    console.log('profile---------------- :', profile);  
    res.send({
      msg: '操作成功'
    })
  }, () => {
    res.send({
      msg: '操作失败'
    })
  }).catch((err) => {
    console.log(err);
  })
})

/**
 * @api api/profill/list
 * @description 查询信息列表接口
 * @private 
 */
router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {
    pageNum, 
    pageSize, 
    dataOrder // 时间排序
  } = req.query;
  Profile.find().then((profiles) => {
    if (profiles) {
      res.json({
        msg: '操作成功',
        list: profiles
      })
    }
  })
})

module.exports = router
