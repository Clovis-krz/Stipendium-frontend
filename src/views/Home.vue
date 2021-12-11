<template>
  <div class="home">
    <img alt="Stipendium logo" src="../assets/logo.png" height="240" width="240">
    <HelloWorld msg="Welcome to Stipendium"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Introduction.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
