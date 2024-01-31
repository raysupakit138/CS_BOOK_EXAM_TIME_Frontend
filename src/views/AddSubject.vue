<template>
  <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'>
  <div class="space"></div>
  <div class="AddSubject-block">
  <form v-on:submit.prevent="createSubject">
    <h1>เพิ่มรายวิชาสำหรับแอดมิน</h1>
    <input type="text" value="" placeholder="รหัสรายวิชา" id="subjectCode" v-model="subjectForm.subjectCode">
    <input type="text" value="" placeholder="ชื่อรายวิชา" id="subject์Name" v-model="subjectForm.subjectName">
    <button>Add Subject</button>
  </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    subjectForm: {
      subjectCode: '',
      subjectName: '',
      teacher: '',
    }
  }),
  methods: {
    createSubject() {
      this.errors = []
      if (this.subjectForm.subjectCode === ''){
        this.errors.push('ต้องกรอก subjectcode')
      }
      if (this.subjectForm.subjectName === ''){
        this.errors.push('ต้องกรอก subjectname')
      }
      if (this.errors.length === 0){
        axios
            .post('/subject/', this.subjectForm)
            .then(response => { 
              this.subjectForm.subjectCode = ''
              this.subjectForm.subjectName = ''
            })
            .catch(error => {
              console.log('error', error)
            })
      }
      else {
        console.log('error: ตรวจสอบการกรอกข้อมูลอีกครั้ง')
      }
    }
  }
}
</script>

<style>

.space {
    width: 213px;
    height: 0.5px;
    margin: 45px auto;
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
