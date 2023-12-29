"use client";

import React from "react";
import AddEditMovie from "@/app/components/AddEditMovie/AddEditMovie";
import Header from "@/app/components/Header/Header";
import Section from "@/app/components/utils/Section/Section";
import { Button, Col, Container, Row } from "react-bootstrap";

const NoMovie = () => {
  return (
    <>
      {/* <Header add={true} edit={false} /> */}
      <div className="d-flex flex-column min-vh-100">
        <Section className="bg-wave d-flex flex-wrap align-content-center flex-grow-1 pt-2 pb-5 w-100">
          <Container>
            <Row>
              <Col className="text-center w-100">
                <h2 className="fw-semibold mb-5">Your movie list is empty</h2>
                <Button
                  variant="primary"
                  className="btn-lg px-4"
                  // onClick={() => setAdd(true)}
                >
                  Add a new movie
                </Button>
              </Col>
            </Row>
          </Container>
        </Section>
      </div>
    </>
  );
};

export default NoMovie;
