<template>
  <dl :class="['v-select',sizeClass]" v-click-outside="clickOutside">
    <dt class="v-select-dt">
      <a class="v-select-selected" @click.stop.prevent="toggleItems()" :style="{'width':width+'px'}">
        <template v-if="isInput">
          <input class="v-select-input" :placeholder="placeholder" type="text" v-model="inputValue" />
        </template>
        <template v-else>
          <span class="v-select-selected-span">{{showSelectInfo()}}</span>
        </template>
        <i class="v-select-selected-i dbm d-icon-downarrow"></i>
      </a>

    </dt>
    <dd v-show="visible" class="v-select-dd">
      <ul class="v-select-items" :style="{'min-width':width+'px','max-width':getMaxWidth+'px'}">
        <li v-for="item in internalOptions" @click.stop="selectOptionClick(item)" :class="['v-select-items-li',item.selected ? 'active' : '']">
          <a :class="['v-select-items-li-a',getTextAlignClass()]" href="javascript:void(0);">{{item.label}}</a>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
import settings from "@/utils/settings.js";

import layerAdjustment from "./layerAdjustment.js";

export default {
  name: "v-select",
  mixins: [layerAdjustment],
  directives: {
    "click-outside": {
      bind: function bind(el, binding, vNode) {
        if (typeof binding.value !== "function") {
          var msg =
            "in [clickoutside] directives, provided expression '" +
            binding.expression +
            "' is not a function ";

          var compName = vNode.context.name;

          if (compName) {
            msg += "in " + compName;
          }
          console.error(msg);
        }

        var handler = function handler(e) {
          if (!el.contains(e.target) && el !== e.target) {
            binding.value(e);
          } else {
            return false;
          }
        };

        el.__clickOutSide__ = handler;

        document.addEventListener("click", handler, true);
      },

      unbind: function unbind(el) {
        document.removeEventListener("click", el.__clickOutSide__, true);
        el.__clickOutSide__ = null;
      }
    }
  },

  data() {
    return {
      visible: false,

      internalOptions: [],

      // checkboxGroup 选中的项
      checkboxGroupList: [],

      // 样式前缀
      textAlignPrefix: "v-select-items-li-a-",

      inputValue: ""
    };
  },
  props: {
    size: {
      type: String
    },

    width: {
      type: Number,
      default: 90
    },

    // select的最大宽度(超出隐藏)
    maxWidth: {
      type: Number
    },

    // 如果为true 会包含 checkbox
    isMultiple: {
      type: Boolean,
      default: false
    },

    // 用户传入v-model 的值 [{value/label/selected}]
    value: [Object, Array],

    // 占位符
    placeholder: {
      type: String,
      default: "请选择",
      validator: function(value) {
        return value.length > 0;
      }
    },

    // 文本居中方式 left|center|right
    textAlign: {
      type: String,
      default: "left"
    },

    // 最小选中数量
    min: {
      type: Number,
      default: 0
    },

    // 最大选中数量
    max: {
      type: Number,
      default: 999
    },

    // 是否支持输入input
    isInput: {
      type: Boolean,
      default: false
    }
  },

  /* components: {
            VCheckboxGroup, VCheckbox
        },*/

  computed: {
    sizeClass() {
      let size = settings.sizeMaps[this.size] || settings.sizeMapDefault;
      return size === settings.sizeMaps["large"]
        ? " v-select--large"
        : size === settings.sizeMaps["middle"]
          ? " v-select--middle"
          : " v-select--small";
    },

    // 获取最大宽度(不设置则是无穷大)
    getMaxWidth() {
      var result = Infinity,
        maxWidth = this.maxWidth,
        width = this.width;

      if (maxWidth && maxWidth > 0 && maxWidth > width) {
        result = maxWidth;
      }

      return result;
    }
  },
  methods: {
    // 初始化
    init() {
      this.internalOptions = Object.assign([], this.value);

      this.checkboxGroupList = this.selectedLabels();

      if (this.isInput) {
        this.setInputValue();
      }
    },

    // 设置文本框的值
    setInputValue() {
      var result, labels;

      labels = this.selectedLabels();
      if (Array.isArray(labels) && labels.length > 0) {
        result = labels.join();
      }

      this.inputValue = result;
    },

    // checkbox 选中改变事件
    checkboxGroupChange() {
      this.selectOptionClick();
    },

    toggleItems() {
      this.visible = !this.visible;

      if (this.visible) {
        this.$nextTick(x => {
          this.dropDownClick();
        });
      }
    },

    selectOptionClick(item) {
      if (!this.isMultiple) {
        this.internalOptions.map(x => {
          if (item.label === x.label) {
            x.selected = true;
          } else {
            x.selected = false;
          }
          return x;
        });
      } else {
        // 多选
        this.internalOptions.map(x => {
          if (this.checkboxGroupList.includes(x.label)) {
            x.selected = true;
          } else {
            x.selected = false;
          }
          return x;
        });
      }

      if (!this.isMultiple) {
        this.toggleItems();
      }

      if (this.isInput) {
        this.setInputValue();
      }

      // 使用户传入的v-model 生效
      this.$emit("input", this.internalOptions);

      this.$emit("change");
    },

    // 显示选中的信息
    showSelectInfo() {
      var result, labels;

      labels = this.selectedLabels();
      if (Array.isArray(labels) && labels.length > 0) {
        result = labels.join();
      } else {
        result = this.placeholder;
      }

      return result;
    },

    // 获取样式名称
    getTextAlignClass() {
      return this.textAlignPrefix + this.textAlign;
    },

    // 当前选中项的label
    selectedLabels() {
      return this.internalOptions.filter(x => x.selected).map(x => {
        if (x.selected) {
          return x.label;
        }
      });
    },

    clickOutside() {
      this.visible = false;
    },

    // 下拉点击显示
    dropDownClick() {
      var dtEle = this.$el.querySelector(".v-select-dt"),
        ddItem = this.$el.querySelector(".v-select-items");
      this.layerAdjustmentOnce(ddItem, dtEle, 2);
      return false;
    },

    // 确定下拉框的位置
    dropdownAdjust() {
      var dtEle = this.$el.querySelector(".v-select-dt"),
        ddItem = this.$el.querySelector(".v-select-items");
      this.layerAdjustmentBind(ddItem, dtEle, 2);
    }
  },

  created() {
    this.init();
  },
  mounted() {
    this.dropdownAdjust();
  },
  watch: {
    value: function(val) {
      this.init();
    }
  }
};
</script>