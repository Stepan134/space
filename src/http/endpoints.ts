const API_URL = 'https://api.saber3d.net'

type endpointsConfig = {
  [key: string]: {
    method: string;
    url: string;
  }
}
const endpoints: endpointsConfig = {
  login: { method: 'get', url: `${API_URL}/v1/get-self`},
}

export default endpoints