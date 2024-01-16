<template>
  ิ<body>
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet'>
    <div class="space1"></div>
    <div class="ChangePasswordBlock">
      <form v-on:submit.prevent="changePassword">
        <h1>Reset Password</h1> 
        <input type="text" value="" placeholder="Username" id="username">
        <input type="password" value="" placeholder="Old Password" id="oldpassword">
        <input type="password" value="" placeholder="New Password" id="newpassword">
        <input type="password" value="" placeholder="Confirm New Password" id="confirmnewpassword">
      <button>Confirm</button>   
      </form>
    </div>  
    <div class = "space2"></div>
  </body>
  </template>

<script>
export default {
  data() {
    return {
      username: "",
      oldPassword: "",
      newPassword: "",
    };
  },
  methods: {
    changePassword() {
      // Handle password change logic here
      // You can make an API call to the server to update the password
      // Use this.username, this.oldPassword, this.newPassword to get the values
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
    height: 80px;
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
