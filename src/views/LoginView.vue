<template>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="stylelogin.css">
</head>
<body>   
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet'>
<div class="logo"></div>
<div class="login-block">
  <form v-on:submit.prevent="submitform">
    <h1>KU-COMSCI EXAM BOOKING</h1>
    <input type="text" value="" placeholder="Username" id="username" v-model=loginform.username>
    <input type="password" value="" placeholder="Password" id="password" v-model=loginform.password>
   <button v-on:click.prevent="submitform">Login</button>
  </form>
</div>
</body>


</template>
<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import Swal from 'sweetalert2'

  export default {
    setup() {
      const userStore = useUserStore()
      return {
          userStore
      }
  },
    data: () => ({
      loginform : {
        username : '',
        password : ''
      },
      errors: [],
      token: '',
      role: ''
    }),
    methods: {
      async submitform() {
        this.errors = []
        if (this.loginform.username === '' && this.loginform.password === '') {
          this.errors.push('โปรดกรอก username และ password')
          this.showErrorAlert('Please fill in both username and password');
          return;
        }
        if (this.loginform.username === '') {
          this.errors.push('โปรดกรอก username')
          this.showErrorAlert('Please fill in username');
        }
        if (this.loginform.password === '') {
          this.errors.push('โปรดกรอก password')
          this.showErrorAlert('Please fill in password');
        }
        console.log(this.errors)
        console.log(this.loginform.username , this.loginform.password)
        if (this.errors.length === 0){
         await axios
              .post('/api/login/', this.loginform)
              .then(response => {
                this.userStore.setToken(response.data)
                axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                this.token = response.data.access
                console.log('1' + this.token)
              })
              .catch(error => {
                if (error.response && error.response.status === 404) {
                this.showErrorAlert('No user found with these credentials.');
                } else {
                this.showErrorAlert('Invalid username or password, or no users found.');
               }
        console.log('error', error);
      });
        }
        else {
          console.log('error: ตรวจสอบการกรอกข้อมูลอีกครั้ง')
        }
        if (this.errors.length === 0){
         await axios
              .get('/api/userInfo/')
              .then(response => {
                this.userStore.setUserInfo(response.data)
                if(this.token){
                  this.role = response.data.role
                  if(this.role === 'admin'){
                    this.$router.push('/admin')            
                  }
                  if(this.role === 'student'){
                    this.$router.push('/StudentCalendar')
                  }
                  if(this.role === 'teacher'){
                    this.$router.push('/TeacherCalendar')
                  }
                }
              })
              .catch(error => {
                console.log('error', error) 
              });   
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
      
    }
  }
  
</script>
<style>
body {
    background: url('https://iad.intaff.ku.ac.th/attach/w51119/f20220315140619_76Xumee31D.jpg') no-repeat fixed center center;
    background-size: cover;
    font-family: Montserrat;
}

.logo {
    width: 213px;
    height: 5px;
    margin: 56px auto;
}

.login-block {
    width: 500px;
    padding: 60px; 
    background: #fff;
    border-radius: 20px;
    border: 5px solid #0d5302;
    margin: 0 auto;
}

.login-block h1 {
  text-align: center;
    color: #000;
    font-size: 22px; 
    font-weight: 700; 
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 20px;
    text-shadow: 2px 2px 6px #0d5302;
}

.login-block input {
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

.login-block input#username {
    background: #fff url('http://i.imgur.com/u0XmBmv.png') 20px top no-repeat;
    background-size: 16px 80px;
}


.login-block input#password {
    background: #fff url('http://i.imgur.com/Qf83FTt.png') 20px top no-repeat;
    background-size: 16px 80px;
}


.login-block input:active, .login-block input:focus {
    border: 1px solid #0d5302;
}

.login-block button {
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

.login-block button:hover {
    background: #000000;
}

.login-block form {
  display: flex;
  flex-direction: column;
}

.login-block button {
  margin-top: 10px; 
}

</style>
