<template>
  <body>
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet'>
    <div class="space1"></div>
    <div class="ChangePasswordBlock">
      <form v-on:submit.prevent="changePassword">
        <h1>Reset Password</h1> 
        <input v-model="form.old_password" type="password"  placeholder="Old Password">
        <input v-model="form.new_password1" type="password"  placeholder="New Password" >
        <input v-model="form.new_password2" type="password"  placeholder="Confirm New Password" >
      <button>Confirm</button>   
      </form>
    </div>  
    <div class = "space2"></div>
  </body>
  </template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      form: {
        old_password: "",
        new_password1: "",
        new_password2: "",
      },
      errors: [],
    };
  },
  methods: {
    changePassword() {
      this.errors = []
      if(this.form.old_password === '' && this.form.new_password1 === '' && this.form.new_password2 === ''){
        this.showErrorAlert('Please fill in your password in all fields');
        return;
      }

      if (this.form.old_password === ''){
        this.showErrorAlert('please fill old password');
      }

      if (this.form.new_password1 !== this.form.new_password2) {
          this.errors.push('The password does not match')
          this.showErrorAlert('The password does not match');
          console.log(this.errors)
      }

      if (this.errors.length === 0) {
          let formData = new FormData()
          formData.append('old_password', this.form.old_password)
          formData.append('new_password1', this.form.new_password1)
          formData.append('new_password2', this.form.new_password2)

          axios
              .post('/api/changePassword/', formData, {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  }
              })
              .then(response => {
                  if (response.data.message === 'success') {
                      
                      console.log('Changed Password Success')

                       this.form.old_password = ""
                       this.form.new_password1 = ""
                       this.form.new_password2 = ""

                      Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Password changed successfully!',
                    }).then(() => {
                    this.$router.push('/login');

                  });                               
                  } else {
                      this.showErrorAlert('Your old password is incorrect.');
                      const data = JSON.parse(response.data.message)

                      for (const key in data){
                          this.errors.push(data[key][0].message)
                      }
                  }
              })
              .catch(error => {
                  console.log('error', error)
              })
      }
    },
    showErrorAlert(message) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#d33', 
        confirmButtonText: 'OK',
        customClass: {
          title: 'error-title', 
          content: 'error-content', 
          confirmButton: 'error-confirm-button', 
        },
      });
    },
  },
};
</script>

<style>
body {
    background: url('https://iad.intaff.ku.ac.th/attach/w51119/f20220315140619_76Xumee31D.jpg') no-repeat fixed center center;
    background-size: cover;
    font-family: 'Montserrat', sans-serif;
}

.space1,
.space2 {
    width: 100%;
    height: 130px;
}

.ChangePasswordBlock {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    border: 5px solid #0d5302;
}

.ChangePasswordBlock h1 {
    text-align: center;
    color: #000;
    font-size: 24px;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: bold;
}

.ChangePasswordBlock input,
.ChangePasswordBlock select {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 14px;
    padding: 0 20px;
    outline: none;
}

.ChangePasswordBlock select {
    background: #fff;
}

.ChangePasswordBlock input:focus,
.ChangePasswordBlock select:focus {
    border: 1px solid #0d5302;
}

.ChangePasswordBlock button {
    width: 100%;
    height: 40px;
    background: #0d5302;
    border: 1px solid #000;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
    border-radius: 20px;
    outline: none;
    cursor: pointer;
}

.ChangePasswordBlock button:hover {
    background: #000;
}
</style>
