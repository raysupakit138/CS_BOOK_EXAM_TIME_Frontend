<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="4">
        <div class="notes-section">
          <div class="user-info">
          <span>Student : {{ userName }}</span>
          <v-btn small @click="logout" class="logout-button">Log Out</v-btn>
        </div>
          <div class="text-center">
            <v-btn color="primary"  @click="dialog = true" class="mr-1">Add note</v-btn>
            <v-btn color="primary" @click="goToChangePassword">Change Password</v-btn>
          </div>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Add important note
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="notepadForm.description" label="Enter your note" autofocus outlined rows="5" no-resize></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-select :items="subjects" :item-props="showSubject" item-text="username" item-value="id" v-model="notepadForm.subject" label="Select Subject" outlined ></v-select>
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
          <v-card class="notes-list-card full-width"  outlined flat>

          <v-card-title>My notes</v-card-title>
          <v-card-text class="scrollable-notes-list">
            <v-list dense>
              <v-list-item v-for="(note, index) in notes" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ note.subjectNotepad.subjectName }} ({{ note.subjectNotepad.subjectCode }})</v-list-item-title>
                  <v-divider class="my-2" color="black"></v-divider>
                  <v-list-item-subtitle>{{ note.description }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="d-flex justify-end align-center">
                  <v-btn icon @click="editNote(index)" class="mr-2">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteNote(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item v-if="notes.length === 0">
                <v-list-item-content class="text-center">
                  No notes added yet. Start by adding a new note!
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        </div>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="schedule-section">
          <v-card-title class="text-h5 grey lighten-2">My Schedule</v-card-title>
          <v-card-text>
            <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Subject</th>
                  <th class="text-left">Description</th>
                  <th class="text-left">Start Time</th>
                  <th class="text-left">End Time</th>
                  <th class="text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="exam in exams" :key="exam.id">
                  <td>{{ exam.subjectExamDetail.subjectName }} ({{ exam.subjectExamDetail.subjectCode }})</td>
                  <td>{{ exam.description }}</td>
                  <td>{{ exam.startTime }}</td>
                  <td>{{ exam.endTime }}</td>
                  <td>{{ exam.date }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import Swal from 'sweetalert2'

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
      this.userStore.initStore()

  },
  data() {
    return {
      dialog: false,
      newNote: '',
      subjects: [], 
      selectSubject: {},
      errors: [], 
      notes: [],
      isEditMode: false,
      editNoteId: null, 
      originalNote: {}, 
      notepadForm: {
        description: '',
        subject: '',
        student: ''
      },
      exams: [],
      studentEnrolled: [],
      subjectId: [],



    };
  },

  mounted() {
    this.fetchSubjectEnrolled();
    this.fetchNotes();
    this.fetchExamDetailStudent();
  },
  methods: {
    async fetchExamDetailStudent() {
      try {
        this.userStore.initStore();
        const studentId = this.userStore.user.id;
        this.studentId = studentId;

        const subjectsResponse = await axios.get(`/studentEnrolled/?student=${studentId}`);
        this.subjects = subjectsResponse.data;
        
        // Fetch all exams for the enrolled subjects
        const examsResponses = await Promise.all(this.subjects.map(subject =>
          axios.get(`/examdetail/?subject=${subject.id}`)
        ));

        // Flatten the array of arrays into a single array with all exam objects
        this.exams = examsResponses.map(res => res.data).flat();
      } catch (error) {
        console.error('Error fetching student exam data:', error);
        throw error;
      }
    },
    // async fetchExamDetailStudent() {
    //   try {
    //     this.userStore.initStore();
    //     const studentId = this.userStore.user.id;
    //     this.studentId = studentId;

    //     // ดึงข้อมูลวิชาที่นิสิตลงทะเบียนแบบ asynchronous
    //     const subjectsResponse = await axios.get(`/studentEnrolled/?student=${studentId}`);
    //     this.subjects = subjectsResponse.data;
        
    //     // ดึงข้อมูลการสอบสำหรับวิชาที่ลงทะเบียนทั้งหมดแบบ asynchronous
    //     const examsPromises = this.subjects.map(async (subject) => {
    //       const examResponse = await axios.get(`/examdetail/?subject=${subject.id}`);
    //       return examResponse.data; // สมมติว่าการตอบสนองมีข้อมูลการสอบ
    //     });

    //     const exams = await Promise.all(examsPromises);
    //     console.log(exams); // ตัวอย่างการแสดงผลข้อมูลการสอบ
    //     this.exams = this.exams.flat();

    //   } catch (error) {
    //     console.error('Error fetching student exam data:', error);
    //     throw error;
    //   }
    // },
    resetForm() {
    this.notepadForm.description = '';
    this.notepadForm.subject = '';
    this.isEditMode = false;
    this.editNoteId = null;
  },

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
                
              this.resetForm(); 
              this.dialog = false; 
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
    if (this.isEditMode) {
      if (this.isEditMode) {
        axios.put(`/notepad/${this.editNoteId}/`, this.notepadForm)
        .then(response => {
          const index = this.notes.findIndex(note => note.id === this.editNoteId);
         if (index !== -1) {
          this.notes[index].description = this.notepadForm.description;
        }
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Note successfully updated!',
        });
        this.resetForm(); 
        this.dialog = false; 
      })
      .catch(error => {
        console.error('Error updating note', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update note',
        });
      });
    }
        else {
          console.log('error: ตรวจสอบการกรอกข้อมูลอีกครั้ง')
        }
      }   
    },
    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
    goToChangePassword() {
      this.$router.push({ name: 'ChangePassword' });
    },
    // fetchSubjectEnrolled() {
    //   this.userStore.initStore(); 
    //   const studentId = this.userStore.user.id;
    //   console.log("Student ID: ", studentId);
    //   this.notepadForm.student = studentId
    //   axios.get(`/studentEnrolled/?student=${studentId}`)
    //     .then(response => {
    //       this.subjects = response.data.map(subject => subject.subjectEnrolled);
    //     })
    //     .catch(error => {
    //       console.error('Could not fetch subjects', error);
    //     });
    // },
    fetchSubjectEnrolled() {
    this.userStore.initStore(); 
    const studentId = this.userStore.user.id;
    this.notepadForm.student = studentId
    axios.get(`/studentEnrolled/?student=${studentId}`)
      .then(response => {
        this.subjects = response.data.map(subject => subject.subjectEnrolled);
        // Set the default selection for the v-select
        if (this.subjects.length > 0) {
          this.notepadForm.subject = this.subjects[0].id; // assuming 'id' is the property to bind
        }
      })
      .catch(error => {
        console.error('Could not fetch subjects', error);
      });
  },
    showSubject(item) {
      return { title: item.subjectName + " (" + item.subjectCode + ")" };
    },
    async fetchNotes() {
      this.userStore.initStore(); 
      const studentId = this.userStore.user.id;
      console.log("fetchNotes-Student ID: ", studentId);
      await axios
        .get(`/notepad/?student=${studentId}`) 
        .then(response => {
          this.notes = response.data;
          console.log('note'+this.notes)
        })
        .catch(error => {
          console.error('Could not fetch notes', error);
        });
    },

    deleteNote: function(noteIndex) {
      const note = this.notes[noteIndex];
      if (!note || !note.id) {
        console.error('Note ID is required for deletion.');
        return;
      }

      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this note?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#006400',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/notepad/${note.id}`)
            .then(response => {
              // Successfully deleted on backend, remove from frontend list
              this.notes.splice(noteIndex, 1);
              Swal.fire(
                'Deleted!',
                'Your note has been deleted.',
                'success'
              );
            })
            .catch(error => {
              console.error('Error deleting note:', error);
              Swal.fire(
                'Failed!',
                'There was a problem deleting your note.',
                'error'
              );
            });
        }
      });
    },
      editNote(index) {
        const noteToEdit = this.notes[index];
        this.notepadForm.description = noteToEdit.description;
        this.notepadForm.subject = noteToEdit.subject; // Adjust according to your data model
        this.isEditMode = true;
        this.editNoteId = noteToEdit.id;
        this.dialog = true; // Open the dialog to edit the note
    },
    addNewNote() {
    this.resetForm(); // Reset form when adding a new note
    this.dialog = true; // Open the dialog
    },
    logout() {
      this.userStore.removeToken()
      this.$router.push('/login')
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

.notes-section {
  padding: 0; 
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
.notes-list .v-list-item {
  margin-bottom: 2
  0px; 
}

.notes-section {
  padding: 20px;
  background-color: #fafafa;  
  height: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.notes-list-card {
  margin-top: 20px; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.v-card-text {
  padding-top: 0; 
}

.scrollable-notes-list {
  max-height: 350px; 
  overflow-y: auto;
  min-height: auto;
}

.full-width {
  width: 100%;
  max-width: 100%; 
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.user-info span {
  font-weight: 600;
  color: #424242;
}

.logout-button {
  color: #d32f2f; /* Red color for the log out button */
}

</style>
