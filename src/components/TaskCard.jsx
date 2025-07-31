'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Divider
} from '@heroui/react';
import {
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Circle,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({
  task,
  index,
  onEdit,
  onDelete,
  onStatusUpdate,
  onView
}) => {
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.02 }}
    >
      <Card
        className="hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border-1 border-gray-200 dark:border-gray-700 h-full min-h-[280px]"
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start w-full gap-2">
            <div className="flex-1 min-w-0">
              <h3 
                className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => onView(task)}
              >
                {task.title}
              </h3>
              {task.project && (
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-4 h-4 rounded flex-shrink-0"
                    style={{ backgroundColor: task.project.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {task.project.name}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Chip
                startContent={getStatusIcon(task.status)}
                variant="flat"
                color={getStatusColor(task.status)}
                size="sm"
                className="capitalize"
              >
                {task.status.replace('_', ' ').toLowerCase()}
              </Chip>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    radius="full"
                    className="text-default-500"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Task actions"
                  onAction={(key) => {
                    if (key === 'edit') {
                      onEdit(task);
                    } else if (key === 'delete') {
                      onDelete(task);
                    }
                  }}
                >
                  <DropdownItem
                    key="edit"
                    startContent={<Edit2 className="w-4 h-4" />}
                    textValue="Edit Task"
                  >
                    Edit Task
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    color="danger"
                    startContent={<Trash2 className="w-4 h-4" />}
                    textValue="Delete Task"
                  >
                    Delete Task
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="py-4 flex-1">
          {task.description ? (
            <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-4 mb-4">
              {task.description}
            </p>
          ) : (
            <p className="text-base text-gray-400 dark:text-gray-500 italic mb-4">
              No description provided
            </p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-auto">
            <Calendar className="w-4 h-4" />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </CardBody>

        <Divider />

        <CardFooter className="gap-2 py-3">
          <div className="flex gap-2 w-full">
            {task.status !== 'COMPLETED' && (
              <Tooltip content="Mark as completed">
                <Button
                  size="sm"
                  variant="flat"
                  color="success"
                  isIconOnly
                  radius="lg"
                  onClick={() => onStatusUpdate(task.id, 'COMPLETED')}
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}
            {task.status === 'PENDING' && (
              <Tooltip content="Start working">
                <Button
                  size="sm"
                  variant="flat"
                  color="warning"
                  isIconOnly
                  radius="lg"
                  onClick={() => onStatusUpdate(task.id, 'IN_PROGRESS')}
                >
                  <Clock className="w-4 h-4" />
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
                  radius="lg"
                  onClick={() => onStatusUpdate(task.id, 'PENDING')}
                >
                  <Circle className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskCard;