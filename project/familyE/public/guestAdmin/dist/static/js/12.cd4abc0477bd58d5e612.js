webpackJsonp([12],{ufIM:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("1onU"),r=a("gyMJ"),s=a("0xDb"),o={components:{pagination:l.a},data:function(){return{tableData:[],tableLoading:!0,listQuery:{pageNum:1,pageSize:20},total:0,index:0,drinkDialog:{title:"",type:"",show:!1},studentForm:{},gradeData:[],subjectList:[],studentRules:{studentName:[{required:!0,message:"此项为必填项",trigger:"blur"}],phone:[{required:!0,message:"此项为必填项",trigger:"blur"}],gradeId:[{required:!0,message:"此项为必填项",trigger:"blur"}],typeId:[{required:!0,message:"此项为必填项",trigger:"blur"}],subjectIds:[{required:!0,message:"此项为必填项",trigger:"blur"}]}}},filters:{format:function(e){var t=new Date(e);function a(e){return e<10?"0"+e:e}return t.getFullYear()+"-"+a(t.getMonth()+1)+"-"+a(t.getDate())+" "+a(t.getHours())+":"+a(t.getMinutes())+":"+a(t.getSeconds())}},computed:{num:function(e){var t=this.listQuery;return(t.pageNum-1)*t.pageSize+1}},methods:{getGrade:function(){var e=this;Object(r.g)().then(function(t){e.gradeData=t.data.data,console.log(e.gradeData)})},formatSub:function(e){for(var t="",a=e.length,l=0;l<a;l++)t+=e[l].subjectName+(l===e.length-1?"":"/");return t},getData:function(){var e=this;Object(r.v)(this.listQuery).then(function(t){e.tableLoading=!1,t.data.data.forEach(function(t){t.subjectIds=e.formatSub(t.subjectIds)}),e.tableData=t.data.data,e.total=parseInt(t.data.total)})},handleUpdate:function(e){this.$refs.studentForm&&this.$refs.studentForm.resetFields(),this.drinkDialog={type:"UPDATE",show:!0,title:"修改"}},handleDelete:function(e){var t=this;Object(s.a)(this,function(){Object(r.u)({id:e._id}).then(function(){t.getData()})})},getSubjectList:function(e){var t=this;this.studentForm.subjectIds=[],Object(r.y)({gradeId:e}).then(function(e){t.subjectList=e.data.data})},handleAdd:function(){this.drinkDialog={type:"ADD",show:!0,title:"新增"},this.$refs.studentForm&&this.$refs.studentForm.resetFields()},save:function(){var e=this;"ADD"===this.drinkDialog.type&&this.$refs.studentForm.validate(function(t){if(t){var a={};e.subjectList.forEach(function(e){a[e._id]=e}),e.studentForm.subjectIds=e.studentForm.subjectIds.map(function(e){return a[e]}),Object(r.t)(e.studentForm).then(function(t){e.getData(),e.drinkDialog.show=!1})}})}},created:function(){this.getData(),this.getGrade()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-edit"},on:{click:e.handleAdd}},[e._v("添加")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{size:"medium",data:e.tableData,border:"",stripe:!0}},[a("el-table-column",{attrs:{align:"center",type:"index",index:e.num,label:"序号",width:"60"}}),e._v(" "),a("el-table-column",{attrs:{prop:"studentName",align:"center",label:"家长姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",align:"center","show-overflow-tooltip":"",label:"手机号码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gradeName",align:"center",label:"子女年级"}}),e._v(" "),a("el-table-column",{attrs:{prop:"subjectIds",align:"center","show-overflow-tooltip":"",label:"所补科目"}}),e._v(" "),a("el-table-column",{attrs:{prop:"expectFee",align:"center","show-overflow-tooltip":"",label:"期望课费"}}),e._v(" "),a("el-table-column",{attrs:{prop:"school","show-overflow-tooltip":"",align:"center",label:"所在学校"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime","show-overflow-tooltip":"",align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\r\n        "+e._s(e._f("format")(t.row.createTime))+"\r\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"remark","show-overflow-tooltip":"",align:"center",label:"子女情况"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"80","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:e.drinkDialog.title,visible:e.drinkDialog.show,width:"500px"},on:{"update:visible":function(t){e.$set(e.drinkDialog,"show",t)}}},[a("el-form",{ref:"studentForm",attrs:{size:"medium",rules:e.studentRules,model:e.studentForm,"label-position":"left","label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"家长姓名：",prop:"studentName"}},[a("el-input",{attrs:{placeholder:"请输入家长姓名"},model:{value:e.studentForm.studentName,callback:function(t){e.$set(e.studentForm,"studentName",t)},expression:"studentForm.studentName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"手机号码：",prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入手机号码"},model:{value:e.studentForm.phone,callback:function(t){e.$set(e.studentForm,"phone",t)},expression:"studentForm.phone"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"子女年级：",prop:"gradeId"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.getSubjectList},model:{value:e.studentForm.gradeId,callback:function(t){e.$set(e.studentForm,"gradeId",t)},expression:"studentForm.gradeId"}},e._l(e.gradeData,function(e){return a("el-option",{key:e._id,attrs:{label:e.gradeName,value:e._id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"所补科目：",prop:"subjectIds"}},[a("el-select",{attrs:{disabled:!e.studentForm.gradeId,multiple:"",placeholder:e.studentForm.gradeId?"请选择":"请先选择子女年级"},model:{value:e.studentForm.subjectIds,callback:function(t){e.$set(e.studentForm,"subjectIds",t)},expression:"studentForm.subjectIds"}},e._l(e.subjectList,function(e,t){return a("el-option",{key:t,attrs:{label:e.subjectName,value:e._id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"期望课费：",prop:"expectFee"}},[a("el-input",{attrs:{placeholder:"请输入期望课费"},model:{value:e.studentForm.expectFee,callback:function(t){e.$set(e.studentForm,"expectFee",t)},expression:"studentForm.expectFee"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"所在学校：",prop:"school"}},[a("el-input",{attrs:{placeholder:"请输入所在学校"},model:{value:e.studentForm.school,callback:function(t){e.$set(e.studentForm,"school",t)},expression:"studentForm.school"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"详细地址：",prop:"address"}},[a("el-input",{attrs:{placeholder:"请输入详细地址"},model:{value:e.studentForm.address,callback:function(t){e.$set(e.studentForm,"address",t)},expression:"studentForm.address"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"性别：",prop:"sex"}},[a("el-radio-group",{model:{value:e.studentForm.sex,callback:function(t){e.$set(e.studentForm,"sex",t)},expression:"studentForm.sex"}},[a("el-radio",{attrs:{label:0}},[e._v("未知")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("女")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"子女情况："}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5},placeholder:"请输入"},model:{value:e.studentForm.remark,callback:function(t){e.$set(e.studentForm,"remark",t)},expression:"studentForm.remark"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.drinkDialog.show=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确认")])],1)],1),e._v(" "),a("pagination",{attrs:{total:e.total,listQuery:e.listQuery},on:{getTableData:e.getData}})],1)},staticRenderFns:[]},i=a("vSla")(o,n,!1,null,null,null);t.default=i.exports}});