import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import './css/Section.css';

import expandJson from './json/expand.json'

interface Props {
    children?: React.ReactNode,
    sectionId: string,
    eventKey: string
}

function SectionToggle(props: Props) {
    var expanded = expandJson.data.includes(props.sectionId);

    const decoratedOnClick = useAccordionButton(props.eventKey, () => {
        if (expanded) {
            var index = expandJson.data.indexOf(props.sectionId);
            if (index != 1) {
                expandJson.data.splice(index, 1);
            }
        }
        else {
            expandJson.data.push(props.sectionId);
        }
    });

    return (
        <button
            type="button"
            onClick={decoratedOnClick}
            className='accordion-toggle w-100'
        >
            <span>{props.children}</span>
        </button>
    );
}

export default SectionToggle;