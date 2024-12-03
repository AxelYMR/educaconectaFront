import React from 'react';
import './SidebarNotificaciones.css';

function SidebarNotificaciones({ notificaciones }) {
  return (
    <div className="sidebar">
        <br/>
        <br/>
      <h4 className='colorTxt'>Notificaciones</h4>
      {notificaciones.length === 0 ? (
        <p className='colorTxt'>No hay notificaciones</p>
      ) : (
        notificaciones.map(notificacion => (
          <div key={notificacion.id} className="notificacion colorTxt">
            <h5 className='colorTxt'>{notificacion.titulo}</h5>
            <p className='colorTxt'>{notificacion.mensaje}</p>
            <p><small>{new Date(notificacion.fecha).toLocaleString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
}

export default SidebarNotificaciones;