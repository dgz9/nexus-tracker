import { useState, useEffect } from 'react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ScrollShadow,
  Tooltip
} from '@heroui/react';
import {
  Folder,
  FolderPlus,
  Hash,
  ChevronLeft,
  MoreVertical,
  Edit2,
  Trash2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import useResponsive from '../hooks/useResponsive';

const Sidebar = ({
  projects,
  totalTaskCount,
  projectFilter,
  onProjectFilterChange,
  onEditProject,
  onDeleteProject,
  onNewProject,
  sidebarState: externalSidebarState,
  setSidebarState: externalSetSidebarState
}) => {
  const [internalSidebarState, setInternalSidebarState] = useState('full');
  const { isMobile, isLarge } = useResponsive(1024);

  const sidebarState = externalSidebarState || internalSidebarState;
  const setSidebarState = externalSetSidebarState || setInternalSidebarState;

  const getProjectInitials = (name) => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    if (isMobile) {
      setSidebarState('hidden');
    } else if (isLarge) {
      setSidebarState('partial');
    }
  }, [isMobile, isLarge, setSidebarState]);

  const handleDeleteProject = async (project) => {
    onDeleteProject(project);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarState(current => current === 'hidden' ? 'full' : 'hidden');
    } else {
      setSidebarState(current => current === 'full' ? 'partial' : 'full');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isMobile && sidebarState !== 'hidden' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarState('hidden')}
          />
        )}
      </AnimatePresence>

      {isMobile && sidebarState !== 'hidden' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarState('hidden')}
        />
      )}

      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 overflow-x-hidden ${isMobile
          ? `z-50 shadow-2xl ${sidebarState === 'hidden' ? '-translate-x-full' : 'translate-x-0'} w-64`
          : `z-40 shadow-xl translate-x-0 ${sidebarState === 'hidden' ? '-translate-x-full' : ''} ${sidebarState === 'partial' ? 'w-14' : 'w-64'}`
          }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <AnimatePresence mode="wait">
                {sidebarState === 'full' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 flex-1"
                  >
                    <Folder className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <h3 className="font-semibold">Projects</h3>
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={toggleSidebar}
                className={sidebarState === 'partial' ? 'mx-auto' : ''}
              >
                <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarState === 'partial' ? 'rotate-180' : ''
                  }`} />
              </Button>
            </div>
          </div>

          <ScrollShadow className="flex-1 p-2 overflow-y-auto">
            <div className="space-y-1">
              <Tooltip content="All Tasks" placement="right" isDisabled={sidebarState === 'full'}>
                <div className="relative">
                  <Button
                  variant={sidebarState === 'partial' ? 'flat' : (projectFilter === 'all' ? 'solid' : 'flat')}
                  color={projectFilter === 'all' ? 'primary' : 'default'}
                  className={`${sidebarState === 'partial' ? 'w-10 h-10 min-w-0 p-0 mx-auto relative overflow-visible mb-1.5' : 'w-full px-3 justify-start h-auto min-h-10'
                    } ${sidebarState === 'partial' && projectFilter === 'all' ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}`}
                  onPress={() => onProjectFilterChange('all')}
                  isIconOnly={sidebarState === 'partial'}
                >
                  {sidebarState === 'partial' ? (
                    <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Hash className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                        <Hash className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <span className="font-medium flex-1 text-left truncate">All Tasks</span>
                      <Chip size="sm" variant="flat">{totalTaskCount || 0}</Chip>
                    </div>
                  )}
                  </Button>
                </div>
              </Tooltip>

              {projects.map((project) => (
                <Tooltip key={project.id} content={project.name} placement="right" isDisabled={sidebarState === 'full'}>
                  <div className="relative group">
                    <Button
                      variant={sidebarState === 'partial' ? 'flat' : (projectFilter === project.id ? 'solid' : 'flat')}
                      color={projectFilter === project.id ? 'primary' : 'default'}
                      className={`${sidebarState === 'partial' ? 'w-10 h-10 min-w-0 p-0 mx-auto relative overflow-visible' : 'w-full px-3 pr-10 justify-start h-auto min-h-10'
                        } ${sidebarState === 'partial' && projectFilter === project.id ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}`}
                      onPress={() => onProjectFilterChange(project.id)}
                      isIconOnly={sidebarState === 'partial'}
                    >
                      {sidebarState === 'partial' ? (
                        <div
                          className="w-full h-full rounded-md flex items-center justify-center absolute inset-0"
                          style={{ backgroundColor: project.color }}
                        >
                          <span className="text-white font-bold text-sm leading-none">
                            {getProjectInitials(project.name)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 w-full">
                          <div
                            className="w-8 h-8 rounded-lg shadow-sm flex-shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: project.color }}
                          >
                            <span className="text-white font-bold text-sm">
                              {getProjectInitials(project.name)}
                            </span>
                          </div>
                          <span className="font-medium truncate flex-1 text-left">{project.name}</span>
                          <Chip size="sm" variant="flat">{project._count?.tasks || 0}</Chip>
                        </div>
                      )}
                    </Button>
                    {sidebarState === 'full' && (
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Dropdown placement="right">
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              radius="full"
                              className="h-7 w-7 min-w-0"
                              onPress={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Project actions">
                            <DropdownItem
                              key="edit"
                              startContent={<Edit2 className="w-4 h-4" />}
                              onPress={() => onEditProject(project)}
                              textValue="Edit"
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              color="danger"
                              startContent={<Trash2 className="w-4 h-4" />}
                              onPress={() => handleDeleteProject(project)}
                              textValue="Delete"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    )}
                  </div>
                </Tooltip>
              ))}
            </div>
          </ScrollShadow>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className={sidebarState === 'partial' ? 'flex justify-center' : ''}>
              <Tooltip content="Create new project" placement="right" isDisabled={sidebarState === 'full'}>
                <Button
                  color="primary"
                  variant="flat"
                  className={`${sidebarState === 'partial' ? 'w-10 h-10 min-w-0 p-0 flex-shrink-0' : 'w-full'
                    }`}
                  onPress={onNewProject}
                  isIconOnly={sidebarState === 'partial'}
                >
                  {sidebarState === 'partial' ? (
                    <FolderPlus className="w-5 h-5" />
                  ) : (
                    <>
                      <FolderPlus className="w-4 h-4 mr-2" />
                      New Project
                    </>
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </aside>


    </>
  );
};

export default Sidebar;