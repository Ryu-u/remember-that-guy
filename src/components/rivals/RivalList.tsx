import React from 'react'
import styled from 'styled-components'
import { Rival } from '../../types/types'
import axios from 'axios'
import RivalListRow from './RivalListRow'

const RivalList: React.FC = () => {
  // setStateを配列に指定すればOKっぽい。理由は謎
  // Refは使えない？
  const [state, setState] = React.useState<Rival[]>([])
  React.useEffect(() => {
    const getRivals = async () => {
      await axios.get('/api/v1/rivals').then(res => {
        setState(res.data.rivals)
      })
    }

    getRivals()
  }, [setState])

  return (
    <Container>
      {state.map((rival: Rival) => {
        const nameToUrl = rival.name.replace(/ /g, '')
        const opggUrl = `https://jp.op.gg/summoner/userName=${nameToUrl}`
        return <RivalListRow key={nameToUrl} rival={rival} opggUrl={opggUrl} />
      })}
    </Container>
  )
}

export default RivalList

const Container = styled.div`
  width: 800px;
  margin: 100px auto 30px;
`
