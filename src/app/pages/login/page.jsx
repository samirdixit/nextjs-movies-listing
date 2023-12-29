"use client";

import React, { useState } from "react";
import Section from "@/app/components/utils/Section/Section";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/app/schema";
import { login_handler } from "../../services/loginService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login_handler(data);
      if (response.status_code === 200) {
        localStorage.setItem("auth-token", response.payload.token);
        toast.success("Logged in successfully!");
        router.push("/pages/movies");
        setError(false);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setError(true);
      console.error("Login failed:", error);
      toast.error("Invalid credentials!");
    }
  };

  return (
    <>
      <Section className="bg-wave d-flex flex-wrap justify-content-center align-content-center py-5 min-vh-100">
        <Container>
          <Row>
            <Col>
              <div className="text-center d-table mx-auto w-100 max-w-300">
                <h1 className="fw-bold mb-4 mb-md-5">Sign In</h1>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* ... (form fields) */}
                  <Form.Group className="mb-4">
                    <Form.Control
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      className={(errors.email || error) && "form-error"}
                    />

                    {errors.email && (
                      <Form.Text as="div" className="form-text-error">
                        {errors.email?.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control
                      {...register("password")}
                      type="password"
                      placeholder="Password"
                      className={(errors.password || error) && "form-error"}
                    />

                    {errors.password && (
                      <Form.Text as="div" className="form-text-error">
                        {errors.password?.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="fs-sm mb-4" controlId="formRememberMe">
                    <Form.Check
                      className="d-table mx-auto mb-0"
                      type="checkbox"
                      label="Remember Me"
                    />
                  </Form.Group>
                  <Button
                    className="w-100"
                    variant="primary btn-lg"
                    type="submit"
                  >
                    Login{" "}
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
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Section>
    </>
  );
};

export default Login;
