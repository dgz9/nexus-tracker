'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Switch
} from "@heroui/react";
import { 
  Target, 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  LayoutDashboard,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            <p className="font-bold text-xl text-gray-900 dark:text-white">NexusTrack</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {user && (
          <>
            <NavbarItem>
              <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Profile
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            defaultSelected={isDark}
            size="lg"
            color="default"
            onValueChange={toggleTheme}
            thumbIcon={({ isSelected }) =>
              isSelected ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )
            }
          />
        </NavbarItem>
        
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                name={user.name}
                size="sm"
                src={user.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem 
                key="dashboard" 
                startContent={<LayoutDashboard className="w-4 h-4" />}
                onPress={() => router.push('/dashboard')}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem 
                key="settings" 
                startContent={<User className="w-4 h-4" />}
                onPress={() => router.push('/profile')}
              >
                Profile Settings
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger" 
                startContent={<LogOut className="w-4 h-4" />}
                onPress={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">
                <Button 
                  color="default" 
                  variant="flat"
                  startContent={<LogIn className="w-4 h-4" />}
                >
                  Login
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button 
                  color="primary" 
                  startContent={<UserPlus className="w-4 h-4" />}
                >
                  Sign Up
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        {user ? (
          <>
            <NavbarMenuItem>
              <Link
                href="/dashboard"
                className="w-full text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                href="/profile"
                className="w-full text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                color="danger"
                variant="flat"
                className="w-full"
                startContent={<LogOut className="w-4 h-4" />}
                onPress={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Log Out
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link
                href="/login"
                className="w-full text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                href="/register"
                className="w-full text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default AppNavbar;