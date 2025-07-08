import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Switch,
  Input
} from '@heroui/react';
import {
  Target,
  LogOut,
  User as UserIcon,
  Sun,
  Moon,
  Search,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';
import useToggle from '../hooks/useToggle';

const AppNavbar = ({ onSearchChange, searchQuery, onQuickAdd }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, { toggle: toggleMenu, setFalse: closeMenu }] = useToggle(false);

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthenticated = !!user;
  const isDashboard = location.pathname === '/dashboard';
  const isProfile = location.pathname === '/profile';

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={toggleMenu}
      className="bg-white/95 backdrop-blur-xl dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 fixed top-0 z-50"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="cursor-pointer" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}>
          <Target className="w-8 h-8 text-blue-600 mr-2" />
          <p className="font-bold text-xl">NexusTrack</p>
        </NavbarBrand>
      </NavbarContent>

      {isAuthenticated && isDashboard && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[20rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Search tasks..."
              size="sm"
              startContent={<Search size={18} />}
              type="search"
              value={searchQuery || ''}
              onClear={() => onSearchChange && onSearchChange('')}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            {isProfile && (
              <NavbarItem className="hidden sm:flex">
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  startContent={<ArrowLeft className="w-4 h-4" />}
                  onPress={() => navigate('/dashboard')}
                >
                  Back to Dashboard
                </Button>
              </NavbarItem>
            )}

            {isDashboard && onQuickAdd && (
              <NavbarItem className="hidden sm:flex">
                <Button
                  isIconOnly
                  color="primary"
                  variant="flat"
                  size="sm"
                  onPress={onQuickAdd}
                  aria-label="Quick add task"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </NavbarItem>
            )}

            <NavbarItem className="hidden sm:flex">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={getInitials(user?.name)}
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2" textValue={user?.email}>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    startContent={<UserIcon className="w-4 h-4" />}
                    onClick={() => navigate('/profile')}
                    textValue="My Profile"
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut className="w-4 h-4" />}
                    onClick={handleLogout}
                    textValue="Log Out"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                color="primary"
                variant="flat"
                size="sm"
                onPress={() => navigate('/login')}
              >
                Login
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button
                color="primary"
                size="sm"
                onPress={() => navigate('/register')}
              >
                Get Started
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {isAuthenticated ? (
          <>
            {isProfile && (
              <NavbarMenuItem>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  startContent={<ArrowLeft className="w-4 h-4" />}
                  onPress={() => {
                    navigate('/dashboard');
                    closeMenu();
                  }}
                  className="w-full justify-start"
                >
                  Back to Dashboard
                </Button>
              </NavbarMenuItem>
            )}
            {isDashboard && onQuickAdd && (
              <NavbarMenuItem>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={() => {
                    onQuickAdd();
                    closeMenu();
                  }}
                  className="w-full justify-start"
                >
                  Quick Add Task
                </Button>
              </NavbarMenuItem>
            )}
            <NavbarMenuItem>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Theme</span>
                <Switch
                  defaultSelected={isDark}
                  size="sm"
                  onValueChange={toggleTheme}
                  startContent={<Sun className="w-4 h-4" />}
                  endContent={<Moon className="w-4 h-4" />}
                />
              </div>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                variant="light"
                startContent={<UserIcon className="w-4 h-4" />}
                onPress={() => {
                  navigate('/profile');
                  closeMenu();
                }}
                className="w-full justify-start"
              >
                My Profile
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                color="danger"
                variant="light"
                startContent={<LogOut className="w-4 h-4" />}
                onPress={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full justify-start"
              >
                Log Out
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Theme</span>
                <Switch
                  defaultSelected={isDark}
                  size="sm"
                  onValueChange={toggleTheme}
                  startContent={<Sun className="w-4 h-4" />}
                  endContent={<Moon className="w-4 h-4" />}
                />
              </div>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                variant="light"
                onPress={() => {
                  navigate('/login');
                  closeMenu();
                }}
                className="w-full justify-start"
              >
                Login
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  navigate('/register');
                  closeMenu();
                }}
                className="w-full justify-start"
              >
                Create Account
              </Button>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default AppNavbar;