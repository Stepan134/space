import React from "react"
import http from '../../http/index.ts'
import { useState, useEffect } from "react"
import { Table, Select, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { log } from "console";

const { Option } = Select;
interface User {
  id: number;
  displayname: string;
  avatar_url: string;
  vpn_server: {
    id: number;
    name: string
  };
  vpn_server_aliases: VpnServerAlias[]
}
interface AliasPivot {
  user_id: number;
  alias_id: number;
}
interface VpnServerAlias {
  id: number;
  name: string;
  office_id: number;
  pfsense_server_id: number;
  pivot: AliasPivot;
}

// список серверов
interface VpnServerAlias {
  id: number;
  name: string;
}

interface VpnServer {
  id: number;
  name: string;
  host: string;
  description: string;
  aliases: VpnServerAlias[];
}

const VpnPage:React.FC = () => {
  // получение списка пользователей для таблицы + параметры
  const [users, setUsers] = useState<User[]>([])
  const [serverList, setServerList] = useState<VpnServer[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await http.getUsers()
        setUsers(usersData.data)

        const vpnData = await http.getVpnList()
        setServerList(vpnData.data)
      } catch(err) {
        alert(err)
      }
    }
    fetchData()
  }, [])


  // для селекта ролей на сервере, необходимо знать айди сервера. Здесь логика связанная с селектами
  const [selectedVpn, setSelectedVpn] = useState(0); 
  const [selectedAliases, setSelectedAliases] = useState<any>(); // Состояние для хранения выбранных алиасов для каждого пользователя
  const handleChange = (userId: number) => (value: number[]) => {
    setSelectedAliases(prevSelectedAliases => ({
      ...prevSelectedAliases,
      [userId]: value,
    }))
  }
  // Обработчик изменения выбранного VPN
  const handleVpnChange = (vpnId) => {
    // получаем новые роли
    const newAliases = serverList.find(vpn => vpn.id === vpnId)?.aliases || []
    setSelectedAliases(newAliases)
    console.log(newAliases)
    
  }

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      key: 'displayname',
      render: (_, user) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={user.avatar_url} alt={user.displayname} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
          <div style={{ marginLeft: '10px'}}>{user.displayname}</div>
        </div>
      ),
      onCell: () => { return { style: { width: '35%'} }},
    },
    {
      title: 'Server',
      key: 'server',
      render: (_, user: User) => {
        // имя сервера для вывода в активный select
        return (
          <Select
            defaultValue={user.vpn_server ? user.vpn_server.name : 'No Data'}
            onChange={handleVpnChange}
            style={{ width: '200px' }}
          >
            {serverList.map(vpn => (
              <Option
                key={vpn.id}
                value={vpn.id}
              >
                {vpn.name}
              </Option>
            ))}
          </Select>
        )
      },
      onCell: () => { return { style: { width: '20%'} };},
    },
    {
      title: 'Role',
      key: 'role',
      render: (_, user: User) => { 
        // для отрисовки списка ролей, сначала смотрим есть ли в выбранном что-то, если нет, то вычисляем какие-роли можно выбрать для сервера, который уже выбран
        const aliases = selectedAliases ? selectedAliases : (user.vpn_server ? serverList.find(vpn => vpn.id === user.vpn_server.id)?.aliases || [] : [])
        const selectedNames = user.vpn_server_aliases.map(alias => alias.name);
        return (
          <Select
            mode="multiple"
            style={{ width: '200px' }}
            placeholder="Выберите роли"
            value={selectedNames}
          >
            {aliases.map(alias => (
              <Option key={alias.id} value={alias.id}>{alias.name}</Option>
            ))}
          </Select>
        )
      },
      onCell: () => { return { style: { width: '20%'} };},
    },
    {
      title: 'Config',
      key: 'config',
      render: () => (
        <Button type="primary" icon={<i className="mdi mdi-cog" />} />
      ),
      onCell: () => { return { style: { width: '10%'}}}
    },
    {
      title: 'Edit',
      key: 'edit',
      render: () => (
        <Button type="primary" icon={<i className="mdi mdi-pencil" />} />
      ),
      onCell: () => { return { style: { width: '15%'}}}
    },
  ];
  return(
  <>
    <div className="page">
      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 25 }}
      />
    </div>
  </>
)};

export default VpnPage;
