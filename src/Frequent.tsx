import Card from 'react-bootstrap/Card';

import Link from './Link';

import frequentJson from './json/frequent.json';
import linksJson from './json/links.json';
import './css/Frequent.css';

function getLink(sectionId: string, linkId: string): {linkId: string, linkName: string, url: string} {
    var section = linksJson.data.filter((section) => section.sectionId == sectionId)[0];
    if (section == undefined) {
        return {linkId: linkId, linkName: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    var link = section.sectionLinks.filter((link) => link.linkId == linkId)[0];
    if (link == undefined) {
        return {linkId: linkId, linkName: '<<LINK DOES NOT EXIST>>', url: '/'}
    }

    return link;
}

function Frequent() {

    return (
    <>
        <Card>
            <Card.Header as='h6'>Most-visited Links</Card.Header>
            <Card.Body>
                <ol className='mb-0'>
                    {frequentJson.data.map((frequent) => {
                        var link = getLink(frequent[0], frequent[1]);
                        return(<li key={'link' + frequent[1] + 'section' + frequent[0]}><Link name={link.linkName} url={link.url}></Link></li>);
                    })}
                    
                </ol>
            </Card.Body>
        </Card>
    </>
    );
}

export default Frequent;