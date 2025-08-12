import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-section ">
      <Container>
        {/* Social Icons */}
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <div className="icon-circle">
              <FaFacebookF />
            </div>
          </Col>
          <Col xs="auto">
            <div className="icon-circle">
              <FaTwitter />
            </div>
          </Col>
          <Col xs="auto">
            <div className="icon-circle">
              <FaLinkedinIn />
            </div>
          </Col>
          <Col xs="auto">
            <div className="icon-circle">
              <FaYoutube />
            </div>
          </Col>
        </Row>

        {/* Email */}
        <Row className="justify-content-center mb-2">
          <Col xs="auto" className="footer-email">
            Example@email.com
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="justify-content-center">
          <Col xs="auto" className="footer-copy">
            Copyright © 2020 Name. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 