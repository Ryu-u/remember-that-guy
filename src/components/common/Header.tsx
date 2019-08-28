import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'

const Header: React.FC = () => {
  return (
    <StyledAppBar>
      <StyledToolBar>
        <SiteName>Remember That Guy</SiteName>
        <StyledLink to="/">ライバル一覧</StyledLink>
        <StyledLink to="/past_games">過去の試合</StyledLink>
      </StyledToolBar>
    </StyledAppBar>
  )
}

export default Header

const StyledAppBar = styled(AppBar)`
  width: 100%;
  background-color: #000000;
  position: static;
  top: 0;
` as typeof AppBar

const StyledToolBar = styled.div`
  width: 800px;
  height: 80px;
  padding: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

const SiteName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-right: auto;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid #ffffff;
  border-radius: 5px;
  color: #ffffff;
  padding: 5px 7px;

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }

  &:first-of-type {
    margin-right: 10px;
  }
`
