import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dateFormatter from "../../components/utils/dateFormatter";
import "./Task.css";

const Task = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTask = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/tasks/${id}`);
            setTask(response.data);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this task?");
            if (!confirm) return;
            await axios.delete(`http://localhost:4000/api/tasks/${id}`);
            navigate("/");
        } catch (e) {
            setError(e.message);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8">{error}</div>;

    return (
        <div className="p-8">
            <div className="card task-main">
                <div className="card-body flex justify-between items-start">
                    <div>
                        <h1>{task.title}</h1>
                        <p>{task.description}</p>
                        <p>Created on: {dateFormatter(task.created_on)}</p>
                        <p>Deadline: {dateFormatter(task.deadline)}</p>
                        <p>Status: {task.status ? "Completed" : "Pending"}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/tasks/${id}/edit`)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
