import Card from 'react-bootstrap/Card';

import Link from './Link';


function SectionFrequent() {

    return (
    <>
        <Card>
            <Card.Header as='h6'>Most-visited Links</Card.Header>
            <Card.Body>
                <Link name='Example Link 1'></Link>
                <Link name='Example Link 2'></Link>
                <Link name='Example Link 3'></Link>
                <Link name='Example Link 4'></Link>
                <Link name='Example Link 5'></Link>
                <Link name='Example Link 6'></Link>
            </Card.Body>
        </Card>
    </>
    );
}

export default SectionFrequent;