export default {
  data() {
    return {
      v: this.value
    };
  },
  props: {
    value: {
      type: String | Number | Date,
      default: null
    },
    field: {
      type: String
    },
    index: {
      type: Number
    },
    cellClickData: {
      type: Object,
      default: function () {
        return {
          index: -1,
          field: ""
        };
      }
    }
  },
  computed: {
    // 是否选中此单元格
    inSelect() {
      if (this.cellClickData.index == this.index &&
        this.cellClickData.field == this.field) {
        this.focus();
        return true;
      }
    }
  },
  methods: {
    // 获取焦点
    focus() {
      let self = this;
      setTimeout(function () {
        if (self.$refs["rendercolumn"]) {
          self.$refs["rendercolumn"].focus();
        }
      }, 100);
    },
    // 失去焦点
    blur() {
      if (this.v != this.value) {
        this.$emit("on-value-change", this.field, this.index, this.v);
      }
      this.$emit("on-value-cancel", this.field, this.index);
    },
    // 数据修改
    changeValue(val) {
      this.$emit("on-value-change", this.field, this.index, val);
      this.$emit("on-value-cancel", this.field, this.index);
    }
  },
  watch: {
    // 监听父组件数据变化
    value(val) {
      this.v = val;
    }
  }
}