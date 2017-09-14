<template>
  <Tag :color="color">
    {{data}}
  </Tag>
</template>

<script>
    export default {
      props:{
        data:String,
        color:String
      }
    }
</script>
