import { Link } from "react-router-dom";
import dateFormatter from "../../../components/utils/dateFormatter";
import "../components/TaskGrid.css";

const TaskGrid = ({ tasks, loading }) => {
  return (
    <div className="task-grid">
      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : (
        <>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Link
                className="task-card"
                to={`/tasks/${task._id}`}
                key={task._id}
              >
                <div className="card-body">
                  <h3 className="card-title">{task.title}</h3>
                  <p className="card-text">{task.description}</p>
                </div>
                <div className="card-footer">
                  <span className={`status-tab ${task.status ? "completed" : "pending"}`}>
                    {task.status ? "Completed" : "Pending"}
                  </span>
                  <span className="deadline-tab">
                    Deadline: {dateFormatter(task.deadline)}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-tasks">
              No tasks found. Kindly create a new task using the button above.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskGrid;
