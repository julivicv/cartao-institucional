import React from 'react'
import ReactDOM from 'react-dom/client'
import Card from './components/Card'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Card name={"Júlio"} birth={"14/02/05"} href={"a.com"} group={"3°INFO"} link={"a.com"} />
  </React.StrictMode>,
)
