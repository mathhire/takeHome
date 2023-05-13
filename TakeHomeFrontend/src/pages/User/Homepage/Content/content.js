import { Button, Col, Container, Row } from "react-bootstrap";

import { FloatingInput } from "components";

const ContentSection = () => {
  return (
    <>
      <Container fluid="md" className="mb-3">
        <h3>Take Home </h3>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.{" "}
        </p>
      </Container>
    </>
  );
};

export default ContentSection;
