import axios from 'axios'
import endpoints from './endpoints.ts'
import { httpCodes,httpHeaders } from './constants.ts'
import { logout, getToken} from '../auth/index.ts'

class HttpClient {
  constructor () {
    this.defaultHeaders = {}
    this.client = axios.create({
      headers: this.defaultHeaders
    })
    

    this.client.interceptors.request.use(
      config => {
        const changeHeaders = { ...this.defaultHeaders }

        const token = getToken()
        if (token) {
          changeHeaders[httpHeaders.AUTHORIZATION] = `Bearer ${token}`
        }

        return {
          ...config,
          headers: changeHeaders
        }
      },
      err => Promise.reject(err)
    )

    this.client.interceptors.response.use(
      res => res,
      err => {
        if (err.response && err.response.status === httpCodes.UNAUTHORIZED) {
          logout()
        }

        return Promise.reject(err)
      }
    )
  }

  formatUrl (url, args) {
    let changeUrl = url

    Object.keys(args).forEach(key => {
      changeUrl = changeUrl.replace(`{${key}}`, args[key])
    })
    return changeUrl
  }
  
}

export default new Proxy(
  new HttpClient(), {
    get (target, name) {
      if (endpoints[name] !== undefined) {
        return ({
          params = {},
          data = {},
          args = {}
        } = {}) => {
          return target.client({
            method: endpoints[name].method,
            url: target.formatUrl(endpoints[name].url, args),
            data,
            params
          }).then(response => response.data)
        }
      } else {
        return target[name]
      }
    }
  }
)
