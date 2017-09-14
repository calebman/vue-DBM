<style>
  .span_type{
    font-size: 18px;
    color: #0082e6;
  }
  .span_label{
    font-size: 18px;
    color: #1f2d3d;
  }
  .span_detail{
    font-size: 14px;
    color: #c0ccda;
  }
  .span_operation{
    font-size: 14px;
    color: #ed3f14;
  }
  .span_table{
    font-size: 18px;
  }
</style>
<template>
  <div>
    <Card style="border-color: #c0ccda">
      <p slot="title">
        <Icon size="18" type="ios-calendar-outline"></Icon>
        <span class="span_table">{{tableName}}</span>
        &nbsp;
        <span class="span_detail"> {{columnsData.length}}列 &nbsp;{{tableDataCount}}行</span>
      </p>
      <a href="#" slot="extra" @click.prevent="editTable" style="margin-right: 8px;">
        <Icon type="edit"></Icon>
        编辑
      </a>
      <a href="#" slot="extra" @click.prevent="showDel" style="color: #ed3f14;">
        <Icon type="trash-a"></Icon>
        删除
      </a>
      <ul>
        <li v-for="(item,index) in columnsData" style="margin-top: 3px">
          <Row>
            <Col :span="8">
            <span class="span_label">{{item.label}}</span>
            </Col>
            <Col :span="12">
            <Icon type="pound" size="18" :color="columnColor" v-if="item.type == 'text'"></Icon>
            <Icon type="android-time" size="18" :color="columnColor" v-if="item.type == 'date'"></Icon>
            <Icon type="images" size="18" :color="columnColor" v-if="item.type == 'img'"></Icon>
            <Icon type="calculator" size="18" :color="columnColor" v-if="item.type == 'number'"></Icon>
            <Icon type="ios-flag-outline" size="20" :color="columnColor"  v-if="item.type == 'select'"></Icon>
            &nbsp;
            <span class="span_type" v-if="item.type == 'text'">文本类型</span>
            <span class="span_type" v-if="item.type == 'date'">时间类型</span>
            <span class="span_type" v-if="item.type == 'img'">图片类型</span>
            <span class="span_type" v-if="item.type == 'number'">数字类型</span>
            <span class="span_type" v-if="item.type == 'select'">{{item.items.length}}项可选</span>
            </Col>
            <Col :span="4">
            <Poptip
              confirm
              placement="bottom-start"
              title="您确认删除列吗？"
              @on-ok="delColumn(item,index)">
              <a>
                <span class="span_operation">删除</span>
              </a>
            </Poptip>
            </Col>
          </Row>
        </li>
      </ul>
    </Card>
    <Modal v-model="delVisible" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>表格删除操作不可恢复</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="delTable">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          columnColor:"blue",
          delVisible:false
        }
      },
      methods:{
        editTable(){
          this.$emit('onEditTable',this.tableName,this.columnsData)
        },
        delTable(){
          this.delVisible = false
          this.$emit('onDelTable',this.tableName)
        },
        delColumn(col,index){
          var updateOpts = []
          updateOpts.push({
            opt:"del",
            col:col,
            index:index
          })
          this.$emit('onDelCol',this.tableName,updateOpts)
        },
        showDel(){
          this.delVisible = true
        }
      },
      props:{
        tableName:String,
        tableDataCount:Number,
        columnsData:Array
      }
    }
</script>
