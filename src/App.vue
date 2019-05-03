<template>
  <div id="app">
    <div class="tab">
        <v_header :seller="seller"></v_header>
    </div>
    <router-view :seller="seller"/>
  </div>
</template>

<script>
import v_header from '@/components/header'
import {getSellerData} from '@/api/data'

export default {
  name: 'App',
  data(){
    return{
      seller:{      }
    }
  },
  created(){
    getSellerData().then(res=>{
      this.seller = res.data.seller
    })
  },
  components: {
    v_header
  }
}
</script>

<style>

#app {
  text-align: center;
}
</style>
