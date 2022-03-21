<template>
  <div class="hello">
    <login v-if="this.data != null">
        <br><br>
        <h4>History of Transactions :</h4>
        <div class="container">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>TIME (UTC)</th>
                        <th>TRANSACTION NB</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in this.data.transactions.slice().reverse()" :key="transaction.transaction_nb">
                        <td>{{timestamp_to_time(transaction.time)}}</td>
                        <td>{{transaction.transaction_nb}}</td>
                        <td>{{transaction.amount_total}}</td>
                        <status-pending v-if="transaction.status == 'pending'">
                            <td class="bg-warning">{{transaction.status}}</td>
                        </status-pending>
                        <status-failed v-if="transaction.status == 'failed'">
                            <td class="bg-danger">{{transaction.status}}</td>
                        </status-failed>
                        <status-paid v-if="transaction.status == 'paid'">
                            <td class="bg-success">{{transaction.status}}</td>
                        </status-paid>
                    </tr>
                </tbody>
            </table>
        </div>
    </login>
    <not-connected v-if="data == null">
        {{ login(token) }}
    </not-connected>
  </div>
</template>

<script>

export default {
  name: 'TransactionsList',
  data(){
    return{
      token: null,
      data: null,
    }
  },
  props: ['token'],
  components: {
  },
  methods: {
      login(token){
          this.token = token;
          fetch("http://backend.sc2aips9849.universe.wf/api/transactions?token="+this.token)
            .then(response => response.json())
            .then(data => {
                this.data = data;
            })
      },
      timestamp_to_time(s){
          return new Date(s * 1000).toISOString().slice(0, 19).replace('T', ' ');
      }

  },
  mounted: function () {
      window.setInterval(() => {
        fetch("http://backend.sc2aips9849.universe.wf/api/transactions?token="+this.token)
            .then(response => response.json())
            .then(data => {
                this.data = data;
            })
    }, 60000)
},

}

</script>