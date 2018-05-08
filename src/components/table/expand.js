export default {
  name: 'TableExpand',
  functional: true,
  props: {
    row: Object,
    field: String,
    index: Number,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      field: ctx.props.field,
      index: ctx.props.index
    };
    return ctx.props.render(h, params);
  }
};