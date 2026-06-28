import TaskItem from './TaskItem';
import { FiFilter, FiList } from 'react-icons/fi';

const TaskList = ({ tasks, onDelete, onEdit, filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <div className="task-controls">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiList /> Your Tasks
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="filter-group">
            <FiFilter color="var(--text-muted)" />
            <select name="status" className="form-control" style={{ padding: '0.5rem' }} value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <select name="priority" className="form-control" style={{ padding: '0.5rem' }} value={filters.priority} onChange={handleFilterChange}>
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="filter-group">
            <select name="sortBy" className="form-control" style={{ padding: '0.5rem' }} value={filters.sortBy} onChange={handleFilterChange}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <FiList />
          <h3>No tasks found</h3>
          <p>Create a new task to get started, or adjust your filters.</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onDelete={onDelete} 
              onEdit={onEdit} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
