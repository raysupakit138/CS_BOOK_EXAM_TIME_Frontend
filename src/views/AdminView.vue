<template>
  <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet'>
  <div class="button">
    <router-link to="/signup" button class="add-user-button">Add User</router-link>
    <router-link to="/AddSubject" button class="add-subject-button">Add Subject</router-link>
    <router-link to="/ViewUsers" button class="view-all-users-button">View all users</router-link>
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

.view-all-users-button,
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

.view-all-users-button:hover,
.add-user-button:hover,
.add-subject-button:hover {
  background-color: 	#000000;
}
</style>
