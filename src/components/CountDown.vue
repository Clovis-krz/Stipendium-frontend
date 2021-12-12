<template>
  <div class="hello">
    <h2>Transaction number : {{ transaction_nb }}</h2>
    <h2>Time left : {{ Math.floor(time_left/60) }} min and {{ time_left%60 }} seconds</h2> 
    <qrcode-vue :value=wallet_address :size="200" level="H" />
    <h2>Wallet address : {{ wallet_address }}</h2>
    <h2>Currency : {{ currency }}</h2>
    <h2>Amount to send : {{ amount_to_send }}</h2>
    <h2>Amount received : {{ amount_received }}</h2>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'CountDown',
  props: {
    msg: String
  },
  data(){
    return{
      transaction_nb: 26251,
      time_left: 3600,
      wallet_address: "SkdJ86sj5jH2az90mn6v2",
      currency: "SOL",
      amount_to_send: 0.5,
      amount_received: 0,
    }
  },
  components: {
      QrcodeVue,
  },
  mounted: function () {
    window.setInterval(() => {
      this.time_left -= 1;
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>