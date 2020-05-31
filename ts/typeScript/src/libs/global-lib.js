function globalLib(opt) {
  console.log(opt);
}

globalLib.version = '1.0.0'
globalLib.dosomething = function() {
  console.log('globalLib dosomething');
}