import React from 'react'
import logo from './logo.svg'
import './App.css'

interface ReturnType {
  message: string
}

const getMessage = async () => {
  const res = await fetch('/hello')
  const mes = await res.json()
  return mes
}

const App: React.FC = () => {
  let mes
  getMessage().then((value: ReturnType) => {
    mes = value.message
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
