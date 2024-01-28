import { Card } from "react-bootstrap";

import facebook from './assets/facebook.svg';
import youtube from './assets/youtube.svg';

function About() {
    return (
        <>
            <Card>
                <Card.Header as='h6'><span className="fixed-title">About</span></Card.Header>
                <Card.Body>
                    <Card.Text><strong>Address:</strong> Vinhomes Ocean Park, Gia Lam District, Hanoi</Card.Text>
                    <Card.Text><strong>Email:</strong> registrar@vinuni.edu.vn</Card.Text>
                    <Card.Link href="https://www.facebook.com/vinuniversity/"><img width='24' src={facebook}/></Card.Link>
                    <Card.Link href="https://www.youtube.com/channel/UC-XZodYpSIIogum4QqbENAA"><img width='24' src={youtube}/></Card.Link>
                </Card.Body>
            </Card>
        </>
    );
}

export default About;