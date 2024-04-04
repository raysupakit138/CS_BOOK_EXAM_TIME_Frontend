<template>
  <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet'>
  <div class="button">
    <router-link to="/signup" button class="add-user-button">Add User</router-link>
    <router-link to="/AddSubject" button class="add-subject-button">Add Subject</router-link>
    <router-link to="/ViewUsers" button class="view-all-users-button">View all users</router-link>
    <router-link to="/CancelExam" button class="cancel-exam-button">Cancel Exam</router-link>
    <button @click="logout" class="logout-admin">Log out</button>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const userStore = useUserStore();
    console.log(userStore.user.username)
    return {
      userStore,
      userName: userStore.user.username,
    };
  },
  beforeCreate() {
    this.userStore.initStore();


    if (!localStorage.getItem('user_id') ||
        !localStorage.getItem('user_prefix') ||
        !localStorage.getItem('user.access')) {
      this.disableInteraction();
    }
  },
  methods: {
    logout() {
      this.userStore.removeToken();
      this.$router.push('/login');
    },
    disableInteraction() {
      const blocker = document.createElement('div');
      blocker.style.position = 'fixed';
      blocker.style.top = '0';
      blocker.style.left = '0';
      blocker.style.width = '100vw';
      blocker.style.height = '100vh';
      blocker.style.zIndex = '10000';
      blocker.style.background = 'rgba(0, 0, 0, 0.5)';
      document.body.appendChild(blocker);
    },
  }
}
</script>

<style>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  position: relative; 
}

.view-all-users-button,
.add-user-button,
.cancel-exam-button,
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
.cancel-exam-button:hover,
.add-subject-button:hover {
  background-color: #000000;
}

.logout-admin {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #990000; 
  color: white;
  border: none;
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
  position: absolute; 
  top: 20px;
  right: 20px;
}

.logout-admin:hover {
  background-color: #45a049;
}


</style>
