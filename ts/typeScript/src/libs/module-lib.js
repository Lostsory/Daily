const version = '1.0.0'
function dosomething () {
  console.log('module-lib dosomething');
}

function moduleLib(opt) {
  console.log(opt);
}

moduleLib.version = version
moduleLib.dosomething = dosomething

module.exports = moduleLib