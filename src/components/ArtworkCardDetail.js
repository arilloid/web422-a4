import React from 'react';
import useSWR from 'swr';
import {Card, Button} from 'react-bootstrap';
import Error from 'next/error';
import Link from 'next/link';

export default function ArtworkCardDetail({objectID}){
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error){
        console.log(`Request Failed :(... ${error})`);
        return <Error statusCode={404}/>;
    } 
    else if(!data || data.length === 0){
        console.log("The SWR request didn't return anything");
        return null;
    }

    return (
        <>
           <Card>
                <Card.Img variant="top" 
                src={data.primaryImage ? data.primaryImage : 
                'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />
                <Card.Body>
                    <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                    <Card.Text>
                        Date: {data.objectDate ? data.objectDate : "N/A"}<br/>
                        Classification: {data.classification ? data.classification : "N/A"}<br/>
                        Medium: {data.medium ? data.medium : "N/A"}<br/><br/>
                        Artist Name: {data.artistDisplayName ? data.artistDisplayName : "N/A"}<br/>
                        Credit: {data.creditLine ? data.creditLine : "N/A"}<br/>
                        Dimensions: {data.dimensions ? data.dimensions : "N/A"}<br/>
                        {data.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >Wikipedia Page</a>}
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref><Button variant="primary">{objectID}</Button></Link>
                </Card.Body>
           </Card>
        </>
    );
}