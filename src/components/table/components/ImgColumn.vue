<template>
  <section>
    <div class="demo-upload-list" v-for="(item,index) in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.src">
        <!--<img v-if="HOST=='/static'" :src="item.src">-->
        <!--<img v-else :src="HOST+'/'+item.src">-->
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" size="20" style="margin-top: 5px;margin-right: 3px;" @click.native="handleView(item,index)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="HOST+'/admin/data/table/'+tableName+'/edit/upload/'+ rowKey +'/'+row.tid"
      style="display: inline-block;width:30px;">
      <div style="width: 30px;height:30px;line-height: 30px;">
        <Icon type="plus" size="20" style="margin-top: 5px;margin-right: 3px;"></Icon>
      </div>
    </Upload>
    <Modal title="查看图片" v-model="visible" ok-text="删除" @on-ok="handleRemove(uploadItem)">
      <img :src="uploadItem.src" width="100%">
      <!--<img v-if="HOST=='/static'" :src="uploadItem.src" width="100%">-->
      <!--<img v-else :src="HOST+'/'+uploadItem.src" width="100%">-->
    </Modal>

  </section>
</template>
<script>
  export default {
    data () {
      return {
        uploadItem: {},
        selectIndex:0,
        visible: false,
        uploadList: []
      }
    },
    methods: {
      handleView (item,index) {
        this.uploadItem = item;
        this.selectIndex = index
        this.visible = true;
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        var data={
          columnName:this.rowKey,
          tid:this.row.tid,
          src:file.src
        }
        this.$http.post(this.HOST+"/admin/data/table/"+this.tableName+"/edit/removeImg/", data).then((response) => {
          if(response.status == 200){
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.$refs.upload.fileList.forEach((v,index)=>{
              urls+=(v.src+";")
            })
            this.$emit('onImgChange',this.row.tid, this.rowKey , urls.substr(0,urls.length-1))
            this.$Notice.success({
              title: '移除操作',
              desc: '图片移除成功'
            });
          }
        })
      },
      handleSuccess (res, file) {
        var src = res.data.url
        file.src =  src;
        file.name = src.substring(src.lastIndexOf("/")+1,src.indexOf("."));
        var urls = ""
        this.$refs.upload.fileList.forEach((v,index)=>{
          urls+=(v.src+";")
        })
        this.$emit('onImgChange',this.row.tid, this.rowKey , urls.substr(0,urls.length-1))
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 5 张图片。'
          });
        }
        return check;
      },
      cancel(){
        this.visible = false
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    },
    props:{
      row:{
        type: Object,
        default() {
          return {}
        }
      },
      rowKey:{
        type:String,
        default:""
      },
      tableName:{
        type:String,
        default:""
      }
    },
    computed: {
      defaultList(){
        let urlstr = this.row[this.rowKey]
        let list =[]
        if(urlstr != ""){
          let urls = urlstr.split(";")
          urls.forEach((src,index)=>{
            list.push({
              name:src.substring(src.lastIndexOf("/")+1,src.indexOf(".")),
              src:src
            })
          })
        }
        return list
      }
    }
  }
</script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .demo-carousel{
    color: #8391a5;
    width: 300px;
    height: 500px;
  }
</style>
