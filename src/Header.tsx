import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <div>
      <h1>Remember that guy</h1>
      <Link to="/">ライバル一覧</Link>
      <Link to="/past_games">過去の試合</Link>
    </div>
  )
}

export default Header
