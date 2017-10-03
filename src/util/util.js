export default {
  parentNode: null,
  node: null,
  generateUUID: function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    })
    return uuid;
  },
  getNode:function (tree, nodeId) {
    this.parentNode = null
    this.node = null
    var searchNode = this.searchNode(tree,nodeId,null)
    if(!searchNode.parentNode){
      searchNode.parentNode = {
        value:null,
        label:null,
        children:tree
      }
    }
    return searchNode
  },
  //递归寻找父节点
  searchNode:function (tree, nodeId,parentNode) {
    for (var i = 0; i < tree.length; i++) {
      if (this.node) {
        break;
      }
      var obj = tree[i];
      if (!obj || !obj.value) {
        continue;
      }
      if (obj.value == nodeId) {
        this.node = obj;
        this.parentNode = parentNode
        break;
      } else {
        if (obj.children&&obj.children.length>0) {
          this.searchNode(obj.children, nodeId , obj);
        } else {
          continue;
        }
      }
    }
    return {
      parentNode: this.parentNode,
      node: this.node
    }

  },
  clearTable:function (tree) {
    for (var i = 0; i < tree.length; i++) {
      var obj = tree[i];
      if (!obj || !obj.value) {
        continue;
      }
      if (obj.status == -1) {
        tree.splice(i,1)
        i--
        continue;
      } else {
        if (obj.children&&obj.children.length>0) {
          this.clearTable(obj.children);
        } else {
          continue;
        }
      }
    }
  },
  formatNum:function (str) {
    var newStr = "";
    var count = 0;
    if (!isNaN(str)) {
      str = str.toString()
    }
    if(str.indexOf(".")==-1){
      for(var i=str.length-1;i>=0;i--){
        if(count % 3 == 0 && count != 0){
          newStr = str.charAt(i) + "," + newStr;
        }else{
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      return newStr;
    }
    else {
      for(var i = str.indexOf(".")-1;i>=0;i--){
        if(count % 3 == 0 && count != 0){
          newStr = str.charAt(i) + "," + newStr;
        }else{
          newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
      }
      str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
      return str;
    }
  }
}
