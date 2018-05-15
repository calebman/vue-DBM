## 控件封装与使用

### 1. 如何封装一个支持render渲染的组件

* 首先创建一个函数式组件

```javascript
// 表格拓展函数式组件的实现
// see https://github.com/calebman/vue-DBM/blob/master/src/components/table/expand.js
export default {
  name: 'TableExpand',
  functional: true, // 标记组件为 functional，这意味它是无状态 (没有响应式数据)，无实例 (没有 this 上下文)。
  props: {
    row: Object, // 当前行对象
    field: String, // 列名称
    index: Number, // 行号
    render: Function // 渲染函数
  },
  render: (h, ctx) => { // 提供ctx作为上下文
    const params = {
      row: ctx.props.row,
      field: ctx.props.field,
      index: ctx.props.index
    };
    return ctx.props.render(h, params);
  }
};
```

* 在父组件中引入

```javascript
// see https://github.com/calebman/vue-DBM/blob/master/src/components/table/table.vue
import expand from "./expand.js";

<span v-if="typeof col.render ==='function'">
   <expand :field="col.field" :row="item" :render="col.render" :index="rowIndex"></expand>
</span>
```

* 使用render函数渲染

```javascript
// see https://github.com/calebman/vue-DBM/blob/master/src/views/demo/datatable/data-table.vue
// 引入自定义组件
import IndexColumn from "@/components/business/index-column.vue";
// 注册
components: {
  // ...
  IndexColumn
}
// 使用
// 获取当前组件的上下文
let self = this;
// 定义渲染函数
render: (h, params) =>
  h("div", [
    h(IndexColumn, {
      props: {
        field: params.field,
        index: params.index,
        pagingIndex:
          (self.pagination.pageCurrent - 1) * self.pagination.pageSize
      },
      on: { "on-value-delete": self.deleteRow }
    })
  ])
```

