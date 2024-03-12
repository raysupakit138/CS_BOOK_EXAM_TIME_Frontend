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
            <v-btn color="primary" @click="goToChangePassword">Change Password</v-btn>
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
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
              </template>
              <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
            </v-menu>
            <v-select
              :items="subjects"
              v-model="selectedSubject"
              :item-props="showSubject"
              label="Select Subject"
              required
            ></v-select>
            <v-textarea
              v-model="description"
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
            <v-btn color="green darken-1" text @click="saveDetails">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'

export default {
  setup() {
    const userStore = useUserStore();
    return {
       userStore,
       userName: userStore.user.username,

       };
  },
  beforeCreate() {
      this.userStore.initStore()

  },
  mounted() {
    this.fetchSubjectTeacher();
  },
  data () {
    return {
      dialog: false,
      selectedDate: null,
      timeStartPickerDialog: false,
      timeEndPickerDialog: false,
      selectedStartTime: null, // This will hold the selected time
      selectedEndTime: null,
      teacherId: "",
      subjects: [],
      selectedSubject: ""
    }
  },
  watch: {
    selectedDate(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.openDialog();
      }
    }
  },
  methods: {
    openDialog(date) {
      console.log("open dialog")
      console.log(date); // Add this to check what's being passed
      this.selectedDate = date;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    updateTime(event) {
      // When the user selects a time, update the selectedTime data property
      // this.timePickerDialog = true;
      this.selectedTime = event.target.value;
    },
    saveTime() {
      // You can handle saving the time here if needed
      this.timeEndPickerDialog = false;
    },
    saveStartTime() {
      // You can handle saving the time here if needed
      this.timeStartPickerDialog = false;
    },
    logout() {
      this.userStore.removeToken()
      this.$router.push('/login')
    },
    goToChangePassword() {
      this.$router.push({ name: 'ChangePassword' });
    },
    fetchSubjectTeacher() {
    this.userStore.initStore(); 
    const teacherId = this.userStore.user.id;
    this.teacherId = teacherId
    axios.get(`/subject/?teacher=${teacherId}`)
      .then(response => {
        this.subjects = response.data.map(subject => subject);
        console.log("showsubject")
        console.log(this.subjects)
        this.selectedSubject = this.subjects[0];

        // Set the default selection for the v-select
        // if (this.subjects.length > 0) {
        //   this.notepadForm.subject = this.subjects[0].id; // assuming 'id' is the property to bind
        // }
      })
      .catch(error => {
        console.error('Could not fetch subjects', error);
      });
  },
  showSubject(item) {
      return { title: item.subjectName + " (" + item.subjectCode + ")" };
    },
    saveDetails(){
      this.dialog = false; // Open the dialog
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

.ExamTime {
  background-color: white; /* Set the background color to white */
  padding: 16px; /* Add some padding around the content */
  border-radius: 4px; /* Optional: adds rounded corners to the background */
  /* Add additional styling as needed */
}



</style>
