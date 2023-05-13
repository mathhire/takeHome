import { React } from "react";
import { Button, Container, Form, Spinner, Row, Col } from "react-bootstrap";

import { FloatingInput } from "components";

const JobForm = ({
  errors,
  handleChange,
  handleSubmit,
  values,
  handleBlur,
  isLoading,
  hasCompanyData,
}) => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h2>Post Resource Here</h2>
            <Form onSubmit={handleSubmit}>
              <FloatingInput
                controlId="name"
                label="Name"
                type="text"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.name}
              />

              <FloatingInput
                controlId="year"
                label="Year"
                type="text"
                name="year"
                placeholder="year"
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.year}
              />
              <FloatingInput
                controlId="color"
                label="Color"
                type="text"
                name="color"
                value={values.color}
                placeholder="Color"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.color}
              />
              <FloatingInput
                controlId=""
                label="Pantone Value"
                type="text"
                name="pantone_value"
                value={values.pantone_value}
                placeholder="Pantone Value"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.pantone_value}
              />

              <Button
                variant="primary"
                type="submit"
                className="d-flex justify-content-center align-items-center align-self-center w-100 p-3 mb-3"
              >
                Post Resource{" "}
                {isLoading && <Spinner animation="border" role="status" />}
              </Button>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default JobForm;
