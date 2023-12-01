import cookie from 'js-cookie'
import http from '../http/index.tsx'
import { httpCodes } from '../http/constants.tsx'
import { ACCESS_TOKEN, COOKIE_PATH, COOKIE_DOMAIN } from './constants.tsx'

const REDIRECT_AUTH_URL = 'https://login.saber3d.net'
const COOKIE_OPTIONS = { path: COOKIE_PATH, domain: COOKIE_DOMAIN }
console.log('COOKIE_OPTIONS', COOKIE_OPTIONS)

function removeToken () {
  cookie.remove(ACCESS_TOKEN, COOKIE_OPTIONS)
}

export function getToken () {
  console.log('ACCESS_TOKEN', cookie.get())
  return cookie.get(ACCESS_TOKEN)
  // return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zYWJlcjNkLm5ldCIsImF1ZCI6Imh0dHBzOi8vYXBpLnNhYmVyM2QubmV0IiwiaWF0IjoxNzAwNzcxNDIyLjIwNjEyNywiZXhwIjoxNzAxOTgxMDI3LjIwNjA0MiwidXNlcl9pZCI6Mzk0OCwidXNlcm5hbWUiOiJzZGV2bGlhc2hvdiJ9.O5rbbyxIhb3eqI8GHkxJ8Gj3AtinB7fs5uMPdNJ7YHodsyaMGLUOeeoAOUlw8bmGzXZ1KX76h36-R5KiLFTUF2c1BRFHyifc_X2kc74MH_HH1ouTz103fqU5fnnGPjtKguurpRkrnH51sMoF7I8Nfgqpe2PvpWgx6sYuKZe6oajdPUn1LY1ygrgKSi0BQ-LKQf-ccC9N4Bc5Q2yZjlX0Te75uT_C2lLg9KesPztEgsRv0DqwDDYOd718ObU5qWyRMRrVuYfNRtZ8tACh2Ehz3-ALRP7j708rUkHGCv0o-fPvoDhZcMzimxPRth_jsEXwDRzzIReJdZHMHZ1YW0FXVQ'
}

export function logout () {
  removeToken()
  window.location.replace(`${REDIRECT_AUTH_URL}?redirect=${window.location.href}`)
}

export async function auth () {
  try {
    const data = await http.login()
    // тут можно записать полученный токен в объект юзера
  } catch (err) {
    if (err.response && err.response.status === httpCodes.UNAUTHORIZED) throw err
    throw err
  }
}
