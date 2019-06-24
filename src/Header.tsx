import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <HeaderArea>
      <HeaderContainer>
        <SiteName>Remember that guy</SiteName>
        <Nav>
          <StyledLink to="/">ライバル一覧</StyledLink>
          <StyledLink to="/past_games">過去の試合</StyledLink>
        </Nav>
      </HeaderContainer>
    </HeaderArea>
  )
}

export default Header

const HeaderArea = styled.div`
  width: 100%;
  background-color: #000000;
  position: sticky;
  top: 0;
`
const HeaderContainer = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

const SiteName = styled.h1`
  color: #ffffff;
  margin-right: auto;
`
const Nav = styled.nav`
  display: flex;
  flex-gap: 10px;
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

  &:first-child {
    margin-right: 10px;
  }
`
