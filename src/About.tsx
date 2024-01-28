import { Card } from "react-bootstrap";

function About() {
    return (
        <>
            <Card>
                <Card.Header as='h6'><span className="fixed-title">About</span></Card.Header>
                <Card.Body>
                    <Card.Text><strong>Address:</strong> Vinhomes Ocean Park, Gia Lam District, Hanoi</Card.Text>
                    <Card.Text><strong>Email:</strong> info@vinuni.edu.vn</Card.Text>
                    <Card.Text><strong>Phone:</strong> 18008189</Card.Text>
                    <Card.Link href="https://www.facebook.com/vinuniversity/">Facebook</Card.Link>
                    <Card.Link href="https://www.youtube.com/channel/UC-XZodYpSIIogum4QqbENAA">YouTube</Card.Link>
                </Card.Body>
            </Card>
        </>
    );
}

export default About;