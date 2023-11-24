import Container from 'react-bootstrap/Container';

import './Link.css'

interface Props {
    name?: string,
    target?: string,
}

function Link(props: Props) {

    return (
        <Container>
            <a href={props.target == null || props.target == '' ? '/' : props.target}>
                <p className='hanging mb-0'>{props.name}</p>
            </a>
        </Container>
    );
}

export default Link;