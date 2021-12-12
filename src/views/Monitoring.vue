<template>
  <div class="about">
    <h1>Monitoring Transaction</h1>
    <p>
      <CountDown/>
    </p>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/Introduction.vue'
import CountDown from '@/components/CountDown.vue'

export default {
  name: 'Monitoring',
  components: {
    HelloWorld,
    CountDown
  }
}
</script>