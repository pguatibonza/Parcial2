import Card from "react-bootstrap/Card";

function Cafe(props){
    return (
        <Card style={{ width: "18rem", height: "24rem" }} className="mb-3">
            <Card.Img
                style={{ height: "14rem" }}
                variant="top"
                src={process.env.PUBLIC_URL+'/logo512.png'}
                alt={props.cafe.id}
            />
            <Card.Body>
                <Card.Title>
                    {props.cafe.nombre}
                </Card.Title>

                <Card.Text>
                    {props.cafe.tipo}
                </Card.Text>
            </Card.Body>
            </Card>
    );
}
export default Cafe;