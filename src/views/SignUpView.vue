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
      <select class="role-dropdown" v-model="signupForm.role" >
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
        if (this.firstname === '') {
          this.errors.push('ต้องกรอก firstname')
        }
        if (this.lastname === '' ){
          this.errors.push('ต้องกรอก lastname')
        }
        if (this.username === '' ){
          this.errors.push('ต้องกรอก username')
        }
        if (this.email === '' ){
          this.errors.push('ต้องกรอก email')
        }
        if (this.password1 === ''){
          this.errors.push('ต้องกรอก password')
        }
        if (this.password2 === ''){
          this.errors.push('ต้องกรอก confirm password')
        }
        if (this.password1 !== this.password2){
          this.errors.push('password ไม่ตรงกัน')
        }
        if (this.role === ''){
          this.errors.push('โปรดระบุ role')
        }
        console.log(this.errors)
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
        console.log('12345') 
        console.log(this.firstname,this.lastname,this.username,this.role,this.email,this.password1,this.password2)
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
    font-family: Montserrat;
}

.space1 {
    width: 2px;
    height: 2px;
    margin: 6px auto;
}

.signup-block {
    width: 400px;
    padding: 50px;
    background: #fff;
    border-radius: 20px;
    border-top: 5px solid #0d5302;
    border-bottom: 5px solid #0d5302;
    border-left: 5px solid #0d5302;
    border-right: 5px solid #0d5302;
    margin: 0 auto;
}

.signup-block h1 {
    text-align: center;
    color: #000;
    font-size: 18px;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 20px;
}

.signup-block input {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 14px;
    font-family: Montserrat;
    padding: 0 20px 0 50px;
    outline: none;
}

.signup-block input#firstname {
    background: #fff url('http://i.imgur.com/u0XmBmv.png') 20px top no-repeat;
    background-size: 16px 80px;
}

.signup-block input#lastname {
    background: #fff url('http://i.imgur.com/u0XmBmv.png') 20px top no-repeat;
    background-size: 16px 80px;
}

.signup-block input#username {
    background: #fff url('http://i.imgur.com/u0XmBmv.png') 20px top no-repeat;
    background-size: 16px 80px;
}

.signup-block input#email {
    background: #fff url('http://i.imgur.com/u0XmBmv.png') 20px top no-repeat;
    background-size: 16px 80px;
}

.signup-block input#password {
    background: #fff url('http://i.imgur.com/Qf83FTt.png') 20px top no-repeat;
    background-size: 16px 80px;
}

.signup-block input#confirmpassword {
    background: #fff url('http://i.imgur.com/Qf83FTt.png') 20px top no-repeat;
    background-size: 16px 80px;
}

.signup-block input:active, .signup-block input:focus {
    border: 1px solid #0d5302;
}

.signup-block button {
    width: 100%;
    height: 40px;
    background: #0d5302;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #000000;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
    font-family: Montserrat;
    outline: none;
    cursor: pointer;
}

.signup-block  button:hover {
    background: #000000;
}

.space2 {
    width: 2px;
    height: 2px;
    margin: 6px auto;
}

.role-dropdown {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: Montserrat;
  padding: 0 20px;
  outline: none;
}

</style>
