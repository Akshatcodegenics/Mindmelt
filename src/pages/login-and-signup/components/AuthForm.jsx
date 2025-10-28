import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Mock credentials for testing
  const mockCredentials = {
    email: 'demo@mindmate.com',
    password: 'mindmate123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData?.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Check mock credentials
        if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
          navigate('/dashboard');
        } else {
          setErrors({
            email: 'Invalid credentials. Use demo@mindmate.com / mindmate123'
          });
        }
      } else {
        // Simulate successful signup
        navigate('/dashboard');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleModeToggle = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card soft-shadow-lg organic-radius-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-organic-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Brain" size={32} color="white" />
          </div>
          <h1 className="text-fluid-2xl font-heading font-semibold text-foreground mb-2">
            Welcome to MindMate
          </h1>
          <p className="text-fluid-sm text-muted-foreground">
            {isLogin ? 'Sign in to continue your wellness journey' : 'Create your account to get started'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-muted organic-radius-md p-1 mb-6">
          <button
            type="button"
            onClick={() => !isLogin && handleModeToggle()}
            className={`flex-1 py-2 px-4 text-fluid-sm font-medium organic-radius-sm transition-all duration-200 ${
              isLogin 
                ? 'bg-card text-foreground soft-shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => isLogin && handleModeToggle()}
            className={`flex-1 py-2 px-4 text-fluid-sm font-medium organic-radius-sm transition-all duration-200 ${
              !isLogin 
                ? 'bg-card text-foreground soft-shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData?.name}
              onChange={handleInputChange}
              error={errors?.name}
              required={!isLogin}
            />
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />

          {!isLogin && (
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required={!isLogin}
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            className="mt-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Additional Options */}
        {isLogin && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-fluid-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Forgot your password?
            </button>
          </div>
        )}

        {/* Demo Credentials Info */}
        {isLogin && (
          <div className="mt-6 p-4 bg-muted organic-radius-md">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5 flex-shrink-0" />
              <div className="text-fluid-xs text-muted-foreground">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Email: demo@mindmate.com</p>
                <p>Password: mindmate123</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;