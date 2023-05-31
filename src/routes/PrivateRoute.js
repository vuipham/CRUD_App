import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";

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

  return <>{props.children}</>;
};

export default PrivateRoute;
