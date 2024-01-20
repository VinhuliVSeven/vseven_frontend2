import Card from 'react-bootstrap/Card';

import Link from './Link';

import './css/Frequent.css';

interface Props {
    links: {
        linkId: string,
        linkName: string,
        url: string
    } []
}

function Frequent(props: Props) {

    return (
    <>
        <Card>
            <Card.Header as='h6'>Most-visited Links</Card.Header>
            <Card.Body>
                <ol className='mb-0'>
                    {props.links.map((link) => {
                        return(<li key={'link' + link.linkId + 'frequent'}><Link name={link.linkName} url={link.url}></Link></li>);
                    })}
                    
                </ol>
            </Card.Body>
        </Card>
    </>
    );
}

export default Frequent;