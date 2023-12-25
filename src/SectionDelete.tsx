import { Button } from "react-bootstrap";

interface Props {

}

function SectionDelete(props: Props) {
    return (
        <>
            <Button className='small-text' variant='danger'>Delete Section</Button>
        </>
    )
}

export default SectionDelete;