import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TbBrandYoutube } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";
import { PiTwitterLogoBold } from "react-icons/pi";
import { FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer-section ">
      <Container>
        {/* Social Icons */}
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <div className="icon-circle">
              <FiFacebook />
            </div>
          </Col>
          <Col xs="auto">
            <div className="icon-circle">
              <PiTwitterLogoBold />
            </div>
          </Col>
          <Col xs="auto">
            <div className="icon-circle">
              <FiLinkedin />
            </div>
          </Col>
          <Col xs="auto">
            <div className="icon-circle">
              <TbBrandYoutube />
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