<template>
  <div class="merchand">
    <h1>Merchand Account Management</h1>
    <merchand-info/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Introduction.vue'
import MerchandInfo from '@/components/MerchandInfo.vue'

export default {
  name: 'Merchand',
  components: {
    HelloWorld,
    MerchandInfo
  }
}
</script>