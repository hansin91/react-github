import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { deleteFavourite } from '../../../redux/actions'

function DeleteModal (props) {

  const dispatch = useDispatch()

  const deleteFav = (id) => {
    dispatch(deleteFavourite(id))
  }

  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader >Delete confirmation</ModalHeader>
      <ModalBody>
        <p>Are you sure want to remove this from your favourites ?</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => deleteFav(props.deletedId)} color="danger">Okay</Button>
        <Button onClick={() => props.closeModal(false)} color="success">Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteModal