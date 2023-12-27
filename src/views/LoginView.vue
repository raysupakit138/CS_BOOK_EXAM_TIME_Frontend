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
  <h1>KU-COMSCI EXAM BOOKING</h1>
  <input type="text" value="" placeholder="Username" id="username" />
  <input type="password" value="" placeholder="Password" id="password" />
  <button>Login</button>
</div>
</body>


</template>
<script>
  export default {
    data: () => ({
      visible: false,
    }),
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
    height: 36px;
    margin: 56px auto;
}

.login-block {
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

.login-block h1 {
    text-align: center;
    color: #000;
    font-size: 18px;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 20px;
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


</style>
