import './css/Section.css';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import arrowDown from './assets/caret-down-fill.svg';
import arrowUp from './assets/caret-up-fill.svg';

import expandJson from './json/expand.json'

interface Props {
    children?: React.ReactNode,
    sectionId: string,
    eventKey: string
}

function SectionToggle(props: Props) {
    const expanded = expandJson.data.includes(props.sectionId);

    const decoratedOnClick = useAccordionButton(props.eventKey, () => {
        if (expanded) {
            var index = expandJson.data.indexOf(props.sectionId);
            if (index != 1) {
                expandJson.data.splice(index, 1);
            }
            console.log('collapse ' + props.sectionId);
        }
        else {

            expandJson.data.push(props.sectionId);
            console.log('expand ' + props.sectionId)
        }
    });

    return (
        <button
            type="button"
            onClick={decoratedOnClick}
            className='accordion-toggle w-100'
        >
            <table>
                <tbody>
                    <tr>
                        <td className='title-column'><span>{props.children}</span></td>
                        <td className='arrow-column'><span className='arrow'><img src={expanded ? arrowUp : arrowDown} alt="" /></span></td>
                    </tr>
                </tbody>
            </table>
        </button>
    );
}

export default SectionToggle;