import cookie from 'js-cookie'
import http from '../http/index.ts'
import { httpCodes } from '../http/constants.ts'
import { ACCESS_TOKEN, COOKIE_PATH, COOKIE_DOMAIN } from './constants.ts'
import { setUser } from '../redux/userSlice.ts'
import { store } from '../redux/index.ts'

type cookieOptions = {
  path: string,
  domain: string
}

const REDIRECT_AUTH_URL: string = 'https://login.saber3d.net'
const COOKIE_OPTIONS: cookieOptions  = { path: COOKIE_PATH, domain: COOKIE_DOMAIN }

function removeToken () {
  cookie.remove(ACCESS_TOKEN, COOKIE_OPTIONS)
}

export function getToken () {
  return cookie.get(ACCESS_TOKEN)
}

export function logout () {
  removeToken()
  window.location.replace(`${REDIRECT_AUTH_URL}?redirect=${window.location.href}`)
}

export async function auth () {
  try {
    const data = await http.login()
    store.dispatch(setUser(data))
  } catch (err) {
    if (err.response && err.response.status === httpCodes.UNAUTHORIZED) throw err
    throw err
  }
}
