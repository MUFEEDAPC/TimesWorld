import React, { useEffect } from "react";
import { Container, Button, Navbar, Row, Col, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountriesSlider from "./CountriesSlider.jsx";
import { BoxArrowRight } from "react-bootstrap-icons";
import Footer from "./Footer.jsx";
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  // const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // const handleLogout = () => {
  //   dispatch(logout())
  //   navigate('/login', { replace: true })
  // }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-vh-100 ">
      <Container className="py-4">
        <div className="custom-padding">
          <Row
            className="align-items-center"
            style={{ marginBottom: !isMobile && "35px" }}
          >
            {/* Left - Title */}
            <Col xs="auto">
              <strong style={{ fontSize: "24px", color: "#3D3D3D" }}>
                Countries
              </strong>
            </Col>

            {/* Right - Nav Tabs */}
            <Col className="text-end">
              <Navbar expand="md" className="p-0 justify-content-end">
                <Navbar.Toggle
                  aria-controls="country-nav"
                  style={{
                    border: "none",
                    boxShadow: "none",
                    background: "transparent",
                    padding: 0,
                  }}
                />

                <Navbar.Collapse
                  id="country-nav"
                  className="justify-content-end"
                >
                  <Nav
                    variant={!isMobile && "underline"}
                    defaultActiveKey="all"
                  >
                    <Nav.Item className="nav-item-custom">
                      <Nav.Link className="nav-item-custom" eventKey="all">
                        All
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item-custom">
                      <Nav.Link className="nav-item-custom" eventKey="asia">
                        Asia
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item-custom">
                      <Nav.Link className="nav-item-custom" eventKey="europe">
                        Europe
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>

          {/* Middle - WELCOME heading */}
          <Row
            className="align-items-center flex-column flex-md-row"
            style={{ marginTop: isMobile ? "35px" : "20px" }}
          >
            <Col>
              <div
                style={{
                  flexGrow: 1,
                  height: "2.3px",
                  backgroundColor: "#3D3D3D",
                  margin: 0,
                  display: "block",
                  transform: "translateY(-11px)",
                }}
              ></div>
            </Col>
            <Col xs="auto">
              <h3
                className="fw-bold m-0"
                style={{ color: "#3D3D3D", fontSize: "35px" }}
              >
                WELCOME
              </h3>
            </Col>
            <Col>
              <div
                style={{
                  flexGrow: 1,
                  height: isMobile ? 2 : "2.3px",
                  backgroundColor: "#3D3D3D",
                  margin: 0,
                  display: "block",
                  transform: "translateY(11px)",
                }}
              ></div>
            </Col>
          </Row>
        </div>
        <CountriesSlider />
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
