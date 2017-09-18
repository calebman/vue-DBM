<template>
  <Modal
    v-model="param.visible"
    title="数据操作"
    @on-ok="commit"
    @on-cancel="closeDialog">
    <Form  :label-width="80">
      <template v-for="col in tableColumnsData">
        <template v-if="col.type == 'select'">
          <template v-for="var (key,value) in param.rowData" v-if="value == col.prop">
            <Form-item :label="col.label + '：'">
              <m-select :items="col.items" :name="col.prop" :value="key"  @onValueChange="createData"></m-select>
            </Form-item>
          </template>
        </template>
        <template v-else-if="col.type == 'date'">
          <template v-for="var (key,value) in param.rowData" v-if="value == col.prop">
            <Form-item :label="col.label + '：'">
              <m-date-picker
                @onValueChange="createData"
                :name="col.prop"
                :value="key"></m-date-picker>
            </Form-item>
          </template>
        </template>
        <template v-else-if="col.type == 'number'">
          <template v-for="var (key,value) in param.rowData" v-if="value == col.prop">
            <Form-item :label="col.label + '：'">
              <m-nnmber-input
                @onValueChange="createData"
                :name="col.prop"
                :value="key"></m-nnmber-input>
            </Form-item>
          </template>
        </template>
        <template v-else-if="col.type == 'text'">
          <template v-for="var (key,value) in param.rowData" v-if="value == col.prop">
            <Form-item :label="col.label + '：'">
              <m-text
                :name="col.prop"
                @onValueChange="createData"
                :value="key"></m-text>
            </Form-item>
          </template>
        </template>
      </template>
    </Form>
  </Modal>
</template>

<script>
  import MText from './components/MText.vue'
  import MDatePicker from './components/MDatePicker.vue'
  import MSelect from './components/MSelect.vue'
  import MNnmberInput from './components/MNumberInput.vue'
  export default {
    data() {
      return {
        param:this.editParam
      }
    },
    methods: {
      //提交修改申请
      commit(){
        var data = {
          rowData:this.param.rowData
        }
        if(this.param.isAdd){
          this.$http.post(this.HOST+this.addUrl, data).then((response) => {
            if(response.status == 200){
              if(this.HOST == "static"){
                this.param.rowData.tid = this.$utilHelper.generateUUID()
              }else{
                this.param.rowData.tid = response.body.data.tid
              }
              this.$emit('onEditSuccess',true,this.param.rowData)
            }
          })
        }else{
          this.$http.post(this.HOST+this.editUrl, data).then((response) => {
            if(response.status == 200){
              this.$emit('onEditSuccess',false,this.param.rowData)
            }
          })
        }

        this.closeDialog()
      },
      //关闭对话款并处理状态机数据
      closeDialog(){
        this.param.visible = false
      },
      //动态组装新增、修改数据
      createData(key,value){
        this.param.rowData[key] = value
      }
    },
    props:{
      editUrl:String,
      addUrl:String,
      tableName:String,
      tableColumnsData:Array,
      editParam:{
        type: Object,
        default() {
          return {
            rowData:{},
            visible:false,
            isAdd:true
          }
        }
      }
    },
    //时间、选择、文本控件
    components:{
      MDatePicker, MSelect, MText, MNnmberInput
    }
  }
</script>
