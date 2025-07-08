import { useState, useEffect } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
  Chip,
  ScrollShadow,
  Avatar
} from '@heroui/react';
import {
  Bell,
  Clock,
  FolderOpen,
  MessageSquare
} from 'lucide-react';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'task_due',
        title: '3 tasks due today',
        message: 'You have tasks that need attention',
        icon: <Clock className="w-4 h-4" />,
        color: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false
      },
      {
        id: 2,
        type: 'project_update',
        title: 'Project "Design System" updated',
        message: 'New tasks have been added',
        icon: <FolderOpen className="w-4 h-4" />,
        color: 'primary',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false
      },
      {
        id: 3,
        type: 'comment',
        title: 'New comment on "Fix login bug"',
        message: 'John: Can you check this?',
        icon: <MessageSquare className="w-4 h-4" />,
        color: 'default',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, [userId]);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };


  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Badge 
      content={unreadCount} 
      color="danger" 
      shape="circle"
      size="sm"
      isInvisible={unreadCount === 0}
      className="border-2 border-white dark:border-gray-900"
    >
      <Popover 
        placement="bottom-end"
        showArrow
        offset={10}
        classNames={{
          content: "p-0 bg-content1 max-w-[400px]",
        }}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            radius="full"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-divider">
              <h3 className="text-lg font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <Chip size="sm" color="danger" variant="flat">
                  {unreadCount} new
                </Chip>
              )}
            </div>
            
            <ScrollShadow className="max-h-[400px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-default-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-default-300" />
                  <p className="text-sm">No notifications yet</p>
                  <p className="text-xs mt-1">We'll notify you when something important happens</p>
                </div>
              ) : (
                <div className="divide-y divide-divider">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-default-100 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <Avatar
                          icon={notification.icon}
                          classNames={{
                            base: `bg-${notification.color}-100 dark:bg-${notification.color}-900/20`,
                            icon: `text-${notification.color}-600 dark:text-${notification.color}-400`
                          }}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <p className="text-xs text-default-500 mt-0.5">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-default-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollShadow>
            
            {notifications.length > 0 && (
              <div className="border-t border-divider p-3">
                <Button
                  fullWidth
                  size="sm"
                  variant="light"
                  color="primary"
                  onPress={() => {
                  }}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </Badge>
  );
};

export default Notifications;