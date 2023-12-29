"use client";
import React, { useEffect, useRef, useState } from "react";
import { schemaAdd } from "@/app/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { toast } from "react-toastify";
import { Button, Col, Form, Row } from "react-bootstrap";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iconDownload from "@/app/assets/images/icon-download.svg";
import { createMovie, editMovie } from "../../services/movieService";

const AddEditMovie = ({
  button,
  add,
  setAdd,
  edit,
  setEdit,
  is_edit,
  editData,
}) => {
  const [frontFile, setFrontFile] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (edit) {
      setValue("title", editData.title);
      setValue("image", editData.image);
      setValue("id", editData.id);
      const formattedYear = moment(
        `${editData.publishing_year}`,
        "YYYY"
      ).toDate();
      setValue("publishing_year", formattedYear ?? 2010);
      setImage(editData.image);
    }
  }, [edit]);

  // imge upload
  const frontInputRef = useRef(null);

  function frontHandleUpload(event) {
    setValue("image", event.target.files[0]);
    setImage(event.target.files[0]);
    setFrontFile(true);
  }

  const FrontImageThumb = ({ image }) => {
    return (
      <div className="file-img-box w-100 h-100 position-absolute top-0 start-0">
        {image && (
          <Image
            className="w-100 h-100 object-fit-cover"
            src={frontFile ? URL.createObjectURL(image) : editData.image}
            alt={image?.name ?? "image"}
            width={1000}
            height={1000}
          />
        )}
      </div>
    );
  };

  // react-hook-form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaAdd),
  });

  const onSubmit = async (data) => {
    if (!frontFile) {
      data.image = null;
    }
    const year = moment(data.publishing_year).format("YYYY");
    data.publishing_year = year;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (!edit) {
      const response = await createMovie(formData);
      if (response.status_code == 200) {
        toast.success("Movie added successfully !!");
        setAdd(false);
        setEdit(false);
      } else {
        toast.error("Failed to create movie !!");
      }
    } else {
      const response = await editMovie(data);
      if (response.status_code == 200) {
        toast.success("Movie Updated successfully !!");
        setAdd(false);
        setEdit(false);
      } else {
        toast.error("Failed to Update movie !!");
      }
    }
  };

  // handle Cancel
  const handleCancel = () => {
    setAdd(false);
    setEdit(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-50000">
        <Row>
          <Col md={6} lg={5}>
            <Form.Group className="file-wrapper d-flex flex-wrap justify-content-center align-content-center mb-4 mb-md-0 border-2 overflow-hidden">
              <Form.Control
                {...register("image")}
                type="file"
                accept=".jpg, .png"
                ref={frontInputRef}
                onChange={frontHandleUpload}
                className="opacity-0 w-100 h-100 position-absolute top-0 start-0 z-1"
                title=""
              />
              <Image src={iconDownload} alt="" />
              <Form.Text className="justify-content-center text-center">
                Drop an image here
              </Form.Text>
              {(frontFile || edit) && <FrontImageThumb image={image} />}
            </Form.Group>
          </Col>
          <Col md={6} lg={6} className="offset-lg-1">
            <Col lg={10} xl={7}>
              <Form.Group className="mb-4">
                <Form.Control
                  {...register("title")}
                  type="text"
                  placeholder="Title"
                  className={errors.title && "form-error"}
                />
                {errors.title && (
                  <Form.Text as="div" className="form-text-error">
                    {errors.title?.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Controller
                  control={control}
                  name="publishing_year"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      showYearPicker
                      dateFormat="yyyy"
                      placeholderText="Publishing Year"
                      className={`form-control ${errors.title && "form-error"}`}
                    />
                  )}
                />
                {errors.publishing_year && (
                  <Form.Text as="div" className="form-text-error">
                    {errors.publishing_year?.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Row className="row-col-2">
                <Col>
                  <Button
                    className="btn-lg w-100"
                    variant="outline-light"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="btn-lg w-100"
                    variant="primary"
                    type="submit"
                  >
                    {/* {isSubmitting && edit ? "Updating..." : button} */}
                    {isSubmitting && edit
                      ? "Updating..."
                      : isSubmitting && !edit
                      ? "Submitting..."
                      : button}
                    {/* {isSubmitting && !edit ? "Submitting..." : button} */}
                    {isSubmitting && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                        className="icon-spin spin ms-2"
                      >
                        <path
                          fill="#ffffff"
                          d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                        />
                      </svg>
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddEditMovie;
