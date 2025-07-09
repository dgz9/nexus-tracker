import { useState, useEffect } from 'react';
import useTask from '../hooks/useTask';
import {
  Card,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Skeleton,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Checkbox,
  Tooltip,
  Badge,
  Tab,
  Tabs,
  ScrollShadow,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  addToast
} from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  CheckCircle,
  Clock,
  Circle,
  Edit2,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckSquare,
  Folder,
  FolderPlus,
  FolderOpen,
  Hash,
  Activity,
  Layers,
  Grid3x3,
  List,
  Bell,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/useAuth';
import UniversalModal from '../components/UniversalModal';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import AppNavbar from '../components/AppNavbar';
import TaskDetailsModal from '../components/TaskDetailsModal';
import useResponsive from '../hooks/useResponsive';
import useModal from '../hooks/useModal';
import useToggle from '../hooks/useToggle';
import useSearchFilter from '../hooks/useSearchFilter';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const taskModal = useModal();
  const projectModal = useModal();
  const [projectFilter, setProjectFilter] = useState('all');
  const [stats, setStats] = useState(null);
  const [totalTaskCount, setTotalTaskCount] = useState(0);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    status: 'PENDING',
    projectId: null
  });
  const [projectFormData, setProjectFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });
  const [projectFormErrors, setProjectFormErrors] = useState({});
  const [viewMode, setViewMode] = useState('cards');
  const [submitting, setSubmitting] = useState(false);
  const { isMobile } = useResponsive();
  const [fabMenuOpen, { toggle: toggleFabMenu, setFalse: closeFabMenu }] = useToggle(false);
  const taskDetailsModal = useModal();
  const deleteTaskModal = useModal();
  const deleteProjectModal = useModal();
  const [sidebarState, setSidebarState] = useState(() => {
    return window.innerWidth >= 1024 ? 'full' : 'hidden';
  });

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    filteredItems: filteredTasks
  } = useSearchFilter(
    tasks,
    ['title', 'description'],
    {
      status: {
        defaultValue: 'active',
        filterFn: (task, value) => {
          if (value === 'all') return true;
          if (value === 'active') return task.status !== 'COMPLETED';
          return task.status === value;
        }
      }
    }
  );

  const statusFilter = filters.status;

  const projectColors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
    '#EF4444', '#6366F1', '#EC4899', '#14B8A6'
  ];

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchStats();
    fetchTotalTaskCount();
  }, []);

  const { 
    createTask,
    updateTask,
    deleteTask: deleteTaskApi
  } = useTask();

  const fetchTasks = async (projectId = null) => {
    const url = projectId ? `/tasks?projectId=${projectId}` : '/tasks';
    try {
      const response = await axios.get(url);
      setTasks(response.data);
    } catch {
      addToast({ title: "Error", description: "Failed to fetch tasks", color: "danger", timeout: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      setProjects(response.data);
    } catch {
      addToast({ title: "Error", description: "Failed to fetch projects", color: "danger", timeout: 5000 });
    }
  };

  const fetchStats = async (projectId = null) => {
    try {
      const url = projectId ? `/tasks/stats?projectId=${projectId}` : '/tasks/stats';
      const response = await axios.get(url);
      setStats(response.data);
    } catch {
      console.error('Failed to fetch stats');
    }
  };

  const fetchTotalTaskCount = async () => {
    try {
      const response = await axios.get('/tasks/stats');
      setTotalTaskCount(response.data.total || 0);
    } catch {
      console.error('Failed to fetch total task count');
    }
  };

  const handleTaskSubmit = async () => {
    if (!taskFormData.title.trim()) {
      addToast({ title: "Error", description: "Task title is required", color: "danger", timeout: 5000 });
      return;
    }

    setSubmitting(true);
    try {
      let result;
      if (taskModal.data) {
        result = await updateTask(taskModal.data.id, taskFormData);
        if (result.success) {
          setTasks(tasks.map(task => task.id === taskModal.data.id ? result.data : task));
          
          if (taskDetailsModal.data && taskDetailsModal.data.id === taskModal.data.id) {
            taskDetailsModal.setData(result.data);
          }
        }
      } else {
        result = await createTask(taskFormData);
        if (result.success) {
          if (projectFilter === 'all' || taskFormData.projectId === projectFilter) {
            setTasks([result.data, ...tasks]);
          }
        }
      }
      
      if (result.success) {
        taskModal.close();
        resetTaskForm();
        fetchStats(projectFilter !== 'all' ? projectFilter : null);
        fetchProjects();
        fetchTotalTaskCount();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validateProjectForm = () => {
    const errors = {};

    if (!projectFormData.name.trim()) {
      errors.name = 'Project name is required';
    } else if (projectFormData.name.trim().length < 3) {
      errors.name = 'Project name must be at least 3 characters';
    } else if (projectFormData.name.trim().length > 50) {
      errors.name = 'Project name must be less than 50 characters';
    }

    if (projectFormData.description && projectFormData.description.trim().length > 200) {
      errors.description = 'Description must be less than 200 characters';
    }

    setProjectFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProjectSubmit = async () => {
    if (!validateProjectForm()) {
      return;
    }

    setSubmitting(true);
    try {
      if (projectModal.data) {
        const response = await axios.put(`/projects/${projectModal.data.id}`, projectFormData);
        setProjects(projects.map(project => project.id === projectModal.data.id ? response.data : project));
        addToast({ title: "Success", description: "Project updated successfully", color: "success", timeout: 5000 });
      } else {
        const response = await axios.post('/projects', projectFormData);
        setProjects([...projects, response.data]);
        addToast({ title: "Success", description: "Project created successfully", color: "success", timeout: 5000 });

        if (taskModal.isOpen) {
          setTaskFormData({ ...taskFormData, projectId: response.data.id });
        }
      }
      projectModal.close();
      resetProjectForm();
      fetchStats(projectFilter !== 'all' ? projectFilter : null);
    } catch {
      addToast({ title: "Error", description: projectModal.data ? "Failed to update project" : "Failed to create project", color: "danger", timeout: 5000 });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    const result = await deleteTaskApi(id);
    if (result.success) {
      setTasks(tasks.filter(task => task.id !== id));

      if (taskDetailsModal.data && taskDetailsModal.data.id === id) {
        taskDetailsModal.close();
      }

      fetchStats(projectFilter !== 'all' ? projectFilter : null);
      fetchProjects();
      fetchTotalTaskCount();
      deleteTaskModal.close();
    }
  };

  const handleQuickStatusUpdate = async (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    const result = await updateTask(taskId, {
      ...task,
      status: newStatus,
      projectId: task.project?.id || task.projectId
    });
    
    if (result.success) {
      setTasks(tasks.map(t => t.id === taskId ? result.data : t));

      if (taskDetailsModal.data && taskDetailsModal.data.id === taskId) {
        taskDetailsModal.setData(result.data);
      }

      fetchStats(projectFilter !== 'all' ? projectFilter : null);
      fetchProjects();
      fetchTotalTaskCount();
    }
  };

  const handleEditTask = (task) => {
    setTaskFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      projectId: task.project?.id || task.projectId || null
    });
    taskModal.open(task);
  };

  const handleEditProject = (project) => {
    setProjectFormData({
      name: project.name,
      description: project.description || '',
      color: project.color
    });
    projectModal.open(project);
  };

  const resetTaskForm = () => {
    setTaskFormData({ 
      title: '', 
      description: '', 
      status: 'PENDING', 
      projectId: projectFilter !== 'all' ? projectFilter : null 
    });
  };

  const resetProjectForm = () => {
    setProjectFormData({ name: '', description: '', color: '#3B82F6' });
    setProjectFormErrors({});
  };


  const handleProjectFilterChange = (projectId) => {
    setProjectFilter(projectId);
    if (projectId === 'all') {
      fetchTasks();
      fetchStats();
    } else {
      fetchTasks(projectId);
      fetchStats(projectId);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4" />;
      case 'IN_PROGRESS':
        return <Clock className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      default:
        return 'default';
    }
  };

  const completionRate = stats?.total > 0
    ? Math.round((stats.byStatus.completed || 0) / stats.total * 100)
    : 0;

  const confirmDelete = (task) => {
    deleteTaskModal.open(task);
  };

  const confirmDeleteProject = (project) => {
    deleteProjectModal.open(project);
  };

  const handleDeleteProject = async (project) => {
    try {
      await axios.delete(`/projects/${project.id}`);
      setProjects(projects.filter(p => p.id !== project.id));
      addToast({ title: "Success", description: "Project deleted successfully", color: "success", timeout: 5000 });
      if (projectFilter === project.id) {
        handleProjectFilterChange('all');
      } else {
        fetchStats(projectFilter !== 'all' ? projectFilter : null);
      }
      fetchTotalTaskCount();
      deleteProjectModal.close();
    } catch {
      addToast({ title: "Error", description: "Failed to delete project", color: "danger", timeout: 5000 });
    }
  };

  const handleViewTaskDetails = (task) => {
    taskDetailsModal.open(task);
  };

  const statsCards = [
    {
      title: "Total Tasks",
      value: stats?.total || 0,
      icon: <Layers className="w-5 h-5" />,
      color: "primary",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Completed",
      value: stats?.byStatus.completed || 0,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "success",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "In Progress",
      value: stats?.byStatus.in_progress || 0,
      icon: <Clock className="w-5 h-5" />,
      color: "warning",
      gradient: "from-amber-500 to-amber-600"
    },
    {
      title: "Projects",
      value: stats?.projectCount || 0,
      icon: <Folder className="w-5 h-5" />,
      color: "secondary",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/20 flex overflow-x-hidden">
      <AppNavbar
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onQuickAdd={() => {
          resetTaskForm();
          taskModal.open();
        }}
      />

      <Sidebar
        projects={projects}
        stats={stats}
        totalTaskCount={totalTaskCount}
        projectFilter={projectFilter}
        onProjectFilterChange={handleProjectFilterChange}
        onEditProject={handleEditProject}
        onDeleteProject={confirmDeleteProject}
        onNewProject={() => {
          resetProjectForm();
          projectModal.open();
        }}
        sidebarState={sidebarState}
        setSidebarState={setSidebarState}
      />

      <main className={`flex-1 pt-16 overflow-x-hidden transition-all duration-300 ${sidebarState === 'full' ? 'lg:pl-64' :
          sidebarState === 'partial' ? 'lg:pl-14' :
            'lg:pl-0'
        }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardBody className="overflow-visible p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">{stat.title}</p>
                        <p className="text-xl sm:text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white shadow flex-shrink-0`}>
                        <div className="w-5 h-5 sm:w-6 sm:h-6">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full shadow-xl">
              <CardBody className="flex flex-col justify-center p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-full sm:w-auto">
                    <div className="flex items-center justify-between sm:block">
                      <h3 className="text-xl sm:text-2xl font-bold">Overall Progress</h3>
                      <div className="text-3xl sm:text-5xl font-bold sm:hidden">{completionRate}%</div>
                    </div>
                    <p className="text-white/80 text-sm sm:text-lg mt-1 sm:mt-2">
                      {projectFilter !== 'all'
                        ? `${projects.find(p => p.id === projectFilter)?.name || 'Project'} Progress`
                        : 'All Projects Progress'}
                    </p>
                  </div>
                  <div className="text-3xl sm:text-5xl font-bold hidden sm:block">{completionRate}%</div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-8">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardBody className="text-center p-2 sm:p-4">
                      <p className="text-xl sm:text-3xl font-bold text-white">{stats?.byStatus.pending || 0}</p>
                      <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">Pending</p>
                    </CardBody>
                  </Card>
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardBody className="text-center p-2 sm:p-4">
                      <p className="text-xl sm:text-3xl font-bold text-white">{stats?.byStatus.in_progress || 0}</p>
                      <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">In Progress</p>
                    </CardBody>
                  </Card>
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardBody className="text-center p-2 sm:p-4">
                      <p className="text-xl sm:text-3xl font-bold text-white">{stats?.byStatus.completed || 0}</p>
                      <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">Completed</p>
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="space-y-3 lg:hidden">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="text-default-400 w-4 h-4" />}
                className="w-full"
                variant="bordered"
                size="md"
                isClearable
                onClear={() => setSearchQuery('')}
              />

              <div className="flex gap-2">
                <Select
                  placeholder="Filter"
                  value={statusFilter}
                  onChange={(e) => setFilter('status', e.target.value)}
                  startContent={<Filter className="text-default-400 w-4 h-4" />}
                  className="flex-1"
                  variant="bordered"
                  size="md"
                  defaultSelectedKeys={["active"]}
                  aria-label="Filter tasks by status"
                >
                  <SelectItem key="active" value="active">Active</SelectItem>
                  <SelectItem key="all" value="all">All</SelectItem>
                  <SelectItem key="PENDING" value="PENDING">Pending</SelectItem>
                  <SelectItem key="IN_PROGRESS" value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem key="COMPLETED" value="COMPLETED">Completed</SelectItem>
                </Select>

                <ButtonGroup size="md">
                  <Button
                    color={viewMode === 'cards' ? 'primary' : 'default'}
                    variant={viewMode === 'cards' ? 'solid' : 'flat'}
                    isIconOnly
                    onPress={() => setViewMode('cards')}
                    aria-label="Card view"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    color={viewMode === 'table' ? 'primary' : 'default'}
                    variant={viewMode === 'table' ? 'solid' : 'flat'}
                    isIconOnly
                    onPress={() => setViewMode('table')}
                    aria-label="Table view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <div className="hidden lg:flex gap-3">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="text-default-400 w-5 h-5" />}
                className="flex-1"
                variant="bordered"
                size="md"
                isClearable
                onClear={() => setSearchQuery('')}
              />

              <Select
                placeholder="Filter by status"
                value={statusFilter}
                onChange={(e) => setFilter('status', e.target.value)}
                startContent={<Filter className="text-default-400 w-5 h-5" />}
                className="w-48"
                variant="bordered"
                size="md"
                defaultSelectedKeys={["active"]}
                aria-label="Filter tasks by status"
              >
                <SelectItem key="active" value="active">Active Tasks</SelectItem>
                <SelectItem key="all" value="all">All Tasks</SelectItem>
                <SelectItem key="PENDING" value="PENDING">Pending</SelectItem>
                <SelectItem key="IN_PROGRESS" value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem key="COMPLETED" value="COMPLETED">Completed</SelectItem>
              </Select>

              <ButtonGroup size="md">
                <Button
                  color={viewMode === 'cards' ? 'primary' : 'default'}
                  variant={viewMode === 'cards' ? 'solid' : 'flat'}
                  startContent={<Grid3x3 className="w-5 h-5" />}
                  onPress={() => setViewMode('cards')}
                >
                  Cards
                </Button>
                <Button
                  color={viewMode === 'table' ? 'primary' : 'default'}
                  variant={viewMode === 'table' ? 'solid' : 'flat'}
                  startContent={<List className="w-5 h-5" />}
                  onPress={() => setViewMode('table')}
                >
                  Table
                </Button>
              </ButtonGroup>

              <Button
                color="primary"
                startContent={<Plus className="w-5 h-5" />}
                onPress={() => {
                  resetTaskForm();
                  taskModal.open();
                }}
                size="md"
                className="shadow-lg"
              >
                Add Task
              </Button>
            </div>
          </motion.div>

          {loading ? (
            viewMode === 'cards' ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="p-6 h-[250px]">
                    <Skeleton className="rounded-lg mb-4">
                      <div className="h-8 rounded-lg bg-gray-200"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg mb-2">
                      <div className="h-20 rounded-lg bg-gray-200"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                      <div className="h-6 rounded-lg bg-gray-200"></div>
                    </Skeleton>
                  </Card>
                ))}
              </div>
            ) : (
              <Table className="min-h-[400px]">
                <TableHeader>
                  <TableColumn>TASK</TableColumn>
                  <TableColumn>PROJECT</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>CREATED</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-8 w-full rounded-lg" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-32 rounded-lg" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-lg" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-lg" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-20 rounded-lg" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          ) : filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center min-h-[500px]"
            >
              <Card className="w-full max-w-lg shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-none">
                <CardBody className="p-12">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-full blur-3xl opacity-60 animate-pulse" />
                      </div>
                      <div className="relative">
                        {searchQuery || statusFilter !== 'active' ? (
                          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-default-100 to-default-200 dark:from-default-900/30 dark:to-default-800/30 rounded-full flex items-center justify-center shadow-inner">
                            <Search className="w-14 h-14 text-default-500" />
                          </div>
                        ) : (
                          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center shadow-inner">
                            <CheckSquare className="w-14 h-14 text-primary-600 dark:text-primary-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                        {searchQuery || statusFilter !== 'active'
                          ? 'No tasks found'
                          : 'No active tasks'}
                      </h3>
                      <p className="text-lg text-default-600 dark:text-default-400 max-w-sm mx-auto">
                        {searchQuery || statusFilter !== 'active'
                          ? 'Try adjusting your search criteria or filters to find what you\'re looking for'
                          : 'Your task list is empty. Ready to start something new?'}
                      </p>
                    </div>

                    {!searchQuery && statusFilter === 'active' && (
                      <div className="pt-6 space-y-4">
                        <Button
                          color="primary"
                          onPress={() => taskModal.open()}
                          startContent={<Plus className="w-5 h-5" />}
                          size="lg"
                          className="font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-8"
                        >
                          Create Your First Task
                        </Button>
                      </div>
                    )}

                    {(searchQuery || statusFilter !== 'active') && (
                      <div className="pt-4">
                        <Button
                          variant="light"
                          onPress={() => {
                            setSearchQuery('');
                            setFilter('status', 'active');
                          }}
                          className="text-default-600"
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ) : viewMode === 'cards' ? (
            <motion.div
              className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onEdit={handleEditTask}
                    onDelete={confirmDelete}
                    onStatusUpdate={handleQuickStatusUpdate}
                    onView={handleViewTaskDetails}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Table
                aria-label="Tasks table"
                className="min-h-[400px]"
                shadow="md"
                classNames={{
                  wrapper: "bg-white dark:bg-gray-800",
                  th: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
                  td: "text-gray-700 dark:text-gray-300"
                }}
              >
                <TableHeader>
                  <TableColumn key="title" className="text-xs sm:text-sm font-semibold min-w-[180px]">TASK</TableColumn>
                  <TableColumn key="project" className="text-xs sm:text-sm font-semibold hidden sm:table-cell">PROJECT</TableColumn>
                  <TableColumn key="status" className="text-xs sm:text-sm font-semibold">STATUS</TableColumn>
                  <TableColumn key="date" className="text-xs sm:text-sm font-semibold hidden lg:table-cell">CREATED</TableColumn>
                  <TableColumn key="actions" className="text-xs sm:text-sm font-semibold text-center w-16 sm:w-auto sm:min-w-[120px]">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer" onClick={() => handleViewTaskDetails(task)}>
                      <TableCell className="font-medium">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm sm:text-base truncate">{task.title}</p>
                          {task.description && (
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {task.project ? (
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: task.project.color }}
                            />
                            <span className="text-xs sm:text-sm truncate">{task.project.name}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs sm:text-sm">No project</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="sm:hidden">
                          <Tooltip content={task.status.replace('_', ' ').toLowerCase()}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${task.status === 'COMPLETED' ? 'bg-success-100 dark:bg-success-900/20 text-success-600 dark:text-success-400' :
                                task.status === 'IN_PROGRESS' ? 'bg-warning-100 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400' :
                                  'bg-default-100 dark:bg-default-900/20 text-default-600 dark:text-default-400'
                              }`}>
                              {getStatusIcon(task.status)}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="hidden sm:block">
                          <Chip
                            startContent={getStatusIcon(task.status)}
                            variant="flat"
                            color={getStatusColor(task.status)}
                            size="sm"
                            className="capitalize"
                          >
                            {task.status.replace('_', ' ').toLowerCase()}
                          </Chip>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <div className="hidden sm:flex gap-2">
                            {task.status === 'PENDING' && (
                              <Tooltip content="Start working">
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="warning"
                                  isIconOnly
                                  onPress={() => handleQuickStatusUpdate(task.id, 'IN_PROGRESS')}
                                >
                                  <Clock className="w-4 h-4" />
                                </Button>
                              </Tooltip>
                            )}
                            {task.status !== 'COMPLETED' && (
                              <Tooltip content="Mark as completed">
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="success"
                                  isIconOnly
                                  onPress={() => handleQuickStatusUpdate(task.id, 'COMPLETED')}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              </Tooltip>
                            )}
                            {task.status === 'COMPLETED' && (
                              <Tooltip content="Reopen task">
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="default"
                                  isIconOnly
                                  onPress={() => handleQuickStatusUpdate(task.id, 'PENDING')}
                                >
                                  <Circle className="w-4 h-4" />
                                </Button>
                              </Tooltip>
                            )}
                          </div>

                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Task actions"
                              onAction={(key) => {
                                if (key === 'edit') {
                                  handleEditTask(task);
                                } else if (key === 'delete') {
                                  confirmDelete(task);
                                } else if (key === 'start') {
                                  handleQuickStatusUpdate(task.id, 'IN_PROGRESS');
                                } else if (key === 'complete') {
                                  handleQuickStatusUpdate(task.id, 'COMPLETED');
                                } else if (key === 'reopen') {
                                  handleQuickStatusUpdate(task.id, 'PENDING');
                                }
                              }}
                            >
                              <DropdownSection className="sm:hidden" showDivider>
                                {task.status === 'PENDING' && (
                                  <DropdownItem key="start" startContent={<Clock className="w-4 h-4" />} textValue="Start Working">
                                    Start Working
                                  </DropdownItem>
                                )}
                                {task.status !== 'COMPLETED' && (
                                  <DropdownItem key="complete" startContent={<CheckCircle className="w-4 h-4" />} textValue="Mark Complete">
                                    Mark Complete
                                  </DropdownItem>
                                )}
                                {task.status === 'COMPLETED' && (
                                  <DropdownItem key="reopen" startContent={<Circle className="w-4 h-4" />} textValue="Reopen Task">
                                    Reopen Task
                                  </DropdownItem>
                                )}
                              </DropdownSection>

                              <DropdownItem key="edit" startContent={<Edit2 className="w-4 h-4" />} textValue="Edit Task">
                                Edit Task
                              </DropdownItem>
                              <DropdownItem key="delete" color="danger" startContent={<Trash2 className="w-4 h-4" />} textValue="Delete Task">
                                Delete Task
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {isMobile && (
          <>
            {fabMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20"
                onClick={closeFabMenu}
              />
            )}

            <div className="fixed bottom-6 right-6 z-50">
              <AnimatePresence>
                {fabMenuOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 0 }}
                      animate={{ opacity: 1, scale: 1, y: -140 }}
                      exit={{ opacity: 0, scale: 0.8, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-0 right-0"
                    >
                      <Button
                        isIconOnly
                        color="success"
                        variant="shadow"
                        size="lg"
                        radius="full"
                        onPress={() => {
                          resetTaskForm();
                          taskModal.open();
                          closeFabMenu();
                        }}
                        className="w-12 h-12 shadow-lg"
                        aria-label="Add new task"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                      <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Add Task
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 0 }}
                      animate={{ opacity: 1, scale: 1, y: -70 }}
                      exit={{ opacity: 0, scale: 0.8, y: 0 }}
                      transition={{ delay: 0.05 }}
                      className="absolute bottom-0 right-0"
                    >
                      <Button
                        isIconOnly
                        color="secondary"
                        variant="shadow"
                        size="lg"
                        radius="full"
                        onPress={() => {
                          setSidebarState('full');
                          closeFabMenu();
                        }}
                        className="w-12 h-12 shadow-lg"
                        aria-label="Open projects"
                      >
                        <FolderOpen className="w-5 h-5" />
                      </Button>
                      <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Projects
                      </span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <motion.div
                animate={{ rotate: fabMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  isIconOnly
                  color="primary"
                  variant="shadow"
                  size="lg"
                  radius="full"
                  onPress={toggleFabMenu}
                  className="w-14 h-14 shadow-lg relative z-10"
                  aria-label="Toggle menu"
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <UniversalModal
        isOpen={taskModal.isOpen}
        onClose={() => {
          taskModal.close();
          resetTaskForm();
        }}
        title={taskModal.data ? 'Edit Task' : 'Create New Task'}
        size="2xl"
        primaryLoading={submitting}
        primaryAction={{
          label: taskModal.data ? 'Update' : 'Create',
          onClick: handleTaskSubmit
        }}
      >
        <div className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter task title"
            value={taskFormData.title}
            onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
            variant="bordered"
            isRequired
          />
          <Textarea
            label="Description"
            placeholder="Enter task description (optional)"
            value={taskFormData.description}
            onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
            variant="bordered"
            rows={4}
          />
          <Select
            label="Status"
            placeholder="Select task status"
            selectedKeys={[taskFormData.status]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected) {
                setTaskFormData({ ...taskFormData, status: selected });
              }
            }}
            variant="bordered"
            className="w-full"
          >
            <SelectItem key="PENDING">Pending</SelectItem>
            <SelectItem key="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem key="COMPLETED">Completed</SelectItem>
          </Select>
          <Select
            label="Project"
            placeholder="Select a project (optional)"
            selectedKeys={taskFormData.projectId ? [taskFormData.projectId] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected === 'create-new') {
                projectModal.open();
              } else if (selected === 'none' || !selected) {
                setTaskFormData({ ...taskFormData, projectId: null });
              } else {
                setTaskFormData({ ...taskFormData, projectId: selected });
              }
            }}
            variant="bordered"
            className="w-full"
          >
            <SelectItem key="none">No Project</SelectItem>
            {projects.map((project) => (
              <SelectItem
                key={project.id}
                startContent={
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                }
              >
                {project.name}
              </SelectItem>
            ))}
            <SelectItem
              key="create-new"
              className="text-primary font-semibold"
              startContent={<FolderPlus className="w-4 h-4" />}
            >
              Create New Project
            </SelectItem>
          </Select>
        </div>
      </UniversalModal>

      <UniversalModal
        isOpen={projectModal.isOpen}
        onClose={() => {
          projectModal.close();
          resetProjectForm();
        }}
        title={projectModal.data ? 'Edit Project' : 'Create New Project'}
        size="lg"
        primaryLoading={submitting}
        primaryAction={{
          label: projectModal.data ? 'Update' : 'Create',
          onClick: handleProjectSubmit
        }}
        classNames={{
          wrapper: taskModal.isOpen ? "z-[99999]" : "z-[9999]",
          backdrop: taskModal.isOpen ? "z-[99998]" : "z-[9998]"
        }}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter project name"
            value={projectFormData.name}
            onChange={(e) => {
              setProjectFormData({ ...projectFormData, name: e.target.value });
              if (projectFormErrors.name) {
                setProjectFormErrors({ ...projectFormErrors, name: '' });
              }
            }}
            variant="bordered"
            isRequired
            isInvalid={!!projectFormErrors.name}
            errorMessage={projectFormErrors.name}
            description="Choose a unique name for your project"
          />
          <Textarea
            label="Description"
            placeholder="Enter project description (optional)"
            value={projectFormData.description}
            onChange={(e) => {
              setProjectFormData({ ...projectFormData, description: e.target.value });
              if (projectFormErrors.description) {
                setProjectFormErrors({ ...projectFormErrors, description: '' });
              }
            }}
            variant="bordered"
            rows={3}
            isInvalid={!!projectFormErrors.description}
            errorMessage={projectFormErrors.description}
            description={`${projectFormData.description?.length || 0}/200 characters`}
          />
          <div>
            <label className="text-sm font-medium mb-2 block">Project Color</label>
            <p className="text-xs text-default-500 mb-3">Select a color to identify your project</p>
            <div className="flex gap-2 flex-wrap">
              {projectColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setProjectFormData({ ...projectFormData, color })}
                  className={`w-10 h-10 rounded-lg border-2 ${projectFormData.color === color ? 'border-gray-900 scale-110' : 'border-transparent'
                    } transition-all hover:scale-110`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </UniversalModal>

      <UniversalModal
        isOpen={deleteTaskModal.isOpen}
        onClose={deleteTaskModal.close}
        title="Delete Task"
        size="md"
        primaryAction={{
          label: 'Delete',
          color: 'danger',
          onClick: () => deleteTaskModal.data && handleDeleteTask(deleteTaskModal.data.id)
        }}
        secondaryAction={{
          label: 'Cancel'
        }}
      >
        <p>Are you sure you want to delete "{deleteTaskModal.data?.title}"? This action cannot be undone.</p>
      </UniversalModal>

      <UniversalModal
        isOpen={deleteProjectModal.isOpen}
        onClose={deleteProjectModal.close}
        title="Delete Project"
        size="md"
        primaryAction={{
          label: 'Delete',
          color: 'danger',
          onClick: () => deleteProjectModal.data && handleDeleteProject(deleteProjectModal.data)
        }}
        secondaryAction={{
          label: 'Cancel'
        }}
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete the project "{deleteProjectModal.data?.name}"?</p>
          <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-4">
            <p className="text-sm text-warning-700 dark:text-warning-300">
              <strong>Warning:</strong> This will permanently delete the project and all {deleteProjectModal.data?._count?.tasks || 0} associated tasks. This action cannot be undone.
            </p>
          </div>
        </div>
      </UniversalModal>

      <TaskDetailsModal
        isOpen={taskDetailsModal.isOpen}
        onClose={taskDetailsModal.close}
        task={taskDetailsModal.data}
        onEdit={handleEditTask}
        onDelete={confirmDelete}
        onStatusChange={handleQuickStatusUpdate}
      />
    </div>
  );
};

export default Dashboard;