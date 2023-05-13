import { useFormik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import JobForm from "./form";

import { addResource } from "api/Blog";

import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "services/apiClient";

const InitialValues = {
  name: "",
  year: "",
  color: "",
  pantone_value: "",
};

const JobPost = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();

  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      await postRequest(addResource(), values, withJWT);
      Swal.fire({
        text: "Resource Added Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
      navigate("/user/viewjob");
    } catch (e) {
      disableLoading();
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: InitialValues,
    onSubmit: (values) => {
      console.log("submitted values: ", values);
      handleJob(values);
    },
  });

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <JobForm
              handleSubmit={formik.handleSubmit}
              errors={formik.errors}
              values={formik.values}
              isLoading={isLoading}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobPost;
