import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../features/auth/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { Facebook, Linkedin, Twitter, Rss } from 'react-bootstrap-icons'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepSignedIn: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    console.log('Login useEffect - Auth state:', { isAuthenticated })
    if (isAuthenticated) {
      console.log('Login - Redirecting to home page')
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Password validation: minimum 8 characters, at least 1 uppercase, 1 number and 1 symbol
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 number & 1 symbol'
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Dispatch login success
      dispatch(loginSuccess({ email: formData.email }))
      
      // Redirect to home page
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    console.log('Login - Already authenticated, not rendering form')
    return null
  }

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="login-title mb-2">Sign In</h1>
          <p className="text-muted mb-0">
            New user?{' '}
            <a href="#" className="text-primary text-decoration-none fw-medium">
              Create an account
            </a>
          </p>
        </div>

        {/* Login Form */}
        <Form onSubmit={handleSubmit} noValidate className="mb-4">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-medium text-dark">Username or email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your username or email"
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
            <Form.Label className="fw-medium text-dark">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
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
            <Form.Text className="text-muted small mt-2">
              <small>
                Password must contain at least 8 characters, including:
                <br />• 1 uppercase letter • 1 number • 1 special symbol
              </small>
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formKeepSignedIn">
            <Form.Check
              type="checkbox"
              name="keepSignedIn"
              checked={formData.keepSignedIn}
              onChange={handleInputChange}
              label="Keep me signed in"
              className="d-flex align-items-center"
            />
          </Form.Group>

          <Button 
            variant="dark" 
            type="submit" 
            className="w-100 btn-lg fw-medium mb-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>

        {/* Separator */}
        <div className="text-center mb-4">
          <div className="separator">
            <span className="separator-text text-muted">or sign in with</span>
          </div>
        </div>

        {/* Social Login Options */}
        <div className="d-flex justify-content-center gap-3">
          <Button variant="outline-secondary" className="social-btn rounded-circle">
            <Rss size={20} />
          </Button>
          <Button variant="outline-secondary" className="social-btn rounded-circle">
            <Facebook size={20} />
          </Button>
          <Button variant="outline-secondary" className="social-btn rounded-circle">
            <Linkedin size={20} />
          </Button>
          <Button variant="outline-secondary" className="social-btn rounded-circle">
            <Twitter size={20} />
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Login 