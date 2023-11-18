import Container from 'react-bootstrap/Container';

interface Props {
    name?: string,
    target?: string,
}

function Link(props: Props) {
    return (
        <Container>
            <a href={props.target == null ? "/" : props.target}>{props.name}</a>
        </Container>
    );
}

export default Link;