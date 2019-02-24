const express = require('express');
const app = express();

const superagent = require('superagent')
const cheerio = require('cheerio')

var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块

let teachers = []
for(let i = 1; i < 30; i++) {
    let data = new Promise(function(resolve, reject){
        superagent.get(`https://ty.lovejiajiao.com/TeacherList/page${i}`).end((err, sres) => {
            if (err) {
               console.log(err, `第${i}页失败`)
            } else {
                
                let $ = cheerio.load(sres.text)
                let detailUrls = [];
                $('.list_table tr td:first-child').each((idx, element) => {
                    let href = $(element).find('a').first().attr('href')
                    detailUrls.push('https://ty.lovejiajiao.com' + href)
                })
                let pageItems = []
                detailUrls.forEach((url, index) => {
                    superagent.get(url).end((err, detail) => {
                        if (err) {
                            console.log(`第${i}页第${index+1}条详情获取失败`)
                        } else {
                            let $ = cheerio.load(detail.text)
                            pageItems.push({
                                cityCode: '0',
                                teacherName: $('#LabelPublicTitle').text(),
                                phone: '未知',
                                sex: $('#LabelSex').text() == '男'?'1':'2',   //性别 0：未知，1：:男，2：女
                                typeId: '0',
                                address: $('#LabelFastBlock a').text(),
                                remark: $('.xiaoyu pre').text(),
                                finishSchool: $('#LabelUniversity a').text()
                            })
                            console.log(err, `第${i}页第${index+1}条详情获取成功`)
                            if (detailUrls.length == pageItems.length) {
                                console.log(`第${i}页成功`)
                                resolve(pageItems)
                            }
                        }
                    })
                })    
            }
        })    
    })
    teachers.push(data)
}
Promise.all(teachers).then((datas) => {
    var content = JSON.stringify(datas); 
    var file = path.join(__dirname, 'data/index.js'); 
    //写入文件
    fs.writeFile(file, content, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('文件创建成功，地址：' + file);
    });
})

