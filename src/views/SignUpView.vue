<template>
ิ<body>
  <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet'>
  <div class="space1"></div>
  <div class="signup-block">
    <form v-on:submit.prevent="submitform">
      <h1>Sign up</h1>
      <input type="text"  value="" placeholder="Firstname" id="firstname" v-model="signupForm.firstname"> 
      <input type="text" value="" placeholder="Lastname" id="lastname" v-model="signupForm.lastname">
      <input type="text" value="" placeholder="Username" id="username" v-model="signupForm.username">
      <input type="text" value="" placeholder="Email" id="email" v-model="signupForm.email">
      <input type="password" value="" placeholder="Password" id="password" v-model="signupForm.password1">
      <input type="password" value="" placeholder="Confirm Password" id="confirmpassword" v-model="signupForm.password2">
      <select class="role-dropdown" v-model="signupForm.role">
    
    
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>   
      </select>
    <button>Sign up</button>   
    </form>
  </div>
  <div class = "space2"></div>
</body>
</template>

<script>

import axios from 'axios'
import Swal from 'sweetalert2';

  export default {
    data: () => ({
      visible: false,
      signupForm: {
        role: '',
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password1: '',
        password2: '',
      },
      errors: []
    }),
    methods: {
      submitform(){
        this.errors = []
        // check error
        if (this.signupForm.firstname === '') {
          this.errors.push('ต้องกรอก firstname')
          this.showErrorAlert('Please fill out the information completely.');
        }
        if (this.signupForm.lastname === '' ){
          this.errors.push('ต้องกรอก lastname')
          this.showErrorAlert('Please fill out the information completely.');
        }
        if (this.signupForm.username === '' ){
          this.errors.push('ต้องกรอก username')
          this.showErrorAlert('Please fill out the information completely.');
        }
        if (this.signupForm.email === '' ){
          this.errors.push('ต้องกรอก email')
          this.showErrorAlert('Please fill out the information completely.');
        }
        if (this.signupForm.password1 === ''){
          this.errors.push('ต้องกรอก password')
          this.showErrorAlert('Please fill out the information completely.');
        }
        if (this.signupForm.password2 === ''){
          this.errors.push('ต้องกรอก confirm password')
          this.showErrorAlert('Please fill out the information completely.');
        }
        if (this.signupForm.password1 !== this.signupForm.password2){
          this.errors.push('password ไม่ตรงกัน')
          this.showErrorAlert('Password Do not match');
        }
        if (this.signupForm.role === ''){
          this.errors.push('โปรดระบุ role')
          this.showErrorAlert('Please fill out the information completely.');
        }
        console.log(this.errors)
        if (this.errors.length === 0){
           // send data to backend
          axios
              .post('/api/signup/', this.signupForm)
              .then(response => {
                if (response.data.message === 'success') {
                  this.signupForm.firstname = ''
                  this.signupForm.lastname = ''
                  this.signupForm.username = ''
                  this.signupForm.email = ''
                  this.signupForm.password1 = ''
                  this.signupForm.password2 = ''
                  this.signupForm.role = ''
                  
                }else {
                  console.log(response.data.message)
                }

              })
              .catch(error => {
                console.log('error', error)
              })
        }
        else {
          console.log('error: ตรวจสอบการกรอกข้อมูลอีกครั้ง')
        }
        
       
        console.log('12345') 
        console.log(
          this.signupForm.firstname,this.signupForm.lastname,this.signupForm.username,
          this.signupForm.role,this.signupForm.email,this.signupForm.password1,this.signupForm.password2)
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
      test1(){
        console.log("testttttttttt")
      }
    }
  }
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
    height: 10px;
}

.signup-block {
    max-width: 400px;
    margin: -130px auto;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    border: 5px solid #0d5302;
}

.signup-block h1 {
    text-align: center;
    color: #000;
    font-size: 24px;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 20px;
}

.signup-block input,
.signup-block select {
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

.signup-block select {
    background: #fff;
}

.signup-block input:focus,
.signup-block select:focus {
    border: 1px solid #0d5302;
}

.signup-block button {
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

.signup-block button:hover {
    background: #000;
}

.error-title {
        color: #ff0000; 
        font-size: 20px; 
        font-weight: bold; 
      }

      .error-content {
        color: #333333; 
        font-size: 16px; 
      }

      .error-confirm-button {
        background-color: #d33 !important; 
        color: #ffffff !important; 
        border: 1px solid #d33 !important; 
      }


</style>
