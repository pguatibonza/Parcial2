import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function Login(){
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
            if (data.status==="success"){
              navigate('/cafes');
            }
            else{
              alert("Usuario o clave incorrectos");
            } 

            })
            .catch(error => {
            // Manejar cualquier error que ocurra durante la solicitud aquí
            console.error(error);
            });

            
            
            
    };
        return (
          
          <div  >
            <h2 style={estilo}>El aroma magico</h2>
            <div>
              <hr ></hr>
              <img classname="Imagen"src={process.env.PUBLIC_URL+'/cafe.png'} alt="cafe" ></img>
            </div>
            <p></p>

            <div className='container'>
            <form className='my-form' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Usuario:
                <input type="text" value={login} className="form-control" onChange={handleUsuarioChange} />
              </label>
              </div>
              <br />
              <div className="mb-3">
                  <label className="form-label">
                    Clave:
                    <input type="password" value={password}  className="form-control" onChange={handleClaveChange} />
                  </label>
              </div>
              
              <br />
              <button type="submit" className='"btn btn-primary"'>Iniciar sesión</button>
              {respuesta && (
                <div>
                    <p>Message: {respuesta.message}</p>
                </div>
                )}
            </form>

            
            
            </div>
            
           
          </div>
          
        );
      }
export default Login;