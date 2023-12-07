import Card from 'react-bootstrap/Card';

import Link from './Link';


function Frequent() {

    return (
    <>
        <Card>
            <Card.Header as='h6'>Most-visited Links</Card.Header>
            <Card.Body>
                <Link name='Example Link 1' url='/'></Link>
                <Link name='Example Link 2' url='/'></Link>
                <Link name='Example Link 3' url='/'></Link>
                <Link name='Example Link 4' url='/'></Link>
                <Link name='Example Link 5' url='/'></Link>
                <Link name='Example Link 6' url='/'></Link>
            </Card.Body>
        </Card>
    </>
    );
}

export default Frequent;