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
    inSelect() {
      if (this.cellClickData.index == this.index &&
        this.cellClickData.field == this.field) {
        this.focus();
        return true;
      }
    }
  },
  methods: {
    focus() {
      let self = this;
      setTimeout(function () {
        if (self.$refs["rendercolumn"]) {
          self.$refs["rendercolumn"].focus();
        }
      }, 100);
    },
    blur() {
      if (this.v != this.value) {
        this.$emit("on-value-change", this.field, this.index, this.v);
      }
      this.$emit("on-value-cancel", this.field, this.index);
    },
    changeValue(val) {
      this.$emit("on-value-change", this.field, this.index, val);
      this.$emit("on-value-cancel", this.field, this.index);
    }
  },
  watch: {
    value(val) {
      this.v = val;
    }
  }
}