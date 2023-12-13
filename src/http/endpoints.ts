const API_URL = 'https://api.saber3d.net'

type endpointsConfig = {
  [key: string]: {
    method: string;
    url: string;
  }
}
const endpoints: endpointsConfig = {
  login: { method: 'get', url: `${API_URL}/v1/get-self`},
  getUsers: { method: 'get', url: `${API_URL}/v1/users?limit=5&expand=software_sets,excluded_software_sets,vpn_server,vpn_server_aliases` },
  getVpnList: { method: 'get', url: `${API_URL}/v1/software/vpn/servers` },
}

export default endpoints