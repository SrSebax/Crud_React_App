import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  FormGroup,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import image from "./personajes.png";
import {
  faPenToSquare,
  faStar,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const data = [
  { id: 1, personaje: "Jefe Maestro", videojuego: "Halo" },
  { id: 2, personaje: "Lara Croft", videojuego: "Tomb Raider" },
  { id: 3, personaje: "Ezio Auditore", videojuego: "Assassins Creed" },
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      personaje: "",
      videojuego: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  insertar = () => {
    const valorNuevo = {
      ...this.state.form,
      id: this.state.data.length + 1,
    };
    const lista = [...this.state.data, valorNuevo];
    this.setState({ data: lista, modalInsertar: false });
  };

  editar = (dato) => {
    const index = this.state.data.findIndex(
      (elemento) => elemento.id === dato.id
    );
    if (index !== -1) {
      const lista = [...this.state.data];
      lista[index] = Object.assign({}, dato);
      this.setState({ data: lista, modalEditar: false });
    }
  };

  eliminar = (dato) => {
    const opcion = window.confirm(
      "Realmente desea eliminar el personaje: " + dato.personaje
    );
    if (opcion) {
      const lista = this.state.data.filter(
        (elemento) => elemento.id !== dato.id
      );
      this.setState({ data: lista });
    }
  };

  render() {
    const { form, data, modalInsertar, modalEditar } = this.state;

    return (
      <div>
        <Container>
          <div className="image-section">
            <img src={image} alt="image" className="image" />
            <Button color="success" onClick={this.mostrarModalInsertar}>
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              Insertar Nuevo Personaje
              <FontAwesomeIcon icon={faStar} className="star-icon" />
            </Button>
          </div>

          <Table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Personaje</th>
                <th>Videojuego</th>
                <th>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </th>
                <th>
                  <FontAwesomeIcon icon={faTrashCan} />
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.videojuego}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalEditar(elemento)}
                    >
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => this.eliminar(elemento)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* AGREGAR */}
        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Personaje</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Videojuego:</label>
              <input
                className="form-control"
                name="videojuego"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              Insertar
            </Button>{" "}
            <Button color="danger" onClick={this.ocultarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* EDITAR */}
        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Personaje</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={form.personaje}
              />
            </FormGroup>

            <FormGroup>
              <label>Videojuego:</label>
              <input
                className="form-control"
                name="videojuego"
                type="text"
                onChange={this.handleChange}
                value={form.videojuego}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(form)}>
              Editar
            </Button>{" "}
            <Button color="danger" onClick={this.ocultarModalEditar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
