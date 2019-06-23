import React from 'react'
import Modal from '@material-ui/core/Modal'
import axios from 'axios'

interface DescriptionModalProps {
  isModalOpen: boolean
  name: string
  setIsModalOpen: () => void
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isModalOpen = false,
  setIsModalOpen = () => {},
  name = ''
}) => {
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null)
  const handleSubmit = async (
    ref: React.RefObject<HTMLTextAreaElement>,
    name: string
  ) => {
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
