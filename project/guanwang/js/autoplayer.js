/*!
* autotyperjs v1.0.1
* A vanilla javascript plugin for animated typewriting.
*
* Author: Huseyin Elmas
*/
!function(e,t){e.autoTyper=function(e){var o={selector:"",words:[],charSpeed:85,delay:2100,loop:!0,flipflop:!0,position:0,currentWord:"",element:null,isStopped:!1};!function(e){if(e)for(var t in e)e.hasOwnProperty(t)&&(o[t]=e[t])}(e);var n=function*(){(o.position===o.currentWord.length||o.isStopped)&&(o.flipflop&&(yield setTimeout(function(){i().next()},o.delay)),yield null),o.element.innerHTML+=o.currentWord[o.position++],yield setTimeout(function(){n().next()},o.position<o.currentWord.length?o.charSpeed:0)},i=function*(){(0===o.position||o.isStopped)&&(yield null),o.element.innerHTML=o.currentWord.substr(0,--o.position),yield setTimeout(function(){i().next()},o.position>0?o.charSpeed:0)},r=function*(e,t){yield setTimeout(function(){o.position=0,o.currentWord=e,o.element.innerHTML="",n().next()},t)},l=function*(){o.isStopped&&(yield null);for(var e=0,t=0;t<o.words.length;t++){if(o.words[t]){r(o.words[t],e).next();var n=o.words[t].length*o.charSpeed;o.flipflop&&(n*=2),e+=n+o.delay}}yield setTimeout(function(){o.loop&&l().next()},e)};this.start=function(){if("string"==typeof o.selector&&o.selector&&Array.isArray(o.words)&&o.words.length){var e=t.querySelector(o.selector);e&&(o.element=e,o.isStopped=!1,l().next())}},this.stop=function(){o.isStopped=!0,o.position=0,o.currentWord=""}}}(window,document);
//# sourceMappingURL=autotyper.min.js.map
