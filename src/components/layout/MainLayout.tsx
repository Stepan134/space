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
          <Content>
            <Outlet/>
          </Content>
      </Layout>
    </div>
  )
}

export default MainLayout;