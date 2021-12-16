<template>
  <div class="hello">
    <info-transaction v-if="transaction_nb != null && status=='pending'">
      <h2>Transaction number : {{ transaction_nb }}</h2>
      <h2 v-if="data.expiration != null">Time left : {{ min_time +" min "+ sec_time + " sec"}}</h2> 
      <qrcode-vue :value=data.public_key :size="200" level="H" v-if="data.public_key != null"/>
      <h2 v-if="data.public_key != null">Wallet address : {{ data.public_key }}</h2>
      <h2 v-if="data.currency != null">Currency : {{ data.currency }}</h2>
      <h2 v-if="data.amount_total != null">Amount to send : {{ data.amount_total }}</h2>
      <h2 v-if="data.amount_to_pay != null">Amount still to pay : {{ data.amount_to_pay }}</h2>
      <h1 v-if="data.public_key == null">{{ data.payment_status }}</h1>
    </info-transaction>
    <transaction-complete v-if="status == 'success'"><h1>Payment successfull</h1></transaction-complete>
    <transaction-failed v-if="status == 'failed'"><h1>Payment failed, elapsed time</h1></transaction-failed>
    <enter-transaction-nb v-if="transaction_nb == null">
      <h1>Please enter a transaction number :</h1>
      <input v-model="enter_transaction_nb" placeholder="example : 262256">
      <button v-on:click="this.transaction_nb = enter_transaction_nb;">Pay</button>
    </enter-transaction-nb>
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
      status: "pending",
      transaction_nb: null,
      data: null,
      min_time: 0,
      sec_time: 0,
      time: 0,
      expiration: 0
    }
  },
  components: {
      QrcodeVue,
  },
  mounted: function () {
    this.transaction_nb = this.$route.query.transaction;
    window.setInterval(() => {
      this.time = Date.now()/1000;
      if (this.transaction_nb != null)
      {
          fetch("http://localhost:3000/api/monitoring?ordernb="+this.transaction_nb)
          .then(response => response.json())
          .then(data => (this.data = data));
      } 
      this.expiration = this.data.expiration;
      this.min_time = Math.floor((this.expiration - this.time)/60);
      this.sec_time = Math.floor((this.expiration - this.time)%60);
    }, 1000)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>