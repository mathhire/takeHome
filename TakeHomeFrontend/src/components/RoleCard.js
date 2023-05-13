import { Col } from "react-bootstrap";
import { useNavigate } from "react-router";

import "../pages/User/Homepage/Role/role.css";
const RoleCard = ({ heading, description, imgSrc, logout }) => {
  const navigate = useNavigate();

  return <Col xs={12} sm={6} md={3}></Col>;
};

//animation

const imgVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: 1,
      easing: "easeInOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 1,
      easing: "easeInOut",
    },
  },
};

export default RoleCard;
