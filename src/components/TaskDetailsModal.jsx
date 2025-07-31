'use client';
import {
  Button,
  Chip,
  Divider,
  Tooltip
} from '@heroui/react';
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Edit2,
  Trash2,
  Folder,
  FileText,
  Timer
} from 'lucide-react';
import UniversalModal from './UniversalModal';

const TaskDetailsModal = ({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  if (!task) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5" />;
      case 'IN_PROGRESS':
        return <Clock className="w-5 h-5" />;
      default:
        return <Circle className="w-5 h-5" />;
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

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'PENDING':
        return 'IN_PROGRESS';
      case 'IN_PROGRESS':
        return 'COMPLETED';
      case 'COMPLETED':
        return 'PENDING';
      default:
        return 'PENDING';
    }
  };

  const getStatusActionLabel = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Start Working';
      case 'IN_PROGRESS':
        return 'Mark Complete';
      case 'COMPLETED':
        return 'Reopen Task';
      default:
        return 'Update Status';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };

  return (
    <UniversalModal
      isOpen={isOpen}
      onClose={onClose}
      title="Task Details"
      size="lg"
      isDismissable
      hideCloseButton={false}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {task.title}
          </h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <Chip
              startContent={getStatusIcon(task.status)}
              variant="flat"
              color={getStatusColor(task.status)}
              size="md"
              className="capitalize"
            >
              {task.status.replace('_', ' ').toLowerCase()}
            </Chip>
            
            {task.project && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: task.project.color }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {task.project.name}
                </span>
              </div>
            )}
          </div>
        </div>

        <Divider />

        {task.description && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Description</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Created {formatDate(task.createdAt)}
            </span>
          </div>
          
          {task.updatedAt && task.updatedAt !== task.createdAt && (
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Updated {timeSince(task.updatedAt)}
              </span>
            </div>
          )}
          
          {task.project && (
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Project: {task.project.name}
              </span>
            </div>
          )}
        </div>

        <Divider />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            color={task.status === 'COMPLETED' ? 'default' : getStatusColor(getNextStatus(task.status))}
            variant="flat"
            startContent={getStatusIcon(getNextStatus(task.status))}
            onPress={() => onStatusChange(task.id, getNextStatus(task.status))}
            className="flex-1"
          >
            {getStatusActionLabel(task.status)}
          </Button>
          
          <div className="flex gap-3 flex-1 sm:flex-initial">
            <Button
              color="primary"
              variant="flat"
              startContent={<Edit2 className="w-4 h-4" />}
              onPress={() => {
                onClose();
                onEdit(task);
              }}
              className="flex-1"
            >
              Edit
            </Button>
            
            <Tooltip content="Delete task" placement="top">
              <Button
                color="danger"
                variant="flat"
                isIconOnly
                onPress={() => {
                  onClose();
                  onDelete(task);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </UniversalModal>
  );
};

export default TaskDetailsModal;