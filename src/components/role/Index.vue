<template>
  <div>
    <Row type="flex" justify="end" style="margin-right: 30px">
      <Col>
        <Button type="primary" icon="edit" @click="changeRole">修改权限</Button>
        <Button type="primary" icon="plus-circled" @click="createRole">创建角色</Button>
        <Button type="error" icon="trash-a" @click="delRole">删除角色</Button>
      </Col>
    </Row>
    <Row style="margin-top: 10px">
      <Col>
        <Table
          :row-class-name="rowClassName"
          :columns="roleCoumns"
          :data="roleInfos"
          @on-row-click="rowClick"
          size="large"
          :show-header="false"></Table>
      </Col>
    </Row>
    <edit-role-dialog
      :mockData="mockData"
      :roleInfo="selectRow"
      v-model="editRoleDialogVisible"
      @onSuccess="onEditSuccess"></edit-role-dialog>
    <add-role-dialog
      v-model="addRoleDialogVisible"
      @onSuccess="onAddSuccess"></add-role-dialog>
    <del-role-dialog
      v-model="delRoleDialogVisible"
      :roleInfo="selectRow"
      @onSuccess="onDelSuccess"></del-role-dialog>
  </div>

</template>
<script>
  import RoleTags from './RoleTags.vue'
  import EditRoleDialog from './EditRoleDialog.vue'
  import AddRoleDialog from './AddRoleDialog.vue'
  import DelRoleDialog from './DelRoleDialog.vue'
  export default {
    data () {
      return {
        mockData: this._mockData,
        roleInfos:this._roleInfos,
        selectRow:{},
        editRoleDialogVisible:false,
        addRoleDialogVisible:false,
        delRoleDialogVisible:false,
        roleCoumns:[
          {
            title: '角色名称',
            key: 'nickName',
            width:120,
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person-stalker'
                  }
                }),
                h('strong', params.row.nickName)
              ])
            }
          },
          {
            title: '描述',
            key: 'description',
            width:200
          },
          {
            title: '拥有权限数量',
            key: 'roles',
            render: (h, params) => {
              return h('div', [
                h(RoleTags,{
                  props:{
                    roles:params.row.roles,
                    mockData:this.mockData
                  }
                })
              ])
            }
          }
        ]
      }
    },
    components:{
      RoleTags, EditRoleDialog, AddRoleDialog, DelRoleDialog
    },
    methods: {
      rowClick(row){
        this.selectRow = row
      },
      rowClassName (row, index) {
        if(this.selectRow.roleCode == row.roleCode){
          return 'demo-table-info-row'
        }else{
          return ''
        }
      },
      changeRole(){
        if(typeof(this.selectRow.roleCode)=="undefined"){
          this.$Message.warning("请选择一个角色")
        }else{
          this.editRoleDialogVisible = true
        }
      },
      createRole(){
        this.addRoleDialogVisible = true
      },
      delRole(){
        if(typeof(this.selectRow.roleCode)=="undefined"){
          this.$Message.warning('请选择一个角色')
        }else{
          this.delRoleDialogVisible = true
        }
      },
      onDelSuccess(roleInfo){
        let delIndex = -1
        this.roleInfos.forEach((value,index)=>{
          if(value.roleCode == roleInfo.roleCode){
            delIndex = index
          }
        })
        this.roleInfos.splice(delIndex,1)
        this.$Notice.success({title: '操作成功', desc: '【'+roleInfo.nickName+'】角色成功删除'})
        this.selectRow = {}
      },
      onEditSuccess(roleInfo){
        let editIndex = -1
        this.roleInfos.forEach((value,index)=>{
          if(value.roleCode == roleInfo.roleCode){
            editIndex = index
          }
        })
        this.roleInfos.splice(editIndex,1,roleInfo)
        this.$Notice.success({title: '操作成功', desc: '成功修改【'+roleInfo.nickName+'】角色权限'})
      },
      onAddSuccess(roleInfo){
        this.roleInfos.push(roleInfo)
        this.$Notice.success({title: '操作成功', desc: '成功添加【'+roleInfo.nickName+'】角色'})
      }
    },
    props:{
      _mockData:Array,
      _roleInfos:Array
    }
  }
</script>

<style>
  .ivu-table .demo-table-info-row td{
    background-color: #ebf7ff
  }
</style>
