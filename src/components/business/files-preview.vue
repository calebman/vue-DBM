<template>
  <transition name="fade">
    <div class="media-wrapper" v-if="isShow">
      <div class="media-right-top">
        <el-button type="success" icon="icon dbm d-icon-download1" circle @click="download"></el-button>
        <el-button type="danger" icon="icon dbm d-icon-delete" circle @click="del"></el-button>
        <el-button type="info" icon="icon dbm d-icon-close" circle @click="close"></el-button>
      </div>
      <div class="media-controller">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click.prevent="prev"></el-button>
          <el-button type="primary">
            <i class="el-icon-arrow-right el-icon--right" @click.prevent="next"></i>
          </el-button>
        </el-button-group>
      </div>
      <div class="media-content">
        <div v-for="(item,index) in coverValue.files" :key="index" :class="type(index)">
          <img v-if="isImg(item)" :src="getFullPath(item)" @click="toggle(index)">
          <video v-else-if="isVideo(item)" :src="getFullPath(item)" @click="toggle(index)"></video>
          <img v-else :src="getThumbnailIconUrl(item)" @click="toggle(index)">
          <br>
          <span class="file-content">{{getFileName(item)}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import datatableUtils from "@/utils/datatableUtils";
export default {
  name: "imagespreview",
  data: function() {
    return {
      showIndex: this.initIndex,
      isShow: this.showPreview
    };
  },
  props: {
    fileValue: String,
    initIndex: {
      type: Number,
      default: 0
    },
    showPreview: Boolean
  },
  computed: {
    coverValue() {
      return datatableUtils.covertFileColumnValue(this.fileValue);
    }
  },
  methods: {
    next() {
      if (this.showIndex == this.coverValue.files.length - 1) {
        this.$message({
          message: "已到达最后一张",
          type: "warning"
        });
      } else {
        this.showIndex++;
      }
    },
    prev() {
      if (this.showIndex == 0) {
        this.$message({
          message: "已到达第一张",
          type: "warning"
        });
      } else {
        this.showIndex--;
      }
    },
    type(index) {
      if (index == this.showIndex) {
        return "media-center";
      } else if (index - this.showIndex == 1) {
        return "media-right";
      } else if (index - this.showIndex == -1) {
        return "media-left";
      } else {
        return "media-hide";
      }
    },
    isImg(relativePath) {
      return datatableUtils.isImg(relativePath);
    },
    getFullPath(relativePath) {
      return this.coverValue.root + "/" + relativePath;
    },
    isVideo(relativePath) {
      return datatableUtils.isVideo(relativePath);
    },
    toggle(index) {
      if (index - this.showIndex == 1) {
        this.showIndex++;
      } else if (index - this.showIndex == -1) {
        this.showIndex--;
      }
    },
    close() {
      this.$emit("close");
      this.showIndex = 0;
    },
    download() {},
    del() {
      this.$emit("delete", this.showIndex);
      this.showIndex = 0;
    },
    getThumbnailIconUrl(relativePath) {
      return datatableUtils.getThumbnailIconUrl(relativePath);
    },
    getFileName(relativePath) {
      return datatableUtils.getFileNameFromRelativePath(relativePath);
    }
  },
  watch: {
    initIndex(val) {
      this.showIndex = val;
    },
    showPreview(val) {
      this.isShow = val;
    }
  }
};
</script>
<style lang="less" scoped>
.media-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(221, 222, 225, 0.52);
  z-index: 1010;
  i {
    color: #fff;
  }
  .media-controller {
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
  }
  .media-right-top {
    text-align: center;
    margin-top: 10px;
    .download i {
      color: #50de31;
    }
    .open i {
      color: #50de31;
    }
    .close i {
      color: #dae196;
    }
    .delete i {
      color: rgba(221, 15, 15, 0.85);
    }
    i {
      font-size: 30px;
    }
  }
  .media-content {
    div {
      position: absolute;
      top: 50%; // background: green;
      color: #fff;
      text-align: center;
      font-size: 30px;
      transition: all 0.56s ease;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      video {
        width: 100%;
      }
    }
    .media-center {
      height: 50%;
      width: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1011;
    }
    .media-left,
    .media-right {
      width: 25%;
      height: 35%;
      filter: grayscale(90%);
    }
    .media-right {
      left: 100%;
      transform: translate(-105%, -50%);
    }
    .media-left {
      left: 0;
      transform: translate(5%, -50%);
    }
    .media-hide {
      height: 0;
      width: 0;
      left: 50%;
      z-index: 1010;
      opacity: 0;
    }
    .file-content {
      font-size: 20px;
      color: #1c2438;
    }
  }
}
</style>