import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/src/components/ArtworkCardDetail';

export default function ArtworkById() {
    const router = useRouter();

    // getting object id from the route
    const { objectID } = router.query;

    return (
        <>
            <Row>
                <Col className='artByID'>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>

        </>
    );
}