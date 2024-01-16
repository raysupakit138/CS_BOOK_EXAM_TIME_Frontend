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

    },
    setToken(data) {
      
      this.user.access = data.access
      this.user.refresh = data.refresh
      this.user.isAuthenticated = true

      localStorage.setItem('user.access', data.access)
      localStorage.setItem('user.refresh', data.refresh)

      console.log('user.access: ', localStorage.getItem('user.access'))
    },
    
    removeToken() {},
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
    refreshToken() {}
  }

})
