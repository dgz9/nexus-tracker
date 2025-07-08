import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Card, CardBody, Divider, Checkbox } from '@heroui/react';
import { motion } from 'framer-motion';
import { Mail, Lock, Target, Eye, EyeOff, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import useForm from '../hooks/useForm';
import useToggle from '../hooks/useToggle';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isVisible, { toggle: toggleVisibility }] = useToggle(false);
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const {
    values: formData,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(
    { email: '', password: '' },
    validate
  );

  const onSubmit = async (values) => {
    setLoading(true);

    const result = await login(values.email, values.password);

    if (result.success) {
      navigate('/dashboard');
    }

    setLoading(false);
  };

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
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome back</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to continue to your dashboard</p>
        </div>

        <Card className="shadow-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
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
                className="max-w-full"
              />

              <div className="flex justify-between items-center">
                <Checkbox size="sm" className="text-sm">
                  Remember me
                </Checkbox>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                isLoading={loading}
                endContent={!loading && <ArrowRight className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </form>

            <Divider className="my-6" />

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;