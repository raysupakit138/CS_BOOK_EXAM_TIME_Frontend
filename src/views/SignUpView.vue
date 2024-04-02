<template>
ิ<body>
  <div class="signup-block">
    <form v-on:submit.prevent="submitform">
      <h1>Sign up</h1>
      <div class="input-group">
        <div>
          <h2>Firstname :</h2>
          <input type="text" placeholder="Firstname" id="firstname" v-model="signupForm.firstname"> 
        </div>
        <div>
          <h2>Lastname :</h2>
          <input type="text" placeholder="Lastname" id="lastname" v-model="signupForm.lastname">
        </div>
      </div>
      <div class="input-group">
        <div>
          <h2>Username :</h2>
          <input type="text" placeholder="Username" id="username" v-model="signupForm.username">
        </div>
        <div>
          <h2>Email :</h2>
          <input type="text" placeholder="Email" id="email" v-model="signupForm.email">
        </div>
      </div>
      <div class="input-group">
        <div>
          <h2>Password :</h2>
          <input type="password" placeholder="Password" id="password" v-model="signupForm.password1">
        </div>
        <div>
          <h2>ConfirmPassword :</h2>
          <input type="password" placeholder="Confirm Password" id="confirmpassword" v-model="signupForm.password2">
        </div>
      </div>
      <h2>Role :</h2>
      <select class="role-dropdown" v-model="signupForm.role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>   
      </select>
      <button>Sign up</button>   
    </form>
  </div>

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

                  Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Sign up successfully!',
                });    
                  
                }else {
                  this.showErrorAlert('Username or Email already exists.')
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
    max-width: 700px;
    margin: 20px auto;
    padding: 25px;
    background: #fff;
    border-radius: 20px;
    border: 5px solid #0d5302;
}

.signup-block h1 {
    margin-bottom: 30px; 
    color: #0d5302; 
    font-size: 32px; 
    font-weight: 600; 
}

.input-group {
    display: flex;
    gap: 20px; 
    margin-bottom: 20px; 
}

.input-group > div {
    width: 50%; 
}


.signup-block input,
.signup-block select {
    width: 100%; 
    padding: 10px; 
    border: 1px solid #ccc; 
    background: #f9f9f9;
    transition: border-color 0.3s; 
}

.signup-block input:focus,
.signup-block select:focus {
    border-color: #0d5302; 
}

.signup-block select {
    background: #fff;
}

.signup-block input:focus,
.signup-block select:focus {
    border: 1px solid #0d5302;
}



.signup-block button {
    margin-top: 20px;
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

.input-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.input-group > div {
    flex: 1;
    margin-right: 10px;
}

.input-group > div:last-child {
    margin-right: 0;
}

.signup-block input,
.signup-block select {
    width: 100%; 
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
