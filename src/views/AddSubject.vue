<template>
  <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'>
  <div class="space"></div>
  <div class="AddSubject-block">
  <form v-on:submit.prevent="createSubject">
    <h1>Add subjects for admins</h1>
    <input type="text" value="" placeholder="รหัสรายวิชา" id="subjectCode" v-model="subjectForm.subjectCode">
    <input type="text" value="" placeholder="ชื่อรายวิชา" id="subject์Name" v-model="subjectForm.subjectName">
    <select v-model="selectTeacher" id="teacher">
      <option disabled value="">Please select one</option>
      <option v-for="teacher in teachers" :value="teacher" :key="teacher.id">{{ teacher.username }}</option>
    </select>
    <button>Add Subject</button>
  </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
  data: () => ({
    subjectForm: {
      subjectCode: '',
      subjectName: '',
      teacher: '',
    },
    teachers: [],
    selectTeacher: '',
    errors: [], // Initialize an empty array for errors
  }),
  created() {
    this.fetchTeachers(); // Fetch teachers when the component is created
  },
  methods: {
    fetchTeachers() {
      axios.get('/api/users') // Adjust the URL to where your teachers are
        .then(response => {
          this.teachers = response.data.filter(user => user.role === 'teacher');
        })
        .catch(error => {
          console.error('Could not fetch teachers', error);
        });
    },
    createSubject() {
      console.log(this.selectTeacher)
      console.log(this.selectTeacher.id)
      this.subjectForm.teacher = this.selectTeacher.id
      this.errors = []
      if (this.selectTeacher === '') {
        this.errors.push('Please select a teacher.');
        this.showErrorAlert('Please select a teacher.');
        return; 
      }

      this.subjectForm.teacher = this.selectTeacher.id;

      axios.get('/subject/') // Adjust this URL to your API endpoint that lists all subjects
        .then(response => {
          const subjects = response.data;

          const isDuplicateCode = subjects.some(subject => subject.subjectCode === this.subjectForm.subjectCode);
          const isDuplicateName = subjects.some(subject => subject.subjectName === this.subjectForm.subjectName);

          if (isDuplicateCode) {
            this.errors.push('Subject code already exists.');
            this.showErrorAlert('The entered course code already exists. Please use a different code.');
          }

          if (isDuplicateName) {
            this.errors.push('Subject name already exists.');
            this.showErrorAlert('The entered subject name already exists. Please use a different name.');
          }

          if (this.subjectForm.subjectCode === ''){
            this.errors.push('ต้องกรอก subjectcode');
            this.showErrorAlert('Please enter the course code.');
          }
          if (this.subjectForm.subjectName === ''){
            this.errors.push('ต้องกรอก subjectname');
            this.showErrorAlert('Please enter the subject name.');
          }
          
          if (this.errors.length === 0){
            axios.post('/subject/', this.subjectForm)
              .then(response => { 
                this.subjectForm.subjectCode = ''
                this.subjectForm.subjectName = ''
                this.subjectForm.teacher = ''
                this.selectTeacher = ''

                Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Successfully added a course!',
                });    
              })
              .catch(error => {
                console.log('error', error)
              })
          } else {
            console.log('error: ตรวจสอบการกรอกข้อมูลอีกครั้ง')
          }
        })
        .catch(error => {
          console.error('Could not validate subject data', error);
        });
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

.space {
    width: 213px;
    height: 0.5px;
    margin: 30px auto;
}

.AddSubject-block {
    width: 600px; 
    padding: 60px; 
    background: #fff;
    border-radius: 20px;
    border: 5px solid #0d5302;
    margin: 0 auto;
}

.AddSubject-block h1 {
    font-family: 'Kanit', sans-serif;
    text-align: center;
    color: #000;
    font-size: 28px; 
    margin-bottom: 20px; 
}

.AddSubject-block input {
    width: 100%;
    padding: 12px; 
    margin: 12px 0;
    border: 2px solid #0d5302;
    border-radius: 5px;
    font-family: 'Kanit', sans-serif;
    font-size: 18px; 
}

.AddSubject-block select {
    width: 100%;
    padding: 12px;
    margin: 12px 0;
    border: 2px solid #0d5302;
    border-radius: 5px;
    font-family: 'Kanit', sans-serif;
    font-size: 18px;
    background-color: #fff;
}

.AddSubject-block button {
    width: 100%;
    height: 45px; 
    background: #0d5302;
    border-radius: 5px;
    border: 1px solid #000000;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px; 
    font-family: Montserrat;
    cursor: pointer;
    margin-top: 15px; 
}

.AddSubject-block button:hover {
    background: #000000;
}

</style>
