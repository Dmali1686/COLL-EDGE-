import { FiEdit2, FiTrash2, FiClock } from 'react-icons/fi';

const TaskItem = ({ task, onDelete, onEdit }) => {
  const statusClass = `badge badge-status-${task.status.toLowerCase().replace(' ', '')}`;
  const priorityClass = `badge badge-priority-${task.priority.toLowerCase()}`;

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <div className="task-title">
          {task.title}
        </div>
        <div className="task-desc">
          {task.description}
        </div>
        <div className="task-meta">
          <span className={statusClass}>{task.status}</span>
          <span className={priorityClass}>{task.priority} Priority</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
            <FiClock /> {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button 
          className="icon-btn edit" 
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          <FiEdit2 size={18} />
        </button>
        <button 
          className="icon-btn delete" 
          onClick={() => onDelete(task._id)}
          title="Delete Task"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
