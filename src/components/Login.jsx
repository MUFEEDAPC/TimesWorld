import React, { useState, useEffect } from "react";
import { Form, Button, Col, Image, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiGoogle } from "react-icons/si";

import { useMediaQuery } from "react-responsive";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepSignedIn: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  // useEffect(() => {
  //   console.log('Login useEffect - Auth state:', { isAuthenticated })
  //   if (isAuthenticated) {
  //     console.log('Login - Redirecting to home page')
  //     navigate('/', { replace: true })
  //   }
  // }, [isAuthenticated, navigate])

  // Password validation: minimum 8 characters, at least 1 uppercase, 1 number and 1 symbol
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with 1 uppercase, 1 number & 1 symbol";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dispatch login success
      dispatch(loginSuccess({ email: formData.email }));

      // Redirect to home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    console.log("Login - Already authenticated, not rendering form");
    return null;
  }

  return (
    <Container
      style={{
        paddingLeft: isMobile ? "0px" : "30px",
        paddingRight: isMobile ? "0px" : "30px",
      }}
      className="min-vh-100 d-flex align-items-center justify-content-center"
    >
      <div className="login-page">
        <div className="login-container">
          {/* Header */}
          <div className="my-text">
            <h1 className="login-title mb-2">Sign In</h1>
            <p className="text-muted mb-0 new-user-text">
              New user?{" "}
              <a
                href="#"
                className="text-primary text-decoration-none fw-medium create-account-text"
              >
                Create an account
              </a>
            </p>
          </div>

          {/* Login Form */}
          <Form onSubmit={handleSubmit} noValidate className="mb-4">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Username or email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                disabled={isSubmitting}
                className="form-control-lg"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                isInvalid={!!errors.password}
                disabled={isSubmitting}
                className="form-control-lg"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formKeepSignedIn">
              <Form.Check
                type="checkbox"
                name="keepSignedIn"
                checked={formData.keepSignedIn}
                onChange={handleInputChange}
                label="Keep me signed in"
                className="d-flex align-items-center form-check-input-box"
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 btn-lg fw-medium  submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Form>

          {/* Separator */}
          <div className="text-center mb-4">
            <div className="separator">
              <span className="separator-text text-muted">Or Sign In With</span>
            </div>
          </div>

          {/* Social Login Options */}
          <Row className="justify-content-center mb-3">
            <Col xs="auto">
              <div className="icon-circle">
                <SiGoogle />
              </div>
            </Col>
            <Col xs="auto">
              <div className="icon-circle">
                <FaFacebookF />
              </div>
            </Col>
            <Col xs="auto">
              <div className="icon-circle">
                <FaLinkedinIn />
              </div>
            </Col>
            <Col xs="auto">
              <div className="icon-circle">
                <FaTwitter />
              </div>
            </Col>
          </Row>
        </div>
        {!isMobile && (
          // <Col md={3}

          // className="image-gap"
          // >
          <Image
            src="public/assets/assets/images/image.png"
            alt="Frame"
            rounded
            style={{
              height: "620px",
              // width: "69px",
              objectFit: "contain",
            }}
          />
          // </Col>
        )}
      </div>
    </Container>
  );
};

export default Login;
