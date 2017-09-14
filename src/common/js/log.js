export default {
  openLog : false ,
  info:function (msg) {
    if(this.openLog){
      console.info(msg)
    }
  },
  error:function (msg) {
    if(this.openLog){
      console.error(msg)
    }
  },
  log:function (msg) {
    if(this.openLog){
      console.log(msg)
    }
  }
}
