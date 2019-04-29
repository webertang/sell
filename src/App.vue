<template>
  <div id="app">
    <div class="tab">
        <v_header :seller="seller"></v_header>
    </div>
    <router-view/>
  </div>
</template>

<script>
import v_header from '@/components/header'
import axios from '@/libs/api.request'

export default {
  name: 'App',
  data(){
    return{
      seller:{      }
    }
  },
  created(){
    axios.request({
      url: 'seller',
      method: 'get'
    }).then(res=>{
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
