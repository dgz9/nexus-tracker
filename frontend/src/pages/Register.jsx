import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Card, CardBody, Divider, Checkbox } from '@heroui/react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Target, Eye, EyeOff, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/20 p-4 relative overflow-hidden">
      <Link to="/" className="absolute top-6 left-6 z-20">
        <Button
          variant="light"
          startContent={<Home className="w-4 h-4" />}
          size="sm"
          className="text-gray-600 dark:text-gray-400"
        >
          Back to Home
        </Button>
      </Link>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Target className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">NexusTrack</h1>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Create an account</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Start your productivity journey today</p>
        </div>

        <Card className="shadow-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50">
          <CardBody className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              startContent={
                <User className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              variant="bordered"
              isRequired
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              className="max-w-full"
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              startContent={
                <Mail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              variant="bordered"
              isRequired
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              className="max-w-full"
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              startContent={
                <Lock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              endContent={
                <button 
                  className="focus:outline-none" 
                  type="button" 
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              description="Must be at least 6 characters"
              className="max-w-full"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              startContent={
                <Lock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              className="max-w-full"
            />

            <Checkbox size="sm" isRequired className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                  Privacy Policy
                </Link>
              </span>
            </Checkbox>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              isLoading={loading}
              endContent={!loading && <ArrowRight className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>

          <Divider className="my-6" />

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;