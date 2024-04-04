<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="4">
        <div class="notes-section">
          <div class="user-info">
          <span>Teacher : {{ userName }}</span>
          <v-btn medium @click="logout" class="logout-button">Log Out</v-btn>
        </div>
        <div class="text-center">
          <v-row>
            <v-col cols="5.5">
              <v-btn small color="primary" @click="goToChangePassword"  class="button-full-width button-padding">Change Password</v-btn>
            </v-col>
          </v-row>
        </div>
        <div class="new-div">
          <div class="examDetail" v-for="exam in examDetails" :key="exam.id">
            <div>
              Teacher: {{ exam.subjectExamDetail.teacherSubject.firstname}} {{ exam.subjectExamDetail.teacherSubject.lastname}}
            </div>
            <div>
              Subject: {{ exam.subjectExamDetail.subjectName }}
            </div>
            <div>
              Start Time: {{ exam.startTime }}
            </div>
            <div>
              End Time: {{ exam.endTime }}
            </div>
            <div>
              Date: {{ exam.date }}
            </div>
          </div>
        </div>
        <div class="text-center">
          <v-row class="ma-0 pa-0"> 
            <v-col cols="12" class="d-flex justify-space-between align-center pa-1 "> 
              <v-btn class="button-full-width" color="green" @click="openExamBook">Book an Exam Time</v-btn>
            </v-col>
          </v-row>
        </div>
        </div>
      </v-col>
      <v-col cols="12" sm="8">
        <v-date-picker class="shift-right" width="100%" v-model="selectedDate"></v-date-picker>
        <v-dialog v-model="dialog" persistent width="300px">
          <v-card>
            <v-card-title>
              <span class="headline">Selected Date</span>
            </v-card-title>
            <v-card-text>{{ selectedDate }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDialog">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
      <v-dialog v-model="dialog" persistent width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Enter Details</span>
          </v-card-title>
          <v-card-text>
            <v-select
              :items="subjects"
              v-model="selectedSubject"
              :item-props="showSubject"
              label="Select Subject"
              required
            ></v-select>
            <v-textarea
              v-model="examDateForm.description"
              label="Description"
              rows="2"
              auto-grow
            ></v-textarea>
            <!-- start time -->
              <v-dialog v-model="timeStartPickerDialog" width="290px">
              <template #activator="{ props, on }">
                <v-text-field
                  v-model="selectedStartTime"
                  label="Start Time"
                  readonly
                  v-bind="props"
                  v-on="on"
                  @click="timeStartPickerDialog = true"
                ></v-text-field>
              </template>
              
              <template v-slot:default="dialog">
                <div class = "ExamTime">
                  <input type="time" v-model="selectedStartTime" @input="updateTime($event)">
                  <v-btn text color="primary" @click="saveStartTime">OK</v-btn>
                </div>
              </template>
            </v-dialog>
            <!-- end time -->
            <v-dialog v-model="timeEndPickerDialog" width="290px">
              <template #activator="{ props, on }">
                <v-text-field
                  v-model="selectedEndTime"
                  label="End Time"
                  readonly
                  v-bind="props"
                  v-on="on"
                  @click="timeEndPickerDialog = true"
                ></v-text-field>
              </template>
              
              <template v-slot:default="dialog">
                <div class = "ExamTime">
                  <input type="time" v-model="selectedEndTime" @input="updateTime($event)">
                  <v-btn text color="primary" @click="saveTime">OK</v-btn>
                </div>
              </template>
            </v-dialog>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red lighten-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="saveDetails">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
      userName: userStore.user.username,
    };
  },
  beforeCreate() {
    this.userStore.initStore();
  },
  async mounted() {
    await this.fetchSubjectTeacher();
    // await this.fetchExamDetails();
  },
  data() {
    return {
      dialog: false,
      selectedDate: [],
      tempDate: [],
      timeStartPickerDialog: false,
      timeEndPickerDialog: false,
      teacherId: "",
      subjects: [],
      selectedSubject: {},
      examDateForm: {
        subject: '',
        description: '',
        startTime: '',
        endTime: '',
        date: ''
      }, 
      errors: [],
      isDatemMoreThanToday: "",
      examDetails: []
    };
  },
  watch: {
    async selectedDate(newVal, oldVal) {
    if (newVal !== oldVal) {
      await this.openDialog(newVal);
      console.log(newVal);
      const date1 = new Date(newVal); 
      const offset = date1.getTimezoneOffset();
      const localDate = new Date(date1.getTime() - (offset * 60000));
      const formattedDate = localDate.toISOString().split('T')[0];
      console.log(formattedDate);
      await this.fetchExamDetails(formattedDate);
    }
  },
  },
  methods: {
    showExamDateDetail(date){

    },
    openExamBook() {
    if (this.isDatemMoreThanToday === "2") { 
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'Please reserve your exam date at least 1 day in advance.',
      });
      this.dialog = false; 
    } else if (this.isDatemMoreThanToday === "0") { 
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'Cannot select a date in the past.',
      });
      this.dialog = false; 
    } else if (this.isDatemMoreThanToday === "1") { 
      this.dialog = true; 
    } else {
      console.error('Unexpected value for isDatemMoreThanToday:', this.isDatemMoreThanToday);
      this.dialog = false; 
    }
  },



    openDialog(date) {
      console.log("open dialog");
      console.log(date); 
      this.tempDate = date;
      const selectedDate = new Date(this.tempDate); // Date from the calendar
      const today = new Date(); // Today's date
      today.setHours(0, 0, 0, 0); // Reset time to start of today

      // Compare dates using their time value
      if (selectedDate.setHours(0, 0, 0, 0) === today.getTime()) {
        // If it is today, set the flag to indicate today's date
        this.isDatemMoreThanToday = "2"; // date = today
      } else if (selectedDate > today) {
        // If the selected date is in the future
        const offset = selectedDate.getTimezoneOffset();
        const localDate = new Date(selectedDate.getTime() - (offset * 60000));
        const formattedDate = localDate.toISOString().split('T')[0];
        console.log(formattedDate);
        this.examDateForm.date = formattedDate;
        console.log("ExamDate: " + this.examDateForm.date);
        this.isDatemMoreThanToday = "1"; // date > today
      } else {
        // If the selected date is in the past
        this.isDatemMoreThanToday = "0"; // date < today
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    updateTime(event) {
      this.selectedTime 
      = event.target.value;
    },
    saveTime() {
      this.timeEndPickerDialog = false;
    },
    saveStartTime() {
      this.timeStartPickerDialog = false;
    },
    logout() {
      this.userStore.removeToken();
      this.$router.push('/login');
    },
    goToChangePassword() {
      this.$router.push({ name: 'ChangePassword' });
    },
    fetchSubjectTeacher() {
      this.userStore.initStore();
      const teacherId = this.userStore.user.id;
      this.teacherId = teacherId;
      axios.get(`/subject/?teacher=${teacherId}`)
        .then(response => {
          this.subjects = response.data.map(subject => subject);
          console.log("showsubject");
          console.log(this.subjects);
          this.selectedSubject = this.subjects[0]; 
        })
        .catch(error => {
          console.error('Could not fetch subjects', error);
        });
    },
    fetchExamDetails(date) {
      
      axios.get(`/examdetail/?date=${date}`)
        .then(response => {
          this.examDetails = response.data;
        })
        .catch(error => {
          console.error('Could not fetch examDetails', error);
        });
    },
    showSubject(item) {
      return { title: item.subjectName + " (" + item.subjectCode + ")" };
    },
    isTimeSlotAvailable(startTime, endTime, date) {
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);

      return !this.examDetails.some(exam => {
        const examStart = new Date(`${exam.date}T${exam.startTime}`);
        const examEnd = new Date(`${exam.date}T${exam.endTime}`);
        return (start < examEnd && end > examStart);
      });
    },
  async saveDetails() {
  this.errors = [];
  this.dialog = false;
  this.examDateForm.startTime = this.selectedStartTime;
  this.examDateForm.endTime = this.selectedEndTime;
  let subjectId = this.selectedSubject;
  this.examDateForm.subject = subjectId.id;

  console.log("this examDateForm " + this.examDateForm.startTime + " / " + this.examDateForm.endTime);
  console.log("this examSubject " + this.examDateForm.subject);

  if (!this.validateForm()) return; // ตรวจสอบเงื่อนไขต่างๆ

  let startTime = new Date(`2022-01-01T${this.selectedStartTime}:00`);
  let endTime = new Date(`2022-01-01T${this.selectedEndTime}:00`);
  
  if (!this.validateTime(startTime, endTime)) return; // ตรวจสอบเวลา

  await axios.post('/examdetail/', this.examDateForm)
    .then(response => {
      this.fetchExamDetails(this.examDateForm.date);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Successfully added an exam time!',
      });
      this.resetForm(); 
      this.dialog = false;
    })
    .catch(error => {
      console.log('error', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'This subject has already been reserved for exams.',
      });
    });
},

validateForm() {
  if (!this.examDateForm.description) {
    this.showError('Description is required.');
    return false;
  }
  if (!this.selectedStartTime) {
    this.showError('Start Time is required.');
    return false;
  }
  if (!this.selectedEndTime) {
    this.showError('End Time is required.');
    return false;
  }
  if (!this.isTimeSlotAvailable(this.selectedStartTime, this.selectedEndTime, this.examDateForm.date)) {
    this.showError('This exam time slot has already been reserved.');
    return false;
  }
  return true;
},

validateTime(startTime, endTime) {
  let startHour = startTime.getHours();
  let endHour = endTime.getHours();
  if (startHour < 8 || endHour > 18 || (endHour === 18 && endTime.getMinutes() > 0)) {
    this.showError('Exams must be scheduled between 08:00 AM and 06:00 PM.');
    return false;
  }

  let duration = (endTime - startTime) / (1000 * 60 * 60); 
  if (duration < 1) {
    this.showError('The exam duration must be at least 1 hour.');
    return false;
  }
  return true;
},

showError(message) {
  this.errors.push(message);
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: '#d33',
  });
  this.resetForm(); 
},

resetForm() {
  this.selectedStartTime = '';
  this.selectedEndTime = '';
  this.selectedSubject = this.subjects.length > 0 ? this.subjects[0] : {};

  this.examDateForm = {
    subject: '',
    description: '',
    startTime: '',
    endTime: '',
    date: ''
  };
}
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

.ExamTime {
  background-color: white; 
  padding: 16px; 
  border-radius: 4px; 
}

.new-div {
  margin-top: 15px;
  max-height: 300px; 
  overflow-y: auto; 
  overflow-x: hidden; 
  word-break: break-word; 
}

.examDetail {
    padding: 5%;
    margin: 0%;
    border: 1px solid;
}

.button-full-width {
  width: 100%;
}

</style>
