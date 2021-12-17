<template>
  <div class="about">
    <h1>Monitoring Transaction</h1>
    <p>
      <TransactionMonitoring/>
    </p>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/Introduction.vue'
import TransactionMonitoring from '@/components/TransactionMonitoring.vue'

export default {
  name: 'Monitoring',
  components: {
    HelloWorld,
    TransactionMonitoring
  }
}
</script>