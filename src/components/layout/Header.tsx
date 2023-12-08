import React from 'react'
import { Layout, Button } from 'antd'
import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
const { Header } = Layout

const MyHeader: React.FC = () => {
  interface Icon {
    title: string;
    href: string;
    icon: string;
    id: number;
  }
  const buttons: Icon[] = [
    {
      title: 'VPN',
      href: '/',
      icon: 'mdi mdi-server-network',
      id: 1
    },
    {
      title: 'Сlients',
      href: '/clients',
      icon: 'mdi mdi-account-supervisor',
      id: 2
    },
    {
      title: 'Statistics',
      href: '/statistics',
      icon: 'mdi mdi-poll',
      id: 3
    },
    {
      title: 'Map',
      href: '/map',
      icon: 'mdi mdi-map-marker',
      id: 4
    },
    {
      title: 'Software',
      href: '/sw',
      icon: 'mdi mdi-folder-plus ',
      id: 5
    }
  ]

  return (
    <div>
      <Header className="header">
        <NavLink to="/" className="logo-href">
          <img src={logo} alt="Space Icon" />
          <span className="logo-href-span">Saber Space</span>
        </NavLink>
        <div className="button-container">
          {buttons.map((button) => (
            <NavLink
              to={button.href}
              key={button.id}
              className={({ isActive }) => "button" + (isActive ? " active" : "")}
            >
              <Button className="button">
                <i className={button.icon} />
                <span>{button.title}</span>
              </Button>
            </NavLink>
          ))}
        </div>
        <div className="logout-container">
          <i className="mdi mdi-location-exit" style={{ fontSize: '24px' }} /><span className="logout">Logout</span>
        </div>
      </Header>
    </div>
  )
}

export default MyHeader