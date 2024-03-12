import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      isAuthenticated: false,
      id: null,
      username: null,
      firstname : null,
      lastname : null,
      role: null,
      prefix: null,
      access: null,
      refresh: null,
    }

  }),
  actions: {
    initStore() {
      if (localStorage.getItem('user.access')) {
        this.user.id = localStorage.getItem('user_id')
        this.user.access = localStorage.getItem('user.access')
        this.user.refresh = localStorage.getItem('user.refresh')
        this.user.username = localStorage.getItem('user_username')
        this.user.firstname = localStorage.getItem('user_firstname')
        this.user.lastname = localStorage.getItem('user_lastname')
        this.user.role = localStorage.getItem('user_role')
        this.user.prefix = localStorage.getItem('user_prefix')
        this.user.isAuthenticated = true
        this.refreshToken()

        console.log('Initialized user:', this.user)
      }

    },
    setToken(data) {
      
      this.user.access = data.access
      this.user.refresh = data.refresh
      this.user.isAuthenticated = true

      localStorage.setItem('user.access', data.access)
      localStorage.setItem('user.refresh', data.refresh)

      console.log('user.access: ', localStorage.getItem('user.access'))
    },
    removeToken() {
      console.log('removeToken')

      this.user.refresh = null
      this.user.access = null
      this.user.isAuthenticated = false
      this.user.id = null
      this.user.username = null
      this.user.email = null
      this.user.role = null
      this.user.name = null
      this.user.prefix = null
      this.user.firstname = null
      this.user.lastname = null

      localStorage.setItem('user.access', '')
      localStorage.setItem('user.refresh', '')
      localStorage.setItem('user_id', '')
      localStorage.setItem('user.user_id', '')
      localStorage.setItem('user_username', '')
      localStorage.setItem('user_email', '')
      localStorage.setItem('user_role', '')
      localStorage.setItem('user.name', '')
      localStorage.setItem('user_firstname', '')
      localStorage.setItem('user_lastname', '')
      localStorage.setItem('user_prefix', '')
    },
    setUserInfo(user) {

      this.user.id = user.id
      this.user.username = user.username
      this.user.firstname = user.firstname
      this.user.lastname = user.lastname
      this.user.email = user.email
      this.user.role = user.role
      this.user.prefix = user.prefix

      localStorage.setItem('user_id' , this.user.id)
      localStorage.setItem('user_username' ,this.user.username)
      localStorage.setItem('user_firstname', this.user.firstname)
      localStorage.setItem('user_lastname', this.user.lastname)
      localStorage.setItem('user_email', this.user.email)
      localStorage.setItem('user_role',this.user.role)
      localStorage.setItem('user_prefix',this.user.prefix)

      console.log('User', this.user)
    },
    refreshToken() {
      console.log('Refresh')
      axios.post('/api/refresh/', {

          refresh: this.user.refresh
      })
          .then((response) => {
              this.user.access = response.data.access

              localStorage.setItem('user.access', response.data.access)

              axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
          })
          .catch((error)=>{
              console.log(error)

              this.removeToken()
          })
    }
  }

})
