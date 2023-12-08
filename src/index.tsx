import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'
import './scss/index.scss'
import App from './App.tsx'
import { auth } from './auth/index.ts'

auth()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </HashRouter>
);

