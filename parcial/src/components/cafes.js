import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cafe from "./cafe";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <h2 style={estilo}>El aroma magico</h2>
            
              <hr ></hr>
              <img classname="Imagen"src={process.env.PUBLIC_URL+'/cafe.png'} alt="cafe" ></img>
            
            <p></p>
            <div className="row">
                <div className="col-md-6">
                    <table className="table table-bordered table-striped table-hove">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Region</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cafes.map(objeto => (
                                <tr key={objeto.id}
                                    onClick={()=>handleCafeClick(objeto.id)}>
                                    <td>{objeto.id}</td>
                                    <td>{objeto.nombre}</td>
                                    <td>{objeto.tipo}</td>
                                    <td>{objeto.region}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    {selectedCafe && (
                        <Card>
                            <Card.Title>{selectedCafe.nombre}</Card.Title>
                            <Card.Text> {selectedCafe.fecha_cultivo}</Card.Text>
                            <Card.Img variant="top" src={selectedCafe.imagen} />
                            <Card.Body>
                                <Card.Text>
                                    Notas 
                                    <br/>
                                    { selectedCafe.notas}
                                </Card.Text>
                                <Card.Text>
                                <strong>Cultivado a una altura de {selectedCafe.altura} msnm</strong> 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Cafes;