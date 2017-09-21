<template>
  <div>
    <Icon type="compose" size="18" v-if="columnType == 'text'"></Icon>
    <Icon type="ios-clock-outline" size="18" v-if="columnType == 'date'"></Icon>
    <Icon type="images" size="20" v-if="columnType == 'img'"></Icon>
    <Icon type="ios-infinite-outline" size="18" v-if="columnType == 'number'"></Icon>
    <Icon type="ios-settings" size="20" v-if="columnType == 'select'"></Icon>
    <span style="margin-left: 5px;font-size: 17px;color: #828282">{{column.title}}</span>
  </div>
</template>

<script>
    export default {
      props:{
        column:{
          type: Object,
          default: function () {
            return {}
          }
        }
      },
      computed: {
        columnType(){
          return this.column.key.substring(0,this.column.key.indexOf("_"))
        }
      }
    }
</script>
