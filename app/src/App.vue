<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- 在Home/Search显示，在Login/Register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>

</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    //组件挂载完毕，可以向服务器发请求获取三级联动
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>

</style>
