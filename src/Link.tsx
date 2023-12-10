import Container from 'react-bootstrap/Container';

import './css/Link.css';

interface Props {
    name?: string,
    url?: string
}

function Link(props: Props) {
    return (
        <Container className='link link-default'>
            <a href={props.url} target="_blank">
                <p className='hanging mb-0 link-overflow'>{props.name}</p>
            </a>
        </Container>
    );
}

export default Link;