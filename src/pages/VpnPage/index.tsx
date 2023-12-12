import React from "react"
import http from '../../http/index.ts'
import { useState, useEffect } from "react"
import { Table, Select, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;
interface User {
  id: number;
  name: string;
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
    onCell: () => { return { style: { width: '30%'} };},
  },
  {
    title: 'Select1',
    key: 'select1',
    render: (_, record) => (
      <Select defaultValue="option1" style={{ width: '200px' }}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </Select>
    ),
    onCell: () => { return { style: { width: '20%'} };},
  },
  {
    title: 'Select2',
    key: 'select2',
    render: () => (
      <Select defaultValue="option1" style={{ width: '200px' }}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </Select>
    ),
    onCell: () => { return { style: { width: '20%'} };},
  },
  {
    title: 'Config',
    key: 'config',
    render: () => (
      <Button type="primary">Button 1</Button>
    ),
    onCell: () => { return { style: { width: '15%'} };},
  },
  {
    title: 'Edit',
    key: 'edit',
    render: () => (
      <Button>Button 2</Button>
    ),
    onCell: () => { return { style: { width: '15%'} };},
  },
];

const VpnPage:React.FC = () => {
  // получение списка пользователей для таблицы + параметры
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      try{
        await http.getUsers().then((data) => setUsers(data.data))
      } catch(err) {
        alert(err)
      }
    }
    getUsers()
  }, [])
  return(
  <>
    <div className="page">
      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 25 }} // установка количества записей на страницу
      />
    </div>
  </>
)};

export default VpnPage;
