import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function AgregarNotificacion({ show, handleClose, materiaId }) {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleMensajeChange = (event) => {
    setMensaje(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validar que se hayan agregado un título y un mensaje
    if (!titulo || !mensaje) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const notificacionData = {
      id_materia: materiaId,
      titulo,
      mensaje
    };

    try {
      const response = await axios.post('http://localhost:3001/crearNotificacion', notificacionData);
      console.log('Notificación creada exitosamente:', response.data);
      alert("Notificación exitosa");
      handleClose();
    } catch (error) {
      console.error('Error al crear la notificación:', error);
      setError('Error al crear la notificación. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Notificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" value={titulo} onChange={handleTituloChange} />
          </Form.Group>
          <Form.Group controlId="formMensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} value={mensaje} onChange={handleMensajeChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar Notificación
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarNotificacion;