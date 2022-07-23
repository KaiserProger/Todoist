import React, { useState } from 'react'
import { Button, ButtonGroup, Card, Col, FormCheck, Row } from 'react-bootstrap'
import { deleteNote, markNote } from '../api/API';
import { NoteType } from '../types/NoteType'
import EditNote from './modals/EditNote';


const Note = (props: NoteType) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const token = localStorage.getItem("token") || "";
  const deleteSelf = async () => {
    await deleteNote(props.uuid, token);
  }
  const markSelf = async () => {
    await markNote(props.uuid, token);
  }
  return (
    <Card className='my-2'>
      <Card.Body>
        <Row>
          <Col className="text-left mx-4">
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.text}<br />Created at: {props.created_at.toLocaleDateString()}</Card.Text>
          </Col>
          <Col className="text-end d-flex justify-content-center align-items-center">
            <ButtonGroup vertical className='mx-2'>
              <Button variant='primary' onClick={() => setEditModal(true)}>Редактировать</Button>
              <Button variant='success'
                onClick={() => markSelf()}>Завершить</Button>
              <Button variant='danger'
                onClick={() => deleteSelf()}>Удалить</Button>
            </ButtonGroup>
            <FormCheck className='mx-4' aria-label='option-1' checked={props.completed}
              readOnly></FormCheck>
          </Col>
        </Row>
      </Card.Body>
      <EditNote show={editModal} onHide={() => setEditModal(false)}
        note_id={props.uuid} name={props.name} text={props.text} />
    </Card>
  )
}

export default Note;