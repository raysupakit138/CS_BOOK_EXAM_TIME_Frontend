import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import TestView from '../views/TestView.vue'
import AdminView from '../views/AdminView.vue'
import ChangePassword from '../views/ChangePassword.vue'
import ViewUsers from '../views/ViewUsers.vue'
import Calendar from '../views/Calendar.vue'
import AddSubject from '../views/AddSubject.vue'
import TeacherCalendar from '../views/TeacherCalendar.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path : '/ViewUsers',
      name : 'ViewUsers',
      component: ViewUsers
    },
    {
      path : '/Calendar',
      name : 'Calendar',
      component : Calendar
    },
    {
      path : '/AddSubject',
      name : 'AddSubject',
      component : AddSubject
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path : '/TeacherCalendar',
      name : 'TeacherCalendar',
      component : TeacherCalendar
    }
  ]
})

export default router
