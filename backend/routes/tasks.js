const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authenticate = require('../middleware/auth');
const prisma = require('../utils/prisma');

router.get('/', authenticate, async (req, res) => {
  try {
    const { projectId } = req.query;
    const where = { userId: req.userId };
    
    if (projectId) {
      where.projectId = projectId;
    }
    
    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/', authenticate, [
  body('title').trim().notEmpty(),
  body('description').optional().trim(),
  body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  body('projectId').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, projectId } = req.body;
    
    if (projectId) {
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId
        }
      });
      
      if (!project) {
        return res.status(400).json({ error: 'Invalid project' });
      }
    }
    
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'PENDING',
        userId: req.userId,
        projectId
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      }
    });
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/:id', authenticate, [
  body('title').trim().notEmpty(),
  body('description').optional().trim(),
  body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  body('projectId').optional({ nullable: true })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, status, projectId } = req.body;
    
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (projectId) {
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId
        }
      });
      
      if (!project) {
        return res.status(400).json({ error: 'Invalid project' });
      }
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status: status || existingTask.status,
        projectId: projectId !== undefined ? projectId : existingTask.projectId
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      }
    });
    
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

router.get('/stats', authenticate, async (req, res) => {
  try {
    const { projectId } = req.query;
    const where = { userId: req.userId };
    
    if (projectId) {
      where.projectId = projectId;
    }
    
    const stats = await prisma.task.groupBy({
      by: ['status'],
      where,
      _count: true
    });

    const total = await prisma.task.count({ where });

    const projectCount = await prisma.project.count({
      where: { userId: req.userId }
    });

    res.json({
      total,
      projectCount,
      byStatus: stats.reduce((acc, curr) => {
        acc[curr.status.toLowerCase()] = curr._count;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

module.exports = router;