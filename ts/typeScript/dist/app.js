!function(o){var n={};function t(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return o[e].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=o,t.c=n,t.d=function(o,n,e){t.o(o,n)||Object.defineProperty(o,n,{enumerable:!0,get:e})},t.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},t.t=function(o,n){if(1&n&&(o=t(o)),8&n)return o;if(4&n&&"object"==typeof o&&o&&o.__esModule)return o;var e=Object.create(null);if(t.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:o}),2&n&&"string"!=typeof o)for(var r in o)t.d(e,r,function(n){return o[n]}.bind(null,r));return e},t.n=function(o){var n=o&&o.__esModule?function(){return o.default}:function(){return o};return t.d(n,"a",n),n},t.o=function(o,n){return Object.prototype.hasOwnProperty.call(o,n)},t.p="",t(t.s=0)}([function(o,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),t(1),t(2),t(3),t(4),t(5),t(6),t(7),t(8),t(9),t(10),t(11);window.document.querySelector("#app").innerHTML="hello Typescript"},function(o,n){Symbol(),Symbol()},function(o,n){var t,e,r,i,c,u;!function(o){o[o.role1=0]="role1",o[o.role2=1]="role2",o[o.role3=2]="role3",o[o.role4=3]="role4",o[o.role5=4]="role5"}(t||(t={})),console.log(t.role1),console.log(t.role2),function(o){o[o.role1=1]="role1",o[o.role2=2]="role2",o[o.role3=3]="role3",o[o.role4=4]="role4",o[o.role5=5]="role5"}(e||(e={})),console.log(e.role1),console.log(e.role2),function(o){o.success="成功",o.fail="失败"}(r||(r={})),function(o){o[o.N=0]="N",o.M="异构枚举"}(i||(i={})),function(o){o[o.a=0]="a",o[o.b=0]="b",o[o.c="123".length]="c",o[o.d=Math.random()]="d"}(c||(c={})),function(o){o[o.Jan=0]="Jan",o[o.Feb=1]="Feb",o[o.Mar=2]="Mar"}(u||(u={}));var l,a,f;u.Jan,u.Feb,u.Mar;!function(o){o[o.a=0]="a",o[o.b=1]="b"}(l||(l={})),function(o){o[o.a=1]="a",o[o.b=2]="b"}(a||(a={})),function(o){o.a="1",o.b="2"}(f||(f={}));f.a,f.b},function(o,n){function t(o){o.data.forEach((function(o){console.log(o.id,o.value),o.age&&console.log(o.age)}))}t({data:[{id:1,value:"香蕉"},{id:2,value:"苹果"}]}),t({data:[{id:1,value:"香蕉"},{id:2,value:"苹果"}]}),t({data:[{id:1,value:"香蕉",num:12},{id:2,value:"苹果"}]}),t({data:[{id:1,value:"香蕉",num:12},{id:2,value:"苹果"}]})},function(o,n){function t(){var o=function(){};return o.version="1.0.0",o.dosomething=function(){},o}var e=t();e(),e.dosomething();t()},function(o,n){},function(o,n){var t,e=this&&this.__extends||(t=function(o,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,n){o.__proto__=n}||function(o,n){for(var t in n)n.hasOwnProperty(t)&&(o[t]=n[t])})(o,n)},function(o,n){function e(){this.constructor=o}t(o,n),o.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),r=function(){function o(o){this.legs=4,this.name=o}return o.prototype.run=function(){this.pri()},o.prototype.pri=function(){console.log("private")},o.prototype.pro=function(){console.log("protected")},o.food="bones",o}();console.log(r.food);var i=new r("qzx");console.log(i),i.run();var c=function(o){function n(n,t){var e=o.call(this,n)||this;return e.color=t,e.pro(),e}return e(n,o),n}(r);console.log(c.food);new c("lss","red")},function(o,n){var t,e=this&&this.__extends||(t=function(o,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,n){o.__proto__=n}||function(o,n){for(var t in n)n.hasOwnProperty(t)&&(o[t]=n[t])})(o,n)},function(o,n){function e(){this.constructor=o}t(o,n),o.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),r=function(){function o(){}return o.prototype.eat=function(){console.log("eat")},o}(),i=new(function(o){function n(n){var t=o.call(this)||this;return t.name=n,t.name=n,t}return e(n,o),n.prototype.sleep=function(){console.log("cat sleep")},n}(r))("qzx");i.eat(),[i,new(function(o){function n(){return null!==o&&o.apply(this,arguments)||this}return e(n,o),n.prototype.sleep=function(){console.log("bird sleep")},n}(r))].forEach((function(o){o.sleep()}));!function(o){function n(){return null!==o&&o.apply(this,arguments)||this}e(n,o)}(function(){function o(){}return o.prototype.step1=function(){return this},o.prototype.step2=function(){return this},o}())},function(o,n){var t;t={age:12,name:"qzx",leg:2,school:"small"},console.log(t)},function(o,n,t){var e;!function(o){o[o.Strong=0]="Strong",o[o.week=1]="week"}(e||(e={}));(function(){function o(){this.java=0}o.prototype.helloJava=function(){console.log("hello Java")}})(),function(){function o(){this.javaScript=0}o.prototype.helloJavaScript=function(){console.log("hello JavaScript")}}();var r,i;(function(){function o(){}o.prototype.run=function(){},o.prototype.eat=function(){}})(),function(){function o(){}o.prototype.jump=function(){},o.prototype.eat=function(){}}();!function(o){o[o.dog=0]="dog",o[o.cat=1]="cat"}(r||(r={})),console.log("square"===(i={kind:"circle",r:24}).kind?i.size*i.size:"rect"===i.kind?i.width*i.heigh:"circle"===i.kind?Math.PI*i.r*i.r:function(o){throw new Error(o)}(i))},function(o,n){},function(o,n){}]);