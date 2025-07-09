import { useState, useCallback } from 'react';
import axios from 'axios';
import { addToast } from '@heroui/react';

const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/tasks', taskData);
      addToast({ title: "Success", description: "Task created successfully!", color: "success", timeout: 5000 });
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to create task';
      setError(message);
      addToast({ title: "Error", description: message, color: "danger", timeout: 5000 });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (taskId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/tasks/${taskId}`, updates);
      addToast({ title: "Success", description: "Task updated successfully!", color: "success", timeout: 5000 });
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update task';
      setError(message);
      addToast({ title: "Error", description: message, color: "danger", timeout: 5000 });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/tasks/${taskId}`);
      addToast({ title: "Success", description: "Task deleted successfully!", color: "success", timeout: 5000 });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to delete task';
      setError(message);
      addToast({ title: "Error", description: message, color: "danger", timeout: 5000 });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskStatus = useCallback(async (taskId, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/tasks/${taskId}/status`, { status });
      addToast({ title: "Success", description: "Task status updated!", color: "success", timeout: 5000 });
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update task status';
      setError(message);
      addToast({ title: "Error", description: message, color: "danger", timeout: 5000 });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/tasks');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to fetch tasks';
      setError(message);
      addToast({ title: "Error", description: message, color: "danger", timeout: 5000 });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    fetchTasks,
    clearError
  };
};

export default useTask;