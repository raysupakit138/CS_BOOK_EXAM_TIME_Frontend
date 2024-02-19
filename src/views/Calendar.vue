<template>
  <v-container>
    <v-row justify="center">
      <!-- Left side note section -->
      <v-col cols="12" sm="4">
        <div class="notes-section">
          <!-- Centered Add note button -->
          <div class="text-center">
            <v-btn color="primary" @click="dialog = true">Add note</v-btn>
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
                      <v-text-field v-model="newNote" label="Enter your note" autofocus outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select :items="teachers" item-text="username" item-value="id" v-model="selectTeacher" label="Select a teacher" outlined></v-select>
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
export default {
  data() {
    return {
      dialog: false,
      newNote: '',
      teachers: [], // Assume this will be populated with teacher objects { id, username }
      selectTeacher: '',
    }
  },

  methods: {
    saveNote() {
      // Your save logic here
      this.dialog = false;
    },
    closeDialog() {
      this.dialog = false;
    }
  }
}
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
  color: #424242; /* Darker shade for better contrast */
}

.v-dialog .v-card-actions {
  background-color: #fafafa; /* Light grey background for the actions area */
}
</style>
