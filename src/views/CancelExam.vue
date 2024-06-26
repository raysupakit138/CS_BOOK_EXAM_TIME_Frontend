<template>
  <div class="exam-schedule">
    <h1>Cancel exam date for admin</h1>
    <table>
      <thead>
        <tr>
          <th>Subject Name</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Teacher</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exam in exams" :key="exam.id">
          <td>{{ exam.subjectExamDetail.subjectName }}</td>
          <td>{{ exam.date }}</td>
          <td>{{ exam.startTime }}</td>
          <td>{{ exam.endTime }}</td>
          <td>{{ exam.subjectExamDetail.teacherSubject.firstname }} {{ exam.subjectExamDetail.teacherSubject.lastname }}</td>
          <td>
            <button @click="cancelExam(exam)" class="delete-button">
              <span class="button-text">Cancel</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bottom-container">
      <router-link to="/admin" button @click="goBack" class="back-button">Back</router-link>
      <div class="exam-total">Total Exams: {{ exams.length }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      exams: []
    };
  },
  mounted() {
    this.fetchExamDetails();
  },
  methods: {
    async fetchExamDetails() {
      try {
        const response = await axios.get('/examdetail/', {
          params: { _t: Date.now() }
        });
        // Sort exams by date from earliest to latest
        this.exams = response.data.sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        );
      } catch (error) {
        console.error('Could not fetch exams', error);
      }
    },

    async cancelExam(exam) {
      const examDate = new Date(exam.date);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 

      Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to cancel the exam date?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#006400',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/examdetail/${exam.id}/`)
            .then(response => {
              if (response.status === 204) {
                Swal.fire(
                  'Deleted!',
                  'The exam has been deleted.',
                  'success'
                ).then(() => {
                  this.fetchExamDetails(); 
                });
              } else {
                Swal.fire(
                  'Error!',
                  'An error occurred while deleting the exam.',
                  'error'
                );
              }
            })
            .catch(error => {
              console.error('Error deleting data:', error);
              Swal.fire(
                'Error!',
                'An error occurred while deleting the exam.',
                'error'
              );
            });
        }
      });
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
.exam-schedule {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: white;
}

h1 {
  font-size: 2.5em; 
  font-family: 'Montserrat', sans-serif; 
  font-weight: 700; 
  margin-bottom: 0.5em; 
}

.back-button-container {
  position: fixed; 
  bottom: 20px; 
  left: 20px; 
}

.back-button {
  background-color: #f2f2f2;
  color: #333;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

table {
  width: 103%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

button:hover {
  color: red;
}

th, td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 20px; 
  vertical-align: middle; 
}

.delete-button {
  height: 100%; 
  width: 100%; 
  border-radius: 0; 
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}


.delete-button .button-text {
  display: inline-block;
  margin-right: 8px; 
  vertical-align: middle; 
}

.delete-button:hover {
  background-color: #010101; 
}

.bottom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  background-color: #333; 
  color: white; 
  padding: 5px 9px; 
  box-shadow: 0 -2px 5px rgba(0,0,0,0.3); 
}

.exam-total {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}


</style>
