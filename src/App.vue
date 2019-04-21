<template>
  <div id="app">
    <div class="tab">
        <sellHeader></sellHeader>
    </div>
    <router-view/>
  </div>
</template>

<script>
import sellHeader from '@/components/header'
export default {
  name: 'App',
  components: {
    sellHeader
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
