import React from 'react'
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import axios from 'axios'
import { Rival } from '../../types/types'

interface DescriptionModalProps {
  isModalOpen: boolean
  name: string
  handleModalClose: () => void
  setRivalsState: (rivals: string[]) => void
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isModalOpen = false,
  handleModalClose,
  setRivalsState,
  name = ''
}) => {
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmit = React.useCallback(
    async (ref: React.RefObject<HTMLTextAreaElement>, name: string) => {
      const description = ref.current ? ref.current.value : ''

      await axios
        .post(`/api/v1/rivals`, {
          name,
          description
        })
        .then(() => {
          handleModalClose()
          const getData = async () => {
            await axios.get('/api/v1/rivals').then(res => {
              const rivals: string[] = res.data.rivals.map((rival: Rival) => {
                return rival.name
              })
              setRivalsState(rivals)
            })
          }
          getData()
        })
    },
    [handleModalClose, setRivalsState]
  )

  return (
    <Modal open={isModalOpen} onEscapeKeyDown={handleModalClose} onBackdropClick={handleModalClose}>
      <FormContainer>
        <ModalCloseButton onClick={handleModalClose}>×</ModalCloseButton>
        <ModalTitle>メモを入力</ModalTitle>
        <DescriptionForm>
          <DescriptionTextarea name="description" ref={descriptionRef} />
          <SubmitButton
            type="submit"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit(descriptionRef, name)
            }}
          >
            登録
          </SubmitButton>
        </DescriptionForm>
      </FormContainer>
    </Modal>
  )
}

export default DescriptionModal

const FormContainer = styled.div`
  height: 300px;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding-bottom: 10px;
`

const ModalCloseButton = styled.button`
  font-size: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  width: 20px;
  height: 20px;
  margin-left: auto;
  margin-right: 3px;

  &:hover {
    background-color: #cdcdcd;
  }
`

const ModalTitle = styled.div`
  margin: 0 auto 10px 25px;
  font-size: 20px;
`

const DescriptionTextarea = styled.textarea`
  height: 200px;
  width: 300px;
  font-size: 18px;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  resize: none;
`

const DescriptionForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`

const SubmitButton = styled.button`
  background-color: #0099ff;
  color: #ffffff;
  width: 80px;
  height: 24px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #0099ff;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: auto;

  &:hover {
    opacity: 0.8;
  }
`
