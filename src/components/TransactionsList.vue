<template>
  <div class="hello">
    <login v-if="this.data != null">
        Transactions :
        <div class="container">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>TIME</th>
                        <th>TRANSACTION NB</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in this.data.transactions" :key="transaction.time">
                        <td>{{transaction.time}}</td>
                        <td>{{transaction.transaction_nb}}</td>
                        <td>{{transaction.amount_total}}</td>
                        <td>{{transaction.status}}</td>
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
import swal2 from 'sweetalert2'

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
      }

  },
  mounted: function () {
    }
}

</script>