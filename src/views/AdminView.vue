<template>
  <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet'>
  <div class="button">
    <router-link to="/signup" button class="add-user-button">Add User</router-link>
    <button class="add-subject-button">Add Subject</button>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}

.add-user-button,
.add-subject-button {
  padding: 30px 30px;
  font-size: 20px;
  cursor: pointer;
  background-color: #006600;
  color: white;
  border-radius: 5px;
  border: 2px solid #003300; 
  border-radius: 10px; 
  font-family: 'Montserrat', sans-serif; 
  margin: 25px;  
}

.add-user-button:hover,
.add-subject-button:hover {
  background-color: 	#000000;
}
</style>
