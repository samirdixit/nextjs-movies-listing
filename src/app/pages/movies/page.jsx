"use client";

import React, { useEffect, useState } from "react";
import Section from "@/app/components/utils/Section/Section";
import { Container, Row } from "react-bootstrap";
import PaginatedItems from "@/app/components/PaginatedItems/PaginatedItems";
import AddEditMovie from "@/app/components/AddEditMovie/AddEditMovie";
import Header from "@/app/components/Header/Header";
import { useRouter } from "next/navigation";

const Movies = () => {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const router = useRouter();

  useEffect(() => {
    // Get the authentication token from localStorage
    const authToken = localStorage.getItem("auth-token");

    // Check if the token is available
    if (!authToken) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header add={add} setAdd={setAdd} edit={edit} />
        <Section className="bg-wave d-flex flex-wrap align-content-center flex-grow-1 pt-2 pb-5 w-100">
          <Container>
            {add || edit ? (
              <>
                <AddEditMovie
                  button={add ? "Submit" : "Update"}
                  add={add}
                  setAdd={setAdd}
                  edit={edit}
                  setEdit={setEdit}
                  editData={editData}
                  setEditData={setEditData}
                />
              </>
            ) : (
              <>
                <Row className="row-cols-2 row-cols-md-3 row-cols-xl-4">
                  <PaginatedItems
                    itemsPerPage={8}
                    edit={edit}
                    setEdit={setEdit}
                    setAdd={setAdd}
                    setEditData={setEditData}
                  />
                </Row>
              </>
            )}
          </Container>
        </Section>
      </div>
    </>
  );
};

export default Movies;
