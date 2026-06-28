import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import './index.css'; // Ensure the CSS is loaded

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', sortBy: 'newest' });

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks(filters);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const { data } = await updateTask(editingTask._id, taskData);
        setTasks(tasks.map(t => t._id === data._id ? data : t));
        setEditingTask(null);
      } else {
        const { data } = await createTask(taskData);
        setTasks([data, ...tasks]); // Add to top assuming default 'newest' sort
      }
    } catch (error) {
      console.error('Error saving task', error);
      throw error; // Let form handle the error response if needed
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <header className="header animate-fade-in">
        <h1>Taskflow</h1>
        <p>Manage your tasks with style and efficiency.</p>
      </header>

      <div className="glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <TaskForm 
          onSave={handleSaveTask} 
          editingTask={editingTask} 
          onCancel={() => setEditingTask(null)} 
        />
      </div>

      <div className="glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <TaskList 
          tasks={tasks} 
          onDelete={handleDeleteTask} 
          onEdit={handleEditClick}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
}

export default App;
