import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Home.css";
import TaskGrid from "./TaskGrid"; // Assuming TaskGrid component is in the same directory

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [username, setUsername] = useState("");

    // Function to fetch tasks from the backend API
    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            setTasks(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    // Effect hook to load user details and tasks on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            setUsername(decoded.username);
            getTasks();
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="container">
            <header className="header">
                <h1 className="header-title">Welcome, {username}!</h1>
            </header>
            <main className="main">
                <h2 className="main-title">Your tasks:</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <TaskGrid tasks={tasks} loading={loading} />
                )}
                <button className="btn btn-primary" onClick={() => navigate("/new_task")}>
                    Add Task
                </button>
            </main>
        </div>
    );
};

export default Home;
