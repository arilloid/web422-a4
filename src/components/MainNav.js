import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function MainNav() {
    const router = useRouter();
    const [artworkTitle, setArtworkTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(artworkTitle.trim() === '')) {
            router.push(`/artwork?title=true&q=${artworkTitle}`);
        }
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Arina Kolodeznikova</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
                            <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={artworkTitle}
                            onChange={(e) => { setArtworkTitle(e.target.value) }}
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
            <br/>
        </>
    );
}