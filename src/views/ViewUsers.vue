<template>
  <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'>
  <div class="admin-table">
    <h1>Users list</h1>
    <table>
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
    <div class="user-total">
      <router-link to="/admin" button class="back-button">Back</router-link>
      User Total: {{ users.length }} Users
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      users: []
    };
  },
  created(){
    this.getUsers()
  },
  methods: {
    getUsers() {
      axios.get('/api/users') 
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style>
.admin-table {
  font-family: Montserrat;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.admin-table h1 {
  text-align: center;
  text-transform: uppercase;
  font-family: Montserrat;
  font-family: 'Kanit', sans-serif;
  padding: 50px;
  font-size: 32px;
  background: #f5f5f5;
  font-weight: bold; 
  color: #333; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); 
}

.admin-table table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th, .admin-table td {
  padding: 15px; 
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-size: 18px; 
}

.admin-table th {
  background-color: #f5f5f5;
}

.admin-table tr:hover {
  background-color: #f1f1f1;
}

.admin-table .user-total {
  font-family: Montserrat;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px; 
  background: #f5f5f5;
  font-size: 20px; 
}

.back-button {
  padding: 10px 20px; 
  background-color: #d1d1d1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; 
}

.back-button:hover {
  background-color: #c0c0c0;
}
</style>
