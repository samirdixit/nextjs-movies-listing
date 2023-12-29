import React from "react";
import { Button, Card } from "react-bootstrap";
import Image from "next/image";
import imgPlaceholder from "@/app/assets/images/img-placeholder.png";
import iconEdit from "@/app/assets/images/icon-edit.svg";

const MovieCard = ({
  title,
  publishing_year,
  image,
  edit,
  setEdit,
  setEditData,
  id,
}) => {
  const editHandler = () => {
    setEdit(true);
    setEditData({ id, title, publishing_year, image });
  };

  return (
    <>
      <Card className="card p-md-2 border-0 w-100 h-100 overflow-hidden transition">
        <Card.Header className="card-header bg-transparent p-0 border-0 rounded-0">
          {image === "undefined" || !image ? (
            <Image
              src={imgPlaceholder}
              alt=""
              className="w-100 object-fit-cover rounded-3"
              width={500}
              height={500}
            />
          ) : (
            <Image
              src={image}
              alt=""
              className="w-100 object-fit-cover rounded-3"
              width={500}
              height={500}
            />
          )}
        </Card.Header>
        <Card.Body className="px-3 pt-3 pb-3 pb-md-1 mx-md-n2">
          <Card.Title as="h5" className="fw-medium mb-2">
            {title}
          </Card.Title>
          <Card.Text
            as="div"
            className="fs-sm d-flex justify-content-between align-items-center"
          >
            <span>{publishing_year}</span>
            <Button
              variant="link"
              className="lh-1 edit p-0"
              onClick={() => editHandler()}
            >
              <Image src={iconEdit} alt="" className="" />
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieCard;
