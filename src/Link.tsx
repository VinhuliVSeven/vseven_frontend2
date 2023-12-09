import Container from 'react-bootstrap/Container';

import './css/Link.css';

interface Props {
    name?: string,
    url?: string
}

function Link(props: Props) {
    return (
        <Container className='link link-default'>
            <a href={props.url}>
                <p className='hanging mb-0'>{props.name}</p>
            </a>
        </Container>
    );
}

export default Link;