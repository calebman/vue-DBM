<template>
  <div>
    <route-page></route-page>
  </div>
</template>

<script>
  import RoutePage from './components/framework/RoutePage.vue'
export default {
  name: 'app',
  components:{
    RoutePage
  },
  computed:{
    author:{
      get(){
        return this.$store.state.author
      },
      set(newValue){
        this.$store.state.author = newValue
      }
    }
  }
}
</script>

<style>

</style>
