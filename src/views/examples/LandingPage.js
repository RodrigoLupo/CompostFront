import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DarkFooter.js";
import Carousel from "../index-sections/Carousel"; // Ajustamos la ruta de importación

function LandingPage() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [rucDniOption, setRucDniOption] = useState("dni"); // Estado para seleccionar entre "ruc" o "dni"
  const [firstName, setFirstName] = useState("");
  const [rucDni, setRucDni] = useState("");
  const [email, setEmail] = useState("");

  const handleRucDniChange = () => {
    setRucDniOption(rucDniOption === "ruc" ? "dni" : "ruc");
    setRucDni(""); // Limpiar el campo al cambiar entre RUC y DNI
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos a través de tu lógica o servicio
    console.log({
      firstName,
      rucDni,
      email,
    });
  };

  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <LandingPageHeader />

        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">¿Qué es el compostaje?</h2>
                <h5 className="description">
                  El compostaje es un proceso natural donde los materiales
                  orgánicos como restos de comida y hojas se descomponen en un
                  material rico en nutrientes llamado compost. Ayuda a reducir
                  desechos, mejora la calidad del suelo y promueve prácticas
                  sostenibles para un medio ambiente más saludable.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/login.jpg") + ")",
                    }}
                  >
                    <p className="blockquote blockquote-info">
                      "La salud del suelo, la planta, el animal y el hombre
                      están indivisiblemente unidos." <br></br>
                      <br></br>
                      <small>-Sir Albert Howard</small>
                    </p>
                  </div>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/bg3.jpg") + ")",
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/bg1.jpg") + ")",
                    }}
                  ></div>
                  <h3>¿Quiénes somos?</h3>
                  <p>
                    En Ecompost, estamos dedicados a promover prácticas
                    sostenibles y responsables hacia el medio ambiente.
                    Nuestra iniciativa nació del entusiasmo y la pasión de un
                    grupo de estudiantes comprometidos con hacer una
                    diferencia positiva en el mundo y el medio ambiente.
                  </p>
                  <p>
                    Nosotros, unimos nuestras habilidades en tecnología y
                    nuestro amor por el planeta para desarrollar soluciones
                    innovadoras. Utilizando herramientas como Arduino y la
                    programación correspondiente, creamos un prototipo
                    revolucionario diseñado específicamente para mejorar el
                    proceso de compostaje.
                  </p>
                  <p>
                    Nuestra misión va más allá de solo reducir residuos;
                    queremos inspirar a otros a adoptar prácticas ecológicas y
                    demostrar que la tecnología puede ser una aliada poderosa
                    en la conservación del medio ambiente.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {/* Sección Carousel */}
        <div className="section section-carousel">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="12">
                <Carousel />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">Objetivos</h2>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/obj2.jpg")}
                    ></img>
                    <h4 className="title">
                      Desarrollo de Soluciones Tecnológicas Accesibles
                    </h4>
                    <p className="category text-info">Mejorar</p>
                    <p className="description">
                      La gestión de residuos orgánicos mediante
                      innovaciones tecnológicas.{" "}
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/obj1.jpg")}
                    ></img>
                    <h4 className="title">
                      Educación y Concienciación Comunitaria
                    </h4>
                    <p className="category text-info">Promover</p>
                    <p className="description">
                      La importancia del compostaje y la
                      sostenibilidad ambiental.{" "}
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/obj3.jpg")}
                    ></img>
                    <h4 className="title">
                      Fomento de Colaboración Interdisciplinaria
                    </h4>
                    <p className="category text-info">Impulsar</p>
                    <p className="description">
                      La investigación y desarrollo en tecnología verde
                      a través de colaboraciones interdisciplinarias.{" "}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Contáctenos</h2>
            <p className="description">
                  Por que usted es muy importante para nosotros.
            </p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Ingrese sus nombres completos"
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputGroup>
                <div className="radio-container">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      className="custom-control-input"
                      id="rucRadio"
                      name="rucDniRadio"
                      type="radio"
                      checked={rucDniOption === "ruc"}
                      onChange={handleRucDniChange}
                    />
                    <label className="custom-control-label" htmlFor="rucRadio">
                      RUC
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      className="custom-control-input"
                      id="dniRadio"
                      name="rucDniRadio"
                      type="radio"
                      checked={rucDniOption === "dni"}
                      onChange={handleRucDniChange}
                    />
                    <label className="custom-control-label" htmlFor="dniRadio">
                      DNI
                    </label>
                  </div>
                </div>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons business_bank"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={rucDniOption === "ruc" ? "RUC..." : "DNI..."}
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                    value={rucDni}
                    onChange={(e) => setRucDni(e.target.value)}
                  />
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    onClick={handleSubmit}
                    size="lg"
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
