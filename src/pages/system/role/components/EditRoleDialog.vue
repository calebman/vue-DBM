<template>
  <Modal v-model="v"
         width="840"
         @on-cancel="closeDialog">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>{{roleInfo.nickName}}的权限分配</span>
    </p>
    <div>
      <Transfer
        :data="mockData"
        :target-keys="roleInfo.roles"
        :list-style="{width: '350px',height: '200px'}"
        :render-format="render"
        :operations="['移除权限','添加权限']"
        :titles="titles"
        not-found-text="没有任何权限"
        @on-change="handleChange"
        filterable>
      </Transfer>
    </div>
    <div slot="footer">
      <Button type="info" size="large" long @click="confirm">确认</Button>
    </div>
  </Modal>
</template>

<script>
    export default {
      data () {
        return {
          v:this.value
        }
      },
      props:{
        mockData:Array,
        value:Boolean,
        roleInfo:{
          type: Object,
          default() {
            return {}
          }
        }
      },
      methods: {
        handleChange (newTargetKeys) {
          this.roleInfo.roles = newTargetKeys
          console.log(this.mockData)
          console.log(this.mockData[0].disabled)
        },
        render (item) {
          return item.label + ' - ' + item.description;
        },
        confirm(){
          this.closeDialog()
          var data = {
            roleCode:this.roleInfo.roleCode,
            roles:this.roleInfo.roles
          }
          this.$http.post(this.HOST+'/admin/system/role/edit',data).then((response) => {
            if(response.status == 200){
              this.$emit('onSuccess',this.roleInfo)
            }
          })
        },
        closeDialog(){
          this.v = false
        }
      },
      computed: {
        titles(){
          var _titles = []
          _titles.push('所有权限')
          _titles.push(this.roleInfo.nickName+'角色拥有权限')
          return _titles
        }
      },
      watch:{
        v(val){
          this.$emit('input',val)
        },
        value(val){
          this.v = val
        }
      }
    }
</script>
