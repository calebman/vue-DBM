export default {
  openLog : false ,
  filter:"",
  info:function (msg,type) {
    if(this.openLog){
      if(type&&type.indexOf(this.filter)>-1){
        console.info(msg)
      }else if(!type){
        console.info(msg)
      }
    }
  },
  error:function (msg,type) {
    if(this.openLog){
      if(type&&type.indexOf(this.filter)>-1){
        console.error(msg)
      }else if(!type){
        console.error(msg)
      }
    }
  },
  log:function (msg,type) {
    if(this.openLog){
      if(type&&type.indexOf(this.filter)>-1){
        console.log(msg)
      }else if(!type){
        console.log(msg)
      }
    }
  }
}
