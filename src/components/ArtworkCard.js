import React from 'react';
import useSWR from 'swr';
import {Card, Button} from 'react-bootstrap';
import Error from 'next/error';
import Link from 'next/link';

export default function ArtworkCard({objectID}){
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error){
        console.log(`Request Failed :(... ${error})`);
        return <Error statusCode={404}/>;
    } 
    else if(!data){
        console.log("The SWR request didn't return anything");
        return null;
    }
    console.log(data);
    return (
        <>
           <Card className='h-100'>
                <Card.Img variant="top" height='80%'
                src={data.primaryImageSmall ? data.primaryImageSmall : 
                'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />
                <Card.Body>
                    <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                    <Card.Text>
                        Date: {data.objectDate ? data.objectDate : "N/A"}<br/>
                        Classification: {data.classification ? data.classification : "N/A"}<br/>
                        Medium: {data.medium ? data.medium : "N/A"}<br/>
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref><Button variant="primary">{objectID}</Button></Link>
                </Card.Body>
           </Card>
        </>
    );
}