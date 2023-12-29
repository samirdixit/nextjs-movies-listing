import React from "react";
import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import Logout from "../Logout/Logout";
import iconAdd from "@/app/assets/images/icon-add.svg";

const Header = ({ add, setAdd, edit }) => {
  return (
    <>
      <header className="py-4 w-100">
        <Container>
          <Row>
            <Col className="d-flex flex-wrap111 justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h2 className="fw-semibold mb-0">
                  {add && "Create a new movie"}
                  {edit && "Edit"}
                  {!add && !edit && "My Movies"}
                </h2>

                {!add && !edit && (
                  <Button
                    variant="link"
                    className="fw-semibold text-decoration-none p-0"
                    onClick={() => setAdd(true)}
                  >
                    <Image
                      src={iconAdd}
                      width={32}
                      height={32}
                      alt="icon-add"
                      className="ms-2 mt-1 mt-xl-2"
                    />
                  </Button>
                )}
              </div>

              <Logout />
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
