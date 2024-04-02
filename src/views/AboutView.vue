<template>
  <div class="exam-schedule">
    <h1>Exam Schedule</h1>
    <table>
      <thead>
        <tr>
          <th>Subject Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Teacher</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exam in exams" :key="exam.id">
          <td>{{ exam.subject }}</td>
          <td>{{ exam.startTime }}</td>
          <td>{{ exam.endTime }}</td>
          <td>{{ exam.teacher }}</td>
          <td>
            <button @click="cancelExam(exam.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
