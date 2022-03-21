<template>
  <div class="merchand">
    <h1>Merchand Account Management</h1>
    <connected v-if="this.token != null">
      <button @click="show_account()">Account Information</button> |
      <button @click="show_transactions()">History of transactions</button>

      <account v-if="this.display_account == true">
        <merchand-info v-bind:token="this.token" />
      </account>

      <transactions v-if="this.display_transactions == true">
        <TransactionsList v-bind:token="this.token" />
      </transactions>
      
    </connected>

    <not-connected v-if="this.token == null">
        <p>Please Log-in or Register if you don't have an account :</p>
        <button @click="login()">Log In</button> |
        <button @click="register()">Register</button>
    </not-connected>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Introduction.vue'
import MerchandInfo from '@/components/MerchandInfo.vue'
import TransactionsList from '@/components/TransactionsList.vue'

import swal2 from 'sweetalert2'

export default {
  name: 'Merchand',
  data(){
    return{
      token: null,
      display_account: false,
      display_transactions: true,
    }
  },
  components: {
    HelloWorld,
    MerchandInfo,
    TransactionsList
  },
  methods : {
    show_account(){
      if (this.display_account == false) {
        this.display_account = true;
      }else{
        this.display_account = false;
      }
    },
    show_transactions(){
      if (this.display_transactions == false) {
        this.display_transactions = true;
      }else{
        this.display_transactions = false;
      }
    },
    login(){
          const swalWithBootstrapButtons = swal2.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })
          swal2.fire({
                title: 'Log In',
                input: 'email',
                inputLabel: 'Your email address',
                inputPlaceholder: 'Enter your email address'
            }).then(email => {
                swal2.fire({
                    title: 'Enter your password',
                    input: 'password',
                    inputLabel: 'Password',
                    inputPlaceholder: 'Enter your password',
                    inputAttributes: {
                        maxlength: 10,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                }).then(password => {
                    fetch("http://backend.sc2aips9849.universe.wf/api/login?email="+email.value+"&password="+password.value)
                        .then(response => response.json())
                        .then(answer => {
                            if (answer.login_status == "success") {
                                this.token = answer.token;
                            }
                             else{
                                swalWithBootstrapButtons.fire(
                                    'Error',
                                    'Email/password combination wrong, please check that you have an account',
                                    'error'
                                )
                            }
                        })
                })
            })
      },
      register(){
          const swalWithBootstrapButtons = swal2.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
          swal2.fire({
            title: 'To register, please answer these questions',
            input: 'email',
            inputLabel: 'Your email address',
            inputPlaceholder: 'Enter your email address'
            }).then(email => {
                swal2.fire({
                    title: 'Enter your password',
                    input: 'password',
                    inputLabel: 'Password',
                    inputPlaceholder: 'Enter your password',
                    inputAttributes: {
                        maxlength: 10,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                    }).then(password => {
                        swal2.fire({
                            title: 'lastname',
                            input: 'textarea',
                            inputLabel: 'Your lastname',
                            inputPlaceholder: 'Enter your lastname'
                            }).then(lastname => {
                                swal2.fire({
                                    title: 'firstname',
                                    input: 'textarea',
                                    inputLabel: 'Your firstname',
                                    inputPlaceholder: 'Enter your firstname'
                                    }).then(firstname => {
                                        swal2.fire({
                                            title: 'store name',
                                            input: 'textarea',
                                            inputLabel: 'Your Store Name',
                                            inputPlaceholder: 'Enter your Store Name'
                                            }).then(store_name => {
                                                fetch("http://backend.sc2aips9849.universe.wf/api/create-account?email="+email.value+"&password="+password.value+"&firstname="+firstname.value+"&lastname="+lastname.value+"&store_name="+store_name.value)
                                                    .then(response => response.json())
                                                    .then(answer => {
                                                        if (answer.account_creation == "success") {
                                                            swalWithBootstrapButtons.fire(
                                                                'Account created',
                                                                'Your account has been created, reload the page',
                                                                'success'
                                                            )
                                                        }
                                                        else{
                                                            swalWithBootstrapButtons.fire(
                                                                'Error',
                                                                'An error has occured, please check that you dont already have an account',
                                                                'error'
                                                            )
                                                        }
                                                    })
                                            })
                                    })
                            })
                    })
            })
      }
  }
}
</script>