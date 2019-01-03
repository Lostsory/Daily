const child = require('child_process');

const cpuNum = require('os').cpus().length

/* for(let i = 0; i < cpuNum; i++) {
  child.fork('./works/work1.js')
} */

const worker = child.fork('./works/work1.js')

worker.on('exit', () => {
  
})


console.log(cpuNum);
