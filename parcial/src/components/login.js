import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { FormattedMessage } from 'react-intl';

function Login() {
  const estilo = {
    fontFamily: 'Indie Flower, cursive',
  };
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [respuesta, setRespuesta] = useState(null);
  const navigate = useNavigate();


  const handleUsuarioChange = (event) => {
    setLogin(event.target.value);
  };

  const handleClaveChange = (event) => {
    setPassword(event.target.value);
  };

  const dataJSON = {
    login: login,
    password: password
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataJSON)
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta de la solicitud aquí
        setRespuesta(data);
        if (data.status === "success") {
          navigate('/cafes');
        }
        else {
          alert("Usuario o clave incorrectos");
        }

      })
      .catch(error => {
        // Manejar cualquier error que ocurra durante la solicitud aquí
        console.error(error);
      });
  };
  return (

    <div >
      <h2 style={estilo}>El aroma mágico</h2>
      <div style={{ width: '100%' }}>
        <hr ></hr>
        <img className='imagen' src={process.env.PUBLIC_URL + '/cafe.png'} alt="cafe" ></img>
        <hr ></hr>
      </div>
      <p></p>

      <div className='container'>
        <p className='inicio-sesion'><strong> {<FormattedMessage id="Login"/>}</strong></p>
        <form className='my-form' onSubmit={handleSubmit}>
          <div className='margenes'>
            <div className="mb-3">
              <label className="form-label campo">
                <strong> {<FormattedMessage id="Username"/>} : </strong>
                <input type="text" value={login} className="form-control input " onChange={handleUsuarioChange} />
              </label>
            </div>
            <br />
            <div className="mb-3">
              <label className="form-label campo">
                <strong>{<FormattedMessage id="Password"/>} : </strong>
                <input type="password" value={password} className="form-control input " onChange={handleClaveChange} />
              </label>
            </div>

            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={{ backgroundColor: '#8FA98F' }} type="submit" className='"btn btn-primary boton verde"'><strong>{<FormattedMessage id="login"/>}  </strong></button>
              <button style={{ backgroundColor: '#E75D5D' }} type='reset' className='"btn btn-primary boton rojo"'><strong> {<FormattedMessage id="Cancel"/>}</strong></button>
            </div>

            {respuesta && respuesta.status==="error" && (
              <div>
                <p className='error'><strong> {<FormattedMessage id="Error"/>}</strong></p>
              </div>
            )}

          </div>


        </form>


           
        
      </div>


    </div>

  );
}
export default Login;