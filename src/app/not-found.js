"use client";

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Section from "./components/utils/Section/Section";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Section className="bg-wave d-flex flex-wrap align-content-center flex-grow-1 pt-2 pb-5 w-100">
        <Container>
          <Row>
            <Col className="page-not-found text-center">
              <h1 className="fw-semibold">404</h1>
              <h4>Opps! Page Not Found.</h4>
              <Button
                variant="primary"
                className="btn-lg px-5 mt-5"
                onClick={() => router.push("/pages/movies")}
              >
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      </Section>
    </div>
  );
}
