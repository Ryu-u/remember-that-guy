import React from 'react'
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import axios from 'axios'
import { Rival } from '../backend/types'

interface DescriptionModalProps {
  isModalOpen: boolean
  name: string
  setIsModalOpen: () => void
  setRivalsState: (rivals: string[]) => void
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isModalOpen = false,
  setIsModalOpen = () => {},
  setRivalsState = () => {},
  name = ''
}) => {
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null)
  const handleSubmit = async (ref: React.RefObject<HTMLTextAreaElement>, name: string) => {
    const description = ref.current ? ref.current.value : ''

    console.log(description)
    await axios
      .post(`http://localhost:5000/remember_rivals`, {
        name,
        description
      })
      .then(() => {
        console.log('success')
        setIsModalOpen()
        const getData = async () => {
          await axios.get('http://localhost:5000/rivals').then(res => {
            const rivals: string[] = res.data.rivals.map((rival: Rival) => {
              return rival.name
            })
            setRivalsState(rivals)
          })
        }
        getData()
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <Modal open={isModalOpen} onEscapeKeyDown={setIsModalOpen} onBackdropClick={setIsModalOpen}>
      <FormContainer>
        <DescriptionForm
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit(descriptionRef, name)
          }}
        >
          <DescriptionTextarea name="description" ref={descriptionRef} />
          <SubmitButton type="submit">登録</SubmitButton>
        </DescriptionForm>
      </FormContainer>
    </Modal>
  )
}

export default DescriptionModal

const FormContainer = styled.div`
  height: 250px;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
`
const DescriptionTextarea = styled.textarea`
  height: 200px;
  width: 300px;
  font-size: 18px;
`

const DescriptionForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`

const SubmitButton = styled.button`
  background-color: #0099ff;
  color: #ffffff;
  width: 80px;
  font-size: 16px;
  smargin-right: 20px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #0099ff;
  margin-top: 10px;
  box-sizing: border-box;
  margin-left: auto;

  &:hover {
    opacity: 0.8;
  }
`
