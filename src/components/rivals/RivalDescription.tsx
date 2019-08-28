import React from 'react'
import styled from 'styled-components'

interface RivalDescriptionProps {
  description: string
}

const RivalDescription: React.FC<RivalDescriptionProps> = ({ description }) => {
  return <RivalNameDescriptionTextArea>{description}</RivalNameDescriptionTextArea>
}

const RivalNameDescriptionTextArea = styled.p`
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 1.5;
  margin: 0;
`

export default RivalDescription
