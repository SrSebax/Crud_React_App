import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista[contador].personaje = dato.personaje;
        lista[contador].videojuego = dato.videojuego;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Realmente desea eliminar el personaje: " + dato.personaje
    );
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (registro.id == dato.id) {
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: lista });
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar Nuevo Personaje
          </Button>

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Personaje</th>
                <th>Videojuego</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.videojuego}</td>
                  <td>
                    <Button
                      color="outline-primary"
                      onClick={() => this.mostrarModalEditar(elemento)}
                    >
                      Editar
                    </Button>
                    {"  "}
                    <Button
                      color="outline-danger"
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
        <Modal isOpen={this.state.modalInsertar}>
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
                value={this.state.data.length + 1}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>Videojuego:</label>
              <input
                className="form-control"
                name="videojuego"
                type="text"
                onChange={this.handleChange}
              ></input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button color="danger" onClick={() => this.ocultarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* EDITAR */}
        <Modal isOpen={this.state.modalEditar}>
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
                value={this.state.form.id}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              ></input>
            </FormGroup>

            <FormGroup>
              <label>Videojuego:</label>
              <input
                className="form-control"
                name="videojuego"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.videojuego}
              ></input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.ocultarModalEditar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
