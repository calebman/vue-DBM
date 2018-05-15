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