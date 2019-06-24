import React from 'react'
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
    <Modal open={isModalOpen}>
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit(descriptionRef, name)
        }}
      >
        <textarea name="description" ref={descriptionRef} />
        <button type="submit">登録</button>
      </form>
    </Modal>
  )
}

export default DescriptionModal
