'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardBody, Divider, Checkbox, Progress } from '@heroui/react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Target, Eye, EyeOff, ArrowRight, Home, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth';
import SEO from '@/components/SEO';
import toast from '@/utils/toast';

const Register = () => {
  const router = useRouter();
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        return '';
      
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email (e.g., user@example.com)';
        }
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/\d/.test(value)) return 'Password must contain at least one number';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one special character';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validateField('password', formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setLoading(true);
    
    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      router.push('/dashboard');
    }
    
    setLoading(false);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: 'default' };
    
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    
    if (strength <= 30) return { strength, label: 'Weak', color: 'danger' };
    if (strength <= 60) return { strength, label: 'Fair', color: 'warning' };
    if (strength <= 80) return { strength, label: 'Good', color: 'primary' };
    return { strength, label: 'Strong', color: 'success' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/20 p-4 relative overflow-hidden">
      <SEO 
        title="Register"
        description="Create a free NexusTrack account to start managing your tasks and projects. No credit card required."
        keywords="register, sign up, create account, NexusTrack registration, free task management"
      />
      <Link href="/" className="absolute top-6 left-6 z-20">
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
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
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
                const value = e.target.value;
                setFormData({ ...formData, name: value });
                const error = validateField('name', value);
                setErrors({ ...errors, name: error });
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
                const value = e.target.value;
                setFormData({ ...formData, email: value });
                const error = validateField('email', value);
                setErrors({ ...errors, email: error });
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
                const value = e.target.value;
                setFormData({ ...formData, password: value });
                const error = validateField('password', value);
                setErrors({ ...errors, password: error });
                if (formData.confirmPassword) {
                  const confirmError = validateField('confirmPassword', formData.confirmPassword);
                  setErrors(prev => ({ ...prev, password: error, confirmPassword: confirmError }));
                }
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
              className="max-w-full"
            />
            
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                  <span className={`font-medium text-${passwordStrength.color}`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <Progress 
                  value={passwordStrength.strength} 
                  color={passwordStrength.color}
                  size="sm"
                  className="max-w-full"
                  aria-label="Password strength indicator"
                />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    {formData.password.length >= 8 ? 
                      <Check className="w-3 h-3 text-success" /> : 
                      <X className="w-3 h-3 text-danger" />
                    }
                    <span className={formData.password.length >= 8 ? "text-success" : "text-gray-500"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 
                      <Check className="w-3 h-3 text-success" /> : 
                      <X className="w-3 h-3 text-danger" />
                    }
                    <span className={/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? "text-success" : "text-gray-500"}>
                      Uppercase and lowercase letters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/\d/.test(formData.password) ? 
                      <Check className="w-3 h-3 text-success" /> : 
                      <X className="w-3 h-3 text-danger" />
                    }
                    <span className={/\d/.test(formData.password) ? "text-success" : "text-gray-500"}>
                      At least one number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 
                      <Check className="w-3 h-3 text-success" /> : 
                      <X className="w-3 h-3 text-danger" />
                    }
                    <span className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "text-success" : "text-gray-500"}>
                      Special character (!@#$%^&*)
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, confirmPassword: value });
                const error = validateField('confirmPassword', value);
                setErrors({ ...errors, confirmPassword: error });
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

            <div>
              <Checkbox 
                size="sm" 
                isRequired 
                className="text-sm"
                isSelected={agreedToTerms}
                onValueChange={setAgreedToTerms}
                isInvalid={!!errors.terms}
              >
                <span className="text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </Checkbox>
              {errors.terms && (
                <p className="text-danger text-xs mt-1">{errors.terms}</p>
              )}
            </div>

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
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">
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