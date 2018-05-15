## 混入对象相关笔记

### 1. 小知识

* 混入对象将享有被混入组件的生命周期
* 数据对象混入冲突时将以组件数据优先
* 对象选项（如methods、components、directives）混入冲突时取组件对象的键值对
* 同名钩子混合为数组，混入对象的钩子将在组件自身钩子之前调用

### 2. 应用场景

* 希望部分路由页面在离开时销毁但是不希望每个路由页面都定义局部路由时

```javascript
// 定义混入对象
export default {
  beforeRouteLeave(to, from, next) {
    if (to.meta && to.meta.destroy) {
      this.$destroy();
    }
    next();
  }
}

// 混入需要此功能的组件页面
import routeLeaveDestoryMixin from "routeleave-destory-mixin";
export default {
  // ...
  mixins: [routeLeaveDestoryMixin]
}
```

* 数据表格自定义了文本、数字、时间以及文件单元格组件，每个组件都有同样的数据修改、焦点选中等方法时，可提取为混入对象，提高组件复用性

```javascript
// see https://github.com/calebman/vue-DBM/blob/master/src/components/business/render-column-mixin.js

// 定义混入对象
export default {
  // ...
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

// 文本列
// see https://github.com/calebman/vue-DBM/blob/master/src/components/business/text-column.vue
<template>
  <div>
    <input v-show="inSelect" ref="rendercolumn" @blur="blur" @keyup="enter($event)" v-model="v" />
    <span v-show="!inSelect" class="cell-text">{{v}}</span>
  </div>
</template>
// 时间列
// see https://github.com/calebman/vue-DBM/blob/master/src/components/business/datetime-column.vue
<template>
  <div>
    <el-date-picker v-show="inSelect" ref="rendercolumn" v-model="v" type="datetime" @change="changeValue" @blur="blur"></el-date-picker>
    <span v-show="!inSelect">{{coverValue}}</span>
  </div>
</template>
```

* 希望降低组件的复杂度的时候可使用多个混入组件来分割核心组件的功能

```bash
# see https://github.com/calebman/vue-DBM/tree/master/src/components/table
├─table
│      cell-edit-mixin.js                      # 单元格编辑
│      classes-mixin.js                        # 表格样式                     
│      scroll-bar-control-mixin.js             # 表格滚动
│      table-empty-mixin.js                    # 无数据时的处理
│      table-resize-mixin.js                   # 表格的自适应
│      table-row-mouse-events-mixin.js         # 鼠标移动时的样式改变
```

