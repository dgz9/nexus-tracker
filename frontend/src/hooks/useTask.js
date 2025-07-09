import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/tasks', taskData);
      toast.success('Task created successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to create task';
      setError(message);
      toast.error(message);
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
      toast.success('Task updated successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update task';
      setError(message);
      toast.error(message);
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
      toast.success('Task deleted successfully!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to delete task';
      setError(message);
      toast.error(message);
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
      toast.success('Task status updated!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update task status';
      setError(message);
      toast.error(message);
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
      toast.error(message);
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