<template>
  <div class="hello">
    <login v-if="data != null">
    <h2>Here are your account info :</h2>
    Email:
    <input v-model="data.account.merchand_email" placeholder="Your email" />
    <button @click="update_account('merchand_email', data.account.merchand_email)">Update</button>
    <p></p>
    Password:
    <input v-model="this.newpass" placeholder="********" />
    <button @click="update_password()">Update</button>
    <p></p>
    Lastname:
    <input v-model="data.account.merchand_lastname" placeholder="lastname" />
    <button @click="update_account('merchand_lastname', data.account.merchand_lastname)">Update</button>
    <p></p>
    Firstname:
    <input v-model="data.account.merchand_firstname" placeholder="firstname" />
    <button @click="update_account('merchand_firstname', data.account.merchand_firstname)">Update</button>
    <p></p>
    Store Name:
    <input v-model="data.account.store_name" placeholder="example: amazon.com" />
    <button @click="update_account('store_name', data.account.store_name)">Update</button>
    <p></p>
    Wallet Public Address :
    <input v-model="data.account.public_key" placeholder="Solana public address" />
    <button @click="update_wallet()">Update</button>
    <p></p>
    <button @click="api_key_reset()">API KEY RESET</button>
    <p></p>
    <button @click="delete_account()">Delete Account</button>
    </login>
    <not-connected v-if="data == null">
        <button @click="login()">Log In</button> |
        <button @click="register()">Register</button>
    </not-connected>
  </div>
</template>

<script>
import swal2 from 'sweetalert2'

export default {
  name: 'MerchandInfo',
  data(){
    return{
      token: null,
      data: null,
      newpass: null,
      newwallet: null,
    }
  },
  components: {
  },
  methods: {
      update_account(element, value){
        fetch("http://backend.sc2aips9849.universe.wf/api/update-merchand-info?token="+this.token+"&element="+element+"&value="+value)
            .then(response => response.json())
            .then(data => (this.updated_notif(data.info_update)))
      },

      update_password(){
          const swalWithBootstrapButtons = swal2.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swal2.fire({
                title: 'Enter your current password to confirm',
                input: 'password',
                inputLabel: 'Password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 10,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                }
                }).then(pass => {
                    fetch("http://backend.sc2aips9849.universe.wf/api/update-password?token="+this.token+"&password="+pass.value+"&new_password="+this.newpass)
                    .then(response => response.json())
                    .then(data => {
                        if (data.password_update == "success") {
                            swalWithBootstrapButtons.fire(
                            'Password Changed',
                            'Your password has successfully been changed, reload the page',
                            'success'
                        )
                        }
                        else{
                            swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your current password is wrong, nothing has been changed',
                            'error'
                            )
                        }
                    })
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === swal2.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your current password is safe, no worries',
                'error'
                )
            }
            })
      },

      updated_notif(message){
          const Toast = swal2.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal2.stopTimer)
                toast.addEventListener('mouseleave', swal2.resumeTimer)
            }
            })

            Toast.fire({
            icon: 'success',
            title: message
            })
      },

      api_key_reset(){
          const swalWithBootstrapButtons = swal2.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'To Generate a new API key, the existing one will be removed',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reset API Key!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://backend.sc2aips9849.universe.wf/api/generate-api?token="+this.token)
                    .then(response => response.json())
                    .then(data => {
                        swalWithBootstrapButtons.fire(
                        data.key,
                        'Your API Key has been reset. PLEASE COPY THIS KEY, IT WILL NOT BE SHOWN AGAIN',
                        'success'
                        )
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === swal2.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your Existing API Key has not been removed',
                'error'
                )
            }
            })
      },

      update_wallet(){
          const swalWithBootstrapButtons = swal2.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'You are changing your wallet public address',
            text: "When you will have changed it, all new transactions funds will be redirected to this new address",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swal2.fire({
                title: 'Enter your current password to confirm',
                input: 'password',
                inputLabel: 'Password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 10,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                }
                }).then(pass => {
                    fetch("http://backend.sc2aips9849.universe.wf/api/update-wallet?token="+this.token+"&password="+pass.value+"&wallet="+this.data.account.public_key)
                    .then(response => response.json())
                    .then(data => {
                        if (data.wallet_update == "success") {
                            swalWithBootstrapButtons.fire(
                            'Wallet public address changed',
                            'All new transaction funds will be redirected to this address, reload the page',
                            'success'
                        )
                        }
                        else{
                            swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your current password is wrong, nothing has been changed',
                            'error'
                            )
                        }
                    })
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === swal2.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your wallet public address is safe',
                'error'
                )
            }
            })
      },

      delete_account(){
          const swalWithBootstrapButtons = swal2.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'You are deleting your account',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swal2.fire({
                title: 'Enter your current password to confirm',
                input: 'password',
                inputLabel: 'Password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 10,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                }
                }).then(pass => {
                    fetch("http://backend.sc2aips9849.universe.wf/api/delete-account?token="+this.token+"&password="+pass.value)
                    .then(response => response.json())
                    .then(data => {
                        if (data.account_deletion == "success") {
                            swalWithBootstrapButtons.fire(
                            'Account deleted',
                            'Your account has been deleted, reload the page',
                            'success'
                        )
                        }
                        else{
                            swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your current password is wrong, nothing has been changed',
                            'error'
                            )
                        }
                    })
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === swal2.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your account is safe',
                'error'
                )
            }
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
                                fetch("http://backend.sc2aips9849.universe.wf/api/display-account?token="+this.token)
                                    .then(response => response.json())
                                    .then(data => {this.data = data;})
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
      }

  },
  mounted: function () {
      
    
}
}

</script>