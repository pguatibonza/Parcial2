import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { FormattedMessage ,FormattedDate} from 'react-intl';
const { useEffect, useState } = require("react");


function Cafes() {
    const estilo = {
        fontFamily: 'Indie Flower, cursive',
    };
    const [cafes, setCafes] = useState([]);
    const [selectedCafe, setSelectedCafe] = useState(null); // [1
    const URL = 'http://localhost:3001/cafes';
    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                setCafes(data);
            });
    }, []);
    console.log(cafes);


    const handleCafeClick = (id) => {
        fetch(`${URL}/${id}`)
            .then(response => response.json())
            .then(data => {
                setSelectedCafe(data);
            })
            .catch(error => {
                console.error('Error al obtener los datos del café:', error);
            });
    };




    return (

        <div className="container">
            <h2 style={estilo}>El aroma mágico</h2>
            <div style={{ width: '100%' }}>
                <hr ></hr>
                <img className='imagen' src={process.env.PUBLIC_URL + '/cafe.png'} alt="cafe" ></img>
                <hr ></hr>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-8">
                    <table className="table table-bordered table-hove">
                        <thead className="tabla">
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>{<FormattedMessage id="Name" />}</th>
                                <th scope='col'>{<FormattedMessage id="Type" />}</th>
                                <th scope='col'>{<FormattedMessage id="Region" />}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cafes.map(objeto => (
                                <tr key={objeto.id}
                                    onClick={() => handleCafeClick(objeto.id)}>
                                    <td>{objeto.id}</td>
                                    <td>{objeto.nombre}</td>
                                    <td>{objeto.tipo}</td>
                                    <td>{objeto.region}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    {selectedCafe && (
                        <Card className="card">
                            <Card.Title>{selectedCafe.nombre}</Card.Title>
                            <Card.Text>
                                <FormattedDate
                                    value={new Date(selectedCafe.fecha_cultivo)}
                                    year='numeric'
                                    month='numeric'
                                    day='numeric'
                                />
                                </Card.Text>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Card.Img
                                    variant="top"
                                    src={selectedCafe.imagen}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </div>
                            <Card.Body>
                                <Card.Text>
                                    {<FormattedMessage id="Notes" />}
                                    <br />
                                    {selectedCafe.notas}
                                </Card.Text>
                                <Card.Text>
                                    <strong>{<FormattedMessage id="Cultivated" />} {selectedCafe.altura}: {<FormattedMessage id="asl" />}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
            <br></br>
            <footer className='footer'>
                <p>Contact us: +57 3102105253 - info@elaromamagico.com - @elaromamagico</p>
            </footer>
        </div>


    );
}
export default Cafes;