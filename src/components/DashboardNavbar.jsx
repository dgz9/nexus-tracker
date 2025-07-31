'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
  Tooltip
} from "@heroui/react";
import { 
  Target, 
  Search,
  Plus,
  Sun, 
  Moon, 
  LogOut, 
  User,
  Menu
} from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';

const DashboardNavbar = ({ onSearchChange, searchQuery, onQuickAdd, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Navbar 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm"
      maxWidth="full"
      height="4rem"
    >
      <NavbarContent>
        <NavbarBrand className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            onPress={onToggleSidebar}
            className="text-gray-600 dark:text-gray-400 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            <p className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">NexusTrack</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="flex-grow">
        <NavbarItem className="w-full max-w-md">
          <Input
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
            }}
            placeholder="Search tasks..."
            size="sm"
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            type="search"
            value={searchQuery}
            onValueChange={onSearchChange}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Tooltip content="Create new task" placement="bottom">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              onPress={onQuickAdd}
              className="hidden sm:flex"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </Tooltip>
        </NavbarItem>


        <NavbarItem>
          <Tooltip content={isDark ? "Light mode" : "Dark mode"} placement="bottom">
            <Button
              isIconOnly
              variant="flat"
              onPress={toggleTheme}
              className="text-gray-600 dark:text-gray-400"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </Tooltip>
        </NavbarItem>
        
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.name}
                size="sm"
                src={user?.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default DashboardNavbar;