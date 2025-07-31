'use client';
import { useState, useCallback } from 'react';
import axios from 'axios';

const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/tasks', taskData);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to create task';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (taskId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, updates);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update task';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to delete task';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskStatus = useCallback(async (taskId, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/tasks/${taskId}/status`, { status });
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update task status';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/tasks');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to fetch tasks';
      setError(message);
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