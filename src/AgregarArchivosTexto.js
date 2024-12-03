import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function AgregarArchivosTexto({ show, handleClose, materiaId }) {
  const [file, setFile] = useState(null);
  const [tipo, setTipo] = useState('texto/pdf');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    // Validar que se haya agregado un archivo
    if (!file) {
      setError('Por favor, seleccione un archivo.');
      return;
    }

    // Validar que se haya agregado una descripción
    if (!descripcion) {
      setError('Por favor, ingrese una descripción.');
      return;
    }

    // Validar el tipo de archivo
    const allowedExtensions = ['txt', 'pdf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      setError('Tipo de archivo no permitido. Solo se permiten txt y pdf.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('materiaId', materiaId);
    formData.append('tipo', tipo);
    formData.append('descripcion', descripcion);

    try {
      const response = await axios.post('http://localhost:3001/subirMultimedia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      alert("Contenido Agregado Exitosamente");
      handleClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error al subir el archivo. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Archivos de Texto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDescripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control type="text" value={descripcion} onChange={handleDescripcionChange} />
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>Seleccionar archivo de texto</Form.Label>
            <Form.Control type="file"  onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
          Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarArchivosTexto;