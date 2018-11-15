const express = require('express');
const mongo = require('mongoose');
const bodyParse = require('body-parser');
const passport = require('passport');

const app = express();

const port = process.env.PORT || 5000;

// 引入route
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');

// 使用body-parser中间件
app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

// DB config
const db = require('./config/keys').mongodbUrl;

// connect to mongodb
mongo.connect(db).then(() => {
  console.log('mongodb connected');
}).catch((err) => {
  console.log(err);
})

// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

/* app.get('/', (req, res) => {
  res.send('Hello world')
}) */

// 使用routers
app.use('/api/user', user)
app.use('/api/profile', profile)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
