<template>
  <div>
    <Tag v-if="type == 'default'" color="blue">
      {{roleString}}
    </Tag>
    <Tag v-else :type="type" color="blue">
      {{roleString}}
    </Tag>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          type:"default"
        }
      },
      props:{
        roles:Array,
        mockData:Array
      },
      computed: {
        roleString(){
          var rolesArray = this.roles
          var mockDataArray = this.mockData
          if(rolesArray.length < 1){
            this.type = "border"
            return "没有任何权限"
          }
          var roleStr = ""
          rolesArray.forEach((rolecode,rolesIndex)=>{
            mockDataArray.forEach((value,mockDataIndex)=>{
              if(value.key == rolecode){
                roleStr+=" 【"+value.label+"】 "
              }
            })
          })
          return roleStr
        }
      }
    }
</script>
