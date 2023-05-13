/* eslint-disable react-hooks/exhaustive-deps */

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Swal from "sweetalert2";

import { allResources, deleteResourcesByID } from "api/Blog";

import { UseLoadingHook } from "hooks";
import { DeleteRequest, getRequest, putRequest } from "services/apiClient";

const AllResources = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const [resources, setResources] = useState([]);
  const handleResources = async () => {
    const withJWT = true;

    enableLoading();
    try {
      const {
        data: { resources },
      } = await getRequest(allResources(), withJWT);
      setResources(resources);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const navigateToEdit = (id) => {
  //   navigate(`/user/editjob/${id}`);
  // };
  const deleteResource = (id, index) => {
    Swal.fire({
      title: "Do you want to Delete the resource?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const withJWT = true;

        try {
          DeleteRequest(deleteResourcesByID(id), withJWT);
          resources.splice(index, -1);
          setResources(resources);
          window.location.reload();
        } catch (e) {}
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Pantone Value </TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resources?.map((item, index) => (
                  <TableRow key={index}>
                    {" "}
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.pantone_value}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => deleteResource(item._id, index)}
                      >
                        Delete{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllResources;
