<template>
  <div class="table-body-cell">
    <div class="image-list" v-for="(item,index) in coverValue.files">
      <img v-if="isImg(item)" :src="getImgPath(item)">
      <img v-else :src="getThumbnailIconUrl(item)">
      <div class="image-list-cover">
        <i class="el-icon-search" @click="fileView(item,index)"></i>
      </div>
    </div>
    <div v-if="coverValue.files.length < 7" class="image-list-add" @click="addFile">
      <div style="width:30px; height:30px;">
        <i class="el-icon-plus"></i>
      </div>
    </div>
  </div>
</template>
<script>
import datatableUtils from "@/utils/datatableUtils";
import renderColumnMinix from "./render-column-mixin";
export default {
  name: "imagecolumn",
  components: {},
  mixins: [renderColumnMinix],
  data() {
    return {};
  },
  props: {},
  computed: {
    coverValue() {
      return datatableUtils.covertFileColumnValue(this.v);
    }
  },
  methods: {
    fileView(item, index) {
      this.$emit("file-preview", item, index);
    },
    addFile() {
      this.$emit("file-add");
    },
    isImg(relativePath) {
      return datatableUtils.isImg(relativePath);
    },
    getImgPath(relativePath) {
      return this.coverValue.root + "/" + relativePath;
    },
    getThumbnailIconUrl(relativePath) {
      return datatableUtils.getThumbnailIconUrl(relativePath);
    }
  }
};
</script>
<style lang="less" scoped>
.table-body-cell {
  padding: 0 2px;
  margin: 0;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  .image-list {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid transparent;
    border-radius: 3px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 3px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .image-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
  .image-list:hover .image-list-cover {
    display: block;
  }
  .image-list-add {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    overflow: hidden;
    background: #fff;
    position: relative;
    cursor: pointer;
    margin-right: 3px;
    color: #ddd4cb;
    border: 1px dashed #dddee1;
  }
  .image-list-add:hover {
    color: #20a0ff;
    border: 1px dashed #20a0ff;
  }
}
</style>