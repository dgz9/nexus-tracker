import { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Input, 
  Avatar,
  CardBody,
  Divider,
  Chip,
  Switch,
  Tab,
  Tabs,
  Select,
  SelectItem,
  Badge,
  addToast
} from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  User as UserIcon,
  Mail,
  Calendar,
  Shield,
  Bell,
  Palette,
  Globe,
  Save,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';
import axios from 'axios';
import AppNavbar from '../components/AppNavbar';
import SEO from '../components/SEO';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [selectedTab, setSelectedTab] = useState('profile');
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    taskReminders: true,
    projectUpdates: true,
    weeklyReports: false,
    language: 'en',
    timezone: 'UTC'
  });

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };


  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const validateProfile = () => {
    const errors = {};
    if (!profileData.name.trim()) {
      errors.name = 'Name is required';
    } else if (profileData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile()) return;
    
    setLoading(true);
    try {
      const response = await axios.put('/users/profile', {
        name: profileData.name.trim()
      });
      
      updateUser(response.data);
      
      addToast({ title: "Success", description: "Profile updated successfully", color: "success", timeout: 5000 });
    } catch (error) {
      if (error.response?.data?.message) {
        addToast({ title: "Error", description: error.response.data.message, color: "danger", timeout: 5000 });
      } else {
        addToast({ title: "Error", description: "Failed to update profile", color: "danger", timeout: 5000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    setLoading(true);
    try {
      await axios.put('/users/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      addToast({ title: "Success", description: "Password updated successfully", color: "success", timeout: 5000 });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
    } catch (error) {
      if (error.response?.status === 401) {
        setPasswordErrors({ currentPassword: 'Incorrect current password' });
      } else if (error.response?.data?.message) {
        addToast({ title: "Error", description: error.response.data.message, color: "danger", timeout: 5000 });
      } else {
        addToast({ title: "Error", description: "Failed to update password", color: "danger", timeout: 5000 });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO 
        title="Profile Settings"
        description="Manage your NexusTrack profile, update account settings, and customize your preferences."
        keywords="profile, account settings, user profile, NexusTrack profile"
      />
      <AppNavbar />

      <div className="w-full px-6 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl border-none">
              <CardBody className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <Badge
                      content=""
                      color="success"
                      placement="bottom-right"
                      shape="circle"
                      className="border-2 border-white"
                    >
                      <Avatar
                        className="w-32 h-32 text-large border-4 border-white/30 shadow-xl"
                        name={getInitials(user?.name)}
                        color="default"
                      />
                    </Badge>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                    <p className="text-lg text-white/90 mb-4">{user?.email}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <Chip 
                        startContent={<Calendar size={15} />}
                        variant="flat"
                        className="bg-white/20 text-white border-white/30 backdrop-blur-sm pl-2"
                        size="md"
                      >
                        Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                      </Chip>
                      <Chip 
                        startContent={<Shield size={15} />}
                        variant="flat"
                        className="bg-white/20 text-white border-white/30 backdrop-blur-sm pl-2"
                        size="md"
                      >
                        Free Member
                      </Chip>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardBody>
                <Tabs 
                  selectedKey={selectedTab}
                  onSelectionChange={setSelectedTab}
                  aria-label="Profile settings"
                  className="w-full"
                  classNames={{
                    tabList: "w-full",
                  }}
                >
                  <Tab
                    key="profile"
                    title={
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    }
                  >
                    <div className="p-6 space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Input
                          label="Full Name"
                          placeholder="Enter your name"
                          value={profileData.name}
                          onChange={(e) => {
                            setProfileData({ ...profileData, name: e.target.value });
                            if (profileErrors.name) {
                              setProfileErrors({ ...profileErrors, name: '' });
                            }
                          }}
                          startContent={<UserIcon className="w-4 h-4 text-default-400" />}
                          variant="bordered"
                          isInvalid={!!profileErrors.name}
                          errorMessage={profileErrors.name}
                          isRequired
                        />
                        <Input
                          label="Email"
                          placeholder="Enter your email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          startContent={<Mail className="w-4 h-4 text-default-400" />}
                          variant="bordered"
                          isDisabled
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          color="primary"
                          startContent={<Save className="w-4 h-4" />}
                          onPress={handleUpdateProfile}
                          isLoading={loading}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab
                    key="security"
                    title={
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Security</span>
                      </div>
                    }
                  >
                    <form onSubmit={handleUpdatePassword} className="p-6 space-y-6">
                      <div className="space-y-4">
                        <Input
                          label="Current Password"
                          placeholder="Enter current password"
                          type="password"
                          variant="bordered"
                          value={passwordData.currentPassword}
                          onChange={(e) => {
                            setPasswordData({ ...passwordData, currentPassword: e.target.value });
                            if (passwordErrors.currentPassword) {
                              setPasswordErrors({ ...passwordErrors, currentPassword: '' });
                            }
                          }}
                          isInvalid={!!passwordErrors.currentPassword}
                          errorMessage={passwordErrors.currentPassword}
                          isRequired
                        />
                        <Input
                          label="New Password"
                          placeholder="Enter new password"
                          type="password"
                          variant="bordered"
                          value={passwordData.newPassword}
                          onChange={(e) => {
                            setPasswordData({ ...passwordData, newPassword: e.target.value });
                            if (passwordErrors.newPassword) {
                              setPasswordErrors({ ...passwordErrors, newPassword: '' });
                            }
                          }}
                          isInvalid={!!passwordErrors.newPassword}
                          errorMessage={passwordErrors.newPassword}
                          description="Must be at least 6 characters"
                          isRequired
                        />
                        <Input
                          label="Confirm New Password"
                          placeholder="Confirm new password"
                          type="password"
                          variant="bordered"
                          value={passwordData.confirmPassword}
                          onChange={(e) => {
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value });
                            if (passwordErrors.confirmPassword) {
                              setPasswordErrors({ ...passwordErrors, confirmPassword: '' });
                            }
                          }}
                          isInvalid={!!passwordErrors.confirmPassword}
                          errorMessage={passwordErrors.confirmPassword}
                          isRequired
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          color="primary"
                          isLoading={loading}
                        >
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </Tab>
                  
                  <Tab
                    key="notifications"
                    title={
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4" />
                        <span>Notifications</span>
                      </div>
                    }
                  >
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Email Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your tasks</p>
                          </div>
                          <Switch 
                            defaultSelected={preferences.emailNotifications}
                            onValueChange={(value) => setPreferences({ ...preferences, emailNotifications: value })}
                          />
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Task Reminders</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Get reminded about upcoming deadlines</p>
                          </div>
                          <Switch 
                            defaultSelected={preferences.taskReminders}
                            onValueChange={(value) => setPreferences({ ...preferences, taskReminders: value })}
                          />
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Project Updates</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Notifications about project changes</p>
                          </div>
                          <Switch 
                            defaultSelected={preferences.projectUpdates}
                            onValueChange={(value) => setPreferences({ ...preferences, projectUpdates: value })}
                          />
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Weekly Reports</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly productivity summaries</p>
                          </div>
                          <Switch 
                            defaultSelected={preferences.weeklyReports}
                            onValueChange={(value) => setPreferences({ ...preferences, weeklyReports: value })}
                          />
                        </div>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab
                    key="preferences"
                    title={
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4" />
                        <span>Preferences</span>
                      </div>
                    }
                  >
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium mb-3 text-gray-700 dark:text-gray-300">Theme</p>
                          <div className="flex gap-4">
                            <Button
                              color={!isDark ? "primary" : "default"}
                              variant={!isDark ? "solid" : "bordered"}
                              startContent={<Sun className="w-4 h-4" />}
                              onPress={() => isDark && toggleTheme()}
                              className="font-medium"
                            >
                              Light
                            </Button>
                            <Button
                              color={isDark ? "primary" : "default"}
                              variant={isDark ? "solid" : "bordered"}
                              startContent={<Moon className="w-4 h-4" />}
                              onPress={() => !isDark && toggleTheme()}
                              className="font-medium"
                            >
                              Dark
                            </Button>
                          </div>
                        </div>
                        <Divider />
                        <div className="grid gap-6 md:grid-cols-2">
                          <Select
                            label="Language"
                            placeholder="Select language"
                            defaultSelectedKeys={[preferences.language]}
                            variant="bordered"
                            startContent={<Globe className="w-4 h-4 text-default-400" />}
                          >
                            <SelectItem key="en" value="en">English</SelectItem>
                            <SelectItem key="es" value="es">Spanish</SelectItem>
                            <SelectItem key="fr" value="fr">French</SelectItem>
                            <SelectItem key="de" value="de">German</SelectItem>
                          </Select>
                          <Select
                            label="Timezone"
                            placeholder="Select timezone"
                            defaultSelectedKeys={[preferences.timezone]}
                            variant="bordered"
                            startContent={<Calendar className="w-4 h-4 text-default-400" />}
                          >
                            <SelectItem key="UTC" value="UTC">UTC</SelectItem>
                            <SelectItem key="EST" value="EST">Eastern Time</SelectItem>
                            <SelectItem key="PST" value="PST">Pacific Time</SelectItem>
                            <SelectItem key="GMT" value="GMT">GMT</SelectItem>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;