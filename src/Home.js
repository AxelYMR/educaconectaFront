import React from 'react';
import './LoginU.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './commons/Header';
import Footer from './commons/Footer';

function Home() { //En este componente se definen las variables.

  return (

    <div className="background">
      <div className='navbar navbar-light header-container'> 
        <Header/>
      </div>
      <br/> 
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;