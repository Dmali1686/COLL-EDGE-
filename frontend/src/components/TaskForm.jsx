import { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

const TaskForm = ({ onSave, editingTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority
      });
    } else {
      setFormData({ title: '', description: '', status: 'Pending', priority: 'Medium' });
    }
    setError('');
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and Description are required.');
      return;
    }
    
    try {
      await onSave(formData);
      if (!editingTask) {
        setFormData({ title: '', description: '', status: 'Pending', priority: 'Medium' });
      }
      setError('');
    } catch (err) {
      setError('Failed to save task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 style={{ marginBottom: '1.5rem' }}>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          placeholder="Add details about this task..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button type="submit" className="btn">
          <FiSave /> {editingTask ? 'Update Task' : 'Save Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            <FiX /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
