import React from "react"
import Header from "./Header.tsx"
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
const { Content } = Layout

const MainLayout: React.FC = () => {
  return ( 
    <div>
      <Layout>
        <Header />
          <Content style={contentStyle}>
            <Outlet/>
          </Content>
      </Layout>
    </div>
  )
}

// style
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '94vh',
  lineHeight: '120px',
  color: '#fff',
}

export default MainLayout;