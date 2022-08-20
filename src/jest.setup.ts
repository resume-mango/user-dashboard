import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.staging' })

if (typeof process != 'undefined') {
  axios.defaults.adapter = require('axios/lib/adapters/http')
}
axios.defaults.baseURL = `${process.env.API_HOST}/v1`
axios.defaults.withCredentials = true
