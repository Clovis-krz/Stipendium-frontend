<template>
  <div class="hello">

    <info-transaction v-if="transaction_nb != null && status == 'pending'">
      <br><h2>Transaction number : {{ transaction_nb }}</h2>
      <h2 v-if="data.expiration != null">Time left : {{ min_time +" min "+ sec_time + " sec"}}</h2> 
      <qrcode-vue :value=data.public_key :size="200" level="H" v-if="data.public_key != null"/>
      <h2 v-if="data.public_key != null">Wallet address : {{ data.public_key }}</h2>
      <h2 v-if="data.currency != null">Currency : {{ data.currency }}</h2>
      <h2 v-if="data.amount_total != null">Amount to send : {{ data.amount_total }}</h2>
      <h2 v-if="data.amount_to_pay != null">Amount still to pay : {{ data.amount_to_pay }}</h2>
    </info-transaction>

    <transaction-done v-if="status == null">
      <br><h2>Transaction number : {{ transaction_nb }}</h2>
      <transaction-success v-if="data.payment_status == 'success'">
        <br>
        <h3>Your payment is successfull,<br> you can close this page and come back on the merchand site</h3>
        <SuccessButton/>
      </transaction-success>

      <transaction-failed v-if="data.payment_status == 'failed'">
        <h3>Payment Failed, Time elapsed.<br> Please come back on the merchand site and try again</h3>
      </transaction-failed>
    
    </transaction-done>
    
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import SuccessButton from '@/components/SuccessButton.vue'
import swal from 'sweetalert2'
import swal2 from 'sweetalert2'

export default {
  name: 'TransactionMonitoring',
  data(){
    return{
      status: "pending",
      transaction_nb: null,
      data: null,
      min_time: 0,
      sec_time: 0,
      time: 0,
      expiration: 0,
      paid: false
    }
  },
  components: {
      QrcodeVue,
      SuccessButton
  },
  mounted: function () {
    this.transaction_nb = this.$route.query.transaction;

    //ASK USER TO ENTER TRANSACTION NUMBER AND FETCH UNTIL IT FINDS TRANSACTION IF NOT FOUND DISPLAY ERROR
    if (this.transaction_nb == null)
    {
      swal2.fire({
        title: 'Write your transaction number :',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Find',
        showLoaderOnConfirm: true,
        preConfirm: (transaction_nb) => {
          return fetch("http://localhost:3000/api/monitoring?ordernb="+transaction_nb)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              swal2.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !swal2.isLoading()
      }).then((data) => {
        console.log(data);
        if (data.value) {
          this.transaction_nb = data.value.transaction_nb;
          this.data = data.value;
        }
      })
    }
    // SHOW A LOADER UNTIL TRANSACTION IS FOUND IF NOT FOUND DISPLAY ERROR
    if (this.transaction_nb != null) {
      swal2.fire({
        title: 'We are looking for your transaction number',
        showConfirmButton: false,
        didOpen: () => {
          swal2.showLoading();
          return fetch("http://localhost:3000/api/monitoring?ordernb="+this.transaction_nb)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              swal2.showValidationMessage(
                `Request failed: ${error}`
              )
            }).then(data => {
              this.data = data;
              this.transaction_nb = data.transaction_nb;
              swal2.close();
              })
        }
      })
    }

    // AUTOMATIC RELOAD TRACK API
    window.setInterval(() => {
      this.time = Date.now()/1000;
      if (this.transaction_nb != null)
      {
          fetch("http://localhost:3000/api/monitoring?ordernb="+this.transaction_nb)
          .then(response => response.json())
          .then(data => (this.data = data));

          this.status = this.data.status;
          this.expiration = this.data.expiration;
          this.min_time = Math.floor((this.expiration - this.time)/60);
          this.sec_time = Math.floor((this.expiration - this.time)%60);

          // IF PAYMENT SUCCESS OPEN SMALL WINDOWS WITH PAYMENT SUCCESS MESSAGE
          if (this.data.payment_status == "success" && !this.paid){
            this.paid = true;
            new swal(
              'Payment Successfull!',
              'Thanks for your purchase with Stipendium !',
              'success'
              )
          }
          // IF PAYMENT FAILED OPEN SMALL WINDOWS WITH PAYMENT FAILED MESSAGE
          if (this.data.payment_status == "failed" && !this.paid){
            this.paid = true;
            new swal(
              'Payment Failed!',
              'Time elapsed',
              'error'
              )
          }
      }
    }, 1000)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
transaction-success
{
  color: lightgreen;
}

transaction-failed
{
  color: lightcoral;
}

</style>