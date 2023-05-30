import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);
  if (user.auth === false) {
    return (
      <>
        <Alert variant="danger" className="mt-5">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You need permission to access this route.</p>
        </Alert>
      </>
    );
  }

  console.log(user);
  return <>{props.children}</>;
};

export default PrivateRoute;
