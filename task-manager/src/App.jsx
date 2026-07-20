import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';

function App() {
  // ------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------------------------------------------
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTime, setFilterTime] = useState('All');

  // API Base URL for the Local MongoDB Backend
  const API_URL = 'http://localhost:5000/api/tasks';

  // ------------------------------------------------------------------------
  // DATABASE INTEGRATION (CRUD OPERATIONS)
  // ------------------------------------------------------------------------

  // READ: Fetch all tasks from the MongoDB database on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Could not connect to the database!');
      }
    };
    fetchTasks();
  }, []);

  // CREATE: Send a new task to the database
  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) throw new Error('Failed to add task');
      const savedTask = await response.json();

      // Update local state immediately for a snappy UI
      setTasks([savedTask, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to save task to database.');
    }
  };

  // DELETE: Remove a task from the database
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete task');

      // Update local state
      setTasks(tasks.filter(task => (task._id || task.id) !== taskId));
      toast.success('Task permanently deleted.', { style: { background: '#1e293b', color: '#fff' } });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task.');
    }
  };

  // UPDATE: Toggle task status in the database
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update status');
      const updatedTaskData = await response.json();

      // Update local state
      setTasks(tasks.map(task =>
        (task._id || task.id) === taskId ? updatedTaskData : task
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status.');
    }
  };

  // UPDATE: Save comprehensive edits to the database
  const handleEditTask = async (updatedTask) => {
    try {
      const taskId = updatedTask._id || updatedTask.id;
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      if (!response.ok) throw new Error('Failed to edit task');
      const savedTaskData = await response.json();

      // Update local state
      setTasks(tasks.map(task =>
        (task._id || task.id) === taskId ? savedTaskData : task
      ));
    } catch (error) {
      console.error('Error editing task:', error);
      toast.error('Failed to update task.');
    }
  };

  // ------------------------------------------------------------------------
  // ADVANCED FILTERING LOGIC
  // ------------------------------------------------------------------------
  const filteredTasks = tasks.filter(task => {
    // 1. Basic Status & Priority Matches
    const matchStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchPriority = filterPriority === 'All' || task.priority === filterPriority;

    // 2. Search Query Match (Checks both Title and Description)
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = task.title.toLowerCase().includes(searchLower) ||
      (task.description && task.description.toLowerCase().includes(searchLower));

    // 3. Time-based Match (Overdue vs Due Soon)
    let matchTime = true;
    if (filterTime !== 'All') {
      if (task.status === 'Completed') {
        matchTime = false; // Completed tasks aren't overdue or due soon
      } else {
        const targetDate = new Date(`${task.dueDate}T23:59:59`);
        const now = new Date();
        const diffHours = (targetDate - now) / (1000 * 60 * 60);

        if (filterTime === 'Overdue') {
          matchTime = diffHours < 0;
        } else if (filterTime === 'Due Soon') {
          matchTime = diffHours >= 0 && diffHours <= 48; // Due within next 48 hours
        }
      }
    }

    return matchStatus && matchPriority && matchSearch && matchTime;
  });

  // ------------------------------------------------------------------------
  // APPLICATION RENDERING
  // ------------------------------------------------------------------------
  return (
    <div className="relative min-h-screen p-4 overflow-hidden sm:p-6 lg:p-10 selection:bg-indigo-500/30 selection:text-indigo-200">

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

          {/* Filter Bar with new Props passed in */}
          <div className="z-20 mb-2 xl:sticky xl:top-10">
            <FilterBar
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterTime={filterTime}
              setFilterTime={setFilterTime}
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