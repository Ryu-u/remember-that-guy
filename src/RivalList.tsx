import React from 'react'
import styled from 'styled-components'
import { Rival } from '../backend/types'
import axios from 'axios'

const RivalList: React.FC = () => {
  // setStateを配列に指定すればOKっぽい。理由は謎
  // Refは使えない？
  const [state, setState] = React.useState<Rival[]>([])
  React.useEffect(() => {
    const getRivals = async () => {
      await axios.get('http://localhost:5000/rivals').then(res => {
        setState(res.data.rivals)
      })
    }

    getRivals()
  }, [setState])

  return (
    <Container>
      {state.map((rival: Rival, index: number) => {
        const nameToUrl = rival.name.replace(/ /g, '')
        const opggUrl = `https://jp.op.gg/summoner/userName=${nameToUrl}`
        return (
          <RivalRow key={index}>
            <RivalNameColumn>
              <RivalNameAnchor href={opggUrl} target="_blank" rel="noopener noreferrer">
                {rival.name}
              </RivalNameAnchor>
            </RivalNameColumn>
            <RivalNameDescription>{rival.description}</RivalNameDescription>
          </RivalRow>
        )
      })}
    </Container>
  )
}

export default RivalList

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`
const RivalRow = styled.div`
  width: 700px;
  border-bottom: 1px solid #cdcdcd;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  padding: 15px 50px;
`
const RivalNameColumn = styled.div`
  width: 300px;
  justify-self: flex-start;
  overflow-wrap: break-word;
`
const RivalNameAnchor = styled.a`
  text-decoration: none;

  &:hover {
    background-color: #cdcdcd;
  }
`
const RivalNameDescription = styled.p`
  width: 400px;
  word-wrap: anywhere;
  overflow-wrap: anywhere;
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 1.5;
  margin: 0;
`
