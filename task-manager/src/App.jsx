import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';

function App() {
  // State management for the tasks array and active filters
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  // Initialize application state from local storage on first load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('myTasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Utility function to sync state changes with the browser's local storage
  const updateStorage = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('myTasks', JSON.stringify(newTasks));
  };

  // Handler to append a new task to the existing list
  const handleAddTask = (newTask) => {
    updateStorage([...tasks, newTask]);
  };

  // Handler to completely remove a task by its unique ID
  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    updateStorage(filteredTasks);
  };

  // Handler to toggle or update the completion status of a specific task
  const handleStatusUpdate = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    updateStorage(updatedTasks);
  };

  // Handler to save modifications made to an existing task during edit mode
  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    updateStorage(updatedTasks);
  };

  // Compute the derived state for filtered tasks dynamically
  const filteredTasks = tasks.filter(task => {
    const matchStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchStatus && matchPriority;
  });

  return (
    <div className="relative min-h-screen p-4 overflow-hidden sm:p-6 lg:p-10 selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Note: Fixed ambient glow divs removed here to let the pure CSS animated gradient shine completely */}

      {/* Global Premium Toast Notification Configuration */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.85)',
            color: '#f8fafc',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            fontWeight: '600',
            padding: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }
        }}
      />

      {/* Main Application Layout Container */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8 xl:gap-12 relative items-start z-10">

        {/* Left Column: Branding and Task Creation Form */}
        <div className="z-10 flex flex-col w-full xl:w-5/12 xl:sticky xl:top-10">
          <header className="mb-10 text-left transition-transform duration-500 transform hover:translate-x-2">
            <h1 className="mb-3 text-5xl font-extrabold tracking-tighter text-white lg:text-6xl drop-shadow-lg">
              Taskify <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Pro</span>
            </h1>
            <p className="max-w-md text-lg font-medium leading-relaxed lg:text-xl text-slate-400">
              Elevate your productivity. Organize, prioritize, and conquer your daily workflow with unparalleled elegance.
            </p>
          </header>

          <TaskForm onSave={handleAddTask} />
        </div>

        {/* Right Column: Filters and Task List View */}
        <div className="flex flex-col w-full min-h-screen pb-20 xl:w-7/12">
          <div className="z-20 mb-2 xl:sticky xl:top-10">
            <FilterBar
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
            />
          </div>

          <div className="relative z-10 flex-1 w-full pt-4">
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              onStatusUpdate={handleStatusUpdate}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;