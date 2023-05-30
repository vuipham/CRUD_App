import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./components/Header.js";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
