import { defineStore } from 'pinia'
import axios from 'axios'

import { BASE_URL } from '@/constants'
import { allowedNodeEnvironmentFlags } from 'process'
axios.defaults.withCredentials = true;
(async () => {
  try {
    await axios.get(`${BASE_URL}/api/user`)
  } catch (error) {
    localStorage.removeItem('user')
  }
})()

const user = localStorage.hasOwnProperty('user') ? JSON.parse(localStorage.user) : null

export const authStore = defineStore('user', {
  state: () => ({
    user: user
  }),
  actions: {
    async logIn(email: string, password: string) {
      try {
        const user = await axios.post(`${BASE_URL}/api/login`, { email, password })
        this.getUser()
        return {
          message: user.data.msg,
          status: 200
        }
      } catch (error) {
        return {
          message: error.response.data.message,
          status: error.response.status
        }
      }
    },
    async getUser() {
      try {
        const me = await axios.get(`${BASE_URL}/api/user`)
        this.user = me.data
        localStorage.setItem('user', JSON.stringify(me.data))
      } catch (error) {
        console.log(error)
      }
    },
    async logOut() {
      try {
        const res = await axios.post(`${BASE_URL}/api/logout`)
        localStorage.removeItem('user')
        this.user = null
        return {
          message: res.data.msg,
          status: 200
        }
      } catch (error) {
        return {
          message: error.response.data.message,
          status: error.response.status
        }
      }
    },
    async signUp(username: string, email: string, password: string, confirm: string) {
      try {
        const res = await axios.post(`${BASE_URL}/api/register`, {
          username,
          email,
          password,
          confirmPassword: confirm
        })
        return {
          message: res.data.msg,
          status: 200
        }
      } catch (error) {
        return {
          message: error.response.data.message,
          status: error.response.status
        }
      }
    },
    async forget(email: string) {
      try {
        const pass = await axios.post(`${BASE_URL}/api/forget`, { email })
        return {
          message: pass.data.msg,
          status: 200
        }
      } catch (error) {
        return {
          message: error.response.data.message,
          status: error.response.status
        }
      }
    },
    async reset(password: string, confirmPassword: string, token: string) {
      try {
        const update = await axios.post(`${BASE_URL}/api/reset/${token}`, {
          password,
          confirmPassword
        })
        return {
          message: update.data.msg,
          status: 200
        }
      } catch (error) {
        return {
          message: error.response.data.message,
          status: error.response.status
        }
      }
    },
    async confirm(token: string) {
      try {
        const res = await axios.post(`${BASE_URL}/api/email/${token}`, { token })
        return {
          message: res.data.msg,
          status: 200
        }
      } catch (error) {
        return {
          message: error.response.data.message,
          status: error.response.status
        }
      }
    },
    async DeleteMe(password: string) {
        try {
            const res = await axios.delete(`${BASE_URL}/api/user`, {data: { password}})
            this.logOut();
            return {
                message: res.data.msg,
                status: 200
            }
        } catch (error) {
            return {
                message: error.response.data.message,
                status: error.response.status
            }
        }
    },
  }
})
