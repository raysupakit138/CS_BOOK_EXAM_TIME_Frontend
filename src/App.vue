<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { RouterView } from 'vue-router'

export default {
  setup() {
    const userStore = useUserStore()
    return {
        userStore
    }
  },
  beforeCreate() {
      this.userStore.initStore()

      const token = this.userStore.user.access

      if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } else {
          axios.defaults.headers.common["Authorization"] = "";
      }
  },
  data() {
    return {}
  }
}

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
