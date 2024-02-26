<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="4">
        <div class="notes-section">
          <div class="text-center">
            <!-- Add Note button with a margin to the right -->
            <v-btn color="primary" class="mr-2" @click="dialog = true">Add note</v-btn>
            
            <!-- Change Password button with the same primary color -->
            <v-btn color="primary" @click="goToChangePassword">Change Password</v-btn>
          </div>
          <!-- Dialog for adding a note -->
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Add a new note
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="notepadForm.description" label="Enter your note" autofocus outlined rows="5" no-resize></v-textarea>
                    </v-col>

                    <v-col cols="12">
                      <v-select :items="subjects" :item-props="showSubject" item-text="username" item-value="id" v-model="notepadForm.subject" label="Select Subject" outlined></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="px-4">
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="success" dark @click="saveNote">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
      <!-- Calendar section -->
      <v-col cols="12" sm="8">
        <v-date-picker class="shift-right" width="100%"></v-date-picker>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>

import axios from 'axios';
import Swal from 'sweetalert2';
import { useUserStore } from '@/stores/user';

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      dialog: false,
      newNote: '',
      subjects: [], 
      selectSubject: {},
      errors: [], 
      notepadForm: {
        description: '',
        subject: '',
        student: ''
      }
    };
  },

  mounted() {
    this.fetchSubjectEnrolled();
  },
  methods: {
    saveNote() {
      console.log(this.selectSubject)
      this.dialog = false;
      this.errors = [];

    if (!this.notepadForm.description.trim()) {
    this.errors.push('Note field is required.');
     Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Note field is required',
      confirmButtonColor: '#d33', 
    });
    return; 
  }

  if (!this.notepadForm.subject) {
    this.errors.push('Subject selection is required.');
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Subject selection is required.',
      confirmButtonColor: '#d33', 
    });
    return; 
  }
      if (this.errors.length === 0) {
        axios
          .post('/notepad/', this.notepadForm)
          .then(response => {    
              this.notepadForm.description = ''
              this.notepadForm.selectSubject = ''
              Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Successfully added a note!',
                });    
            })
            .catch(error => {
            console.log('error', error);
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'This subject already has notepad',
            confirmButtonColor: '#d33', 
         });
       });
      }
      else {
        console.log('error: ตรวจสอบการกรอกข้อมูลอีกครั้ง')
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    goToChangePassword() {
      this.$router.push({ name: 'ChangePassword' });
    },
    fetchSubjectEnrolled() {
      this.userStore.initStore(); 
      const studentId = this.userStore.user.id;
      console.log("Student ID: ", studentId);
      this.notepadForm.student = studentId
      axios.get(`/studentEnrolled/?student=${studentId}`)
        .then(response => {
          this.subjects = response.data.map(subject => subject.subjectEnrolled);
        })
        .catch(error => {
          console.error('Could not fetch subjects', error);
        });
    },
    showSubject(item) {
      return { title: item.subjectName };
    },
  },
};
</script>

<style>
.notes-section {
  padding: 20px;
  background-color: #f5f5f5;
  height: 100%;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

.text-center {
  width: 100%;
}

.v-dialog .v-card-title {
  color: #424242; 
}

.v-dialog .v-card-actions {
  background-color: #fafafa; 
}
</style>
