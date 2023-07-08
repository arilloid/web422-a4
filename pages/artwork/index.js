import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import {Row, Col, Pagination} from 'react-bootstrap';
import ArtworkCard from '@/src/components/ArtworkCard';

const PER_PAGE = 12;

export default function Artwork(){
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    
    // setting the state values
    const [page, setPage] = useState(1);
    const [artworkList, setArtworkList] = useState([]);

    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    const previousPage = () => {
        page > 1 && setPage((prevPage) => prevPage - 1);;
    };
    const nextPage = () => {
        page < artworkList.length && setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (data) {
            const results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
              }
              
              setArtworkList(results); 
              setPage(1);             
        }
    }, [data]);

    if (error){
        console.log(`Request Failed: (... ${error})`);
        return <Error statusCode={404}/>;
    } 
    else if(!data || !artworkList){
        console.log("The SWR request didn't return anything");
        return null;
    }
    console.log(artworkList);
    return (
        <>
            <Row className="gy-4">
                {artworkList.length > 0 ? 
                (artworkList[page - 1].map((currentObjectID) => 
                    (<Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>)
                ))
                  : <h4>Nothing Here</h4>}
            </Row>
            <br/><br/> 
            {artworkList.length > 0 && 
            <Row>
                <Col>
                <Pagination>
                    <Pagination.Prev onClick={previousPage}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage}/>
                </Pagination>
                </Col>
            </Row>}
        </>
    );
}