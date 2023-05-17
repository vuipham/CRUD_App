import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./components/Header.js";
import TableUsers from "./components/TableUsers.js";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <TableUsers />
      </Container>
    </div>
  );
}

export default App;
