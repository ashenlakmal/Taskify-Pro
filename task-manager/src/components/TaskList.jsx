import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
// Importing professional icons for the list view, pagination, and statistics
import { FiInbox, FiList, FiCheckCircle, FiClock, FiActivity, FiTarget, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TaskList = ({ tasks, onDelete, onStatusUpdate, onEdit }) => {

    // ------------------------------------------------------------------------
    // PAGINATION STATE & LOGIC
    // ------------------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5; // Display 5 tasks per page to keep UI clean and manageable

    // Reset to page 1 whenever the tasks array changes (e.g., when a user searches or filters)
    useEffect(() => {
        setCurrentPage(1);
    }, [tasks]);

    // Calculate pagination boundaries
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;

    // The specific tasks to display on the current page
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    // Handlers for Next/Prev buttons
    const paginateNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const paginatePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // ------------------------------------------------------------------------
    // STATISTICS CALCULATION
    // ------------------------------------------------------------------------
    const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'Pending').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        completed: tasks.filter(t => t.status === 'Completed').length
    };

    // Reusable UI component for the glowing Statistics Cards
    const StatCard = ({ title, count, icon, colorClass, borderClass }) => (
        <div className={`p-5 glass-effect rounded-3xl border ${borderClass} transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] flex items-center justify-between group`}>
            <div>
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-slate-400">{title}</p>
                <h4 className={`text-4xl font-extrabold ${colorClass} drop-shadow-sm`}>{count}</h4>
            </div>
            <div className={`p-4 rounded-full shadow-inner ${borderClass.replace('border-', 'bg-').replace('/30', '/10')} ${colorClass} group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
        </div>
    );

    return (
        <div className="relative z-10 w-full mb-10 animate-fade-in">

            {/* 1. ANIMATED STATISTICS BLOCKS (New Feature) */}
            <div className="relative grid grid-cols-2 gap-4 mb-10 lg:grid-cols-4">
                <StatCard title="Total Tasks" count={stats.total} icon={<FiTarget size={28} />} colorClass="text-indigo-400" borderClass="border-indigo-500/30" />
                <StatCard title="Pending" count={stats.pending} icon={<FiClock size={28} />} colorClass="text-orange-400" borderClass="border-orange-500/30" />
                <StatCard title="In Progress" count={stats.inProgress} icon={<FiActivity size={28} />} colorClass="text-cyan-400" borderClass="border-cyan-500/30" />
                <StatCard title="Completed" count={stats.completed} icon={<FiCheckCircle size={28} />} colorClass="text-emerald-400" borderClass="border-emerald-500/30" />
            </div>

            {/* ------------------------------------------------------------------------ */}
            {/* EMPTY STATE VIEW */}
            {/* ------------------------------------------------------------------------ */}
            {tasks.length === 0 ? (
                <div className="relative flex flex-col items-center justify-center p-20 text-center transition-all duration-500 overflow-hidden glass-effect rounded-3xl border border-white/5 group hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="relative flex items-center justify-center mb-8 transition-colors duration-500 border rounded-full shadow-inner w-28 h-28 bg-slate-900/50 border-indigo-500/30 group-hover:bg-slate-900/80">
                        <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20"></div>
                        <FiInbox className="text-5xl text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1" />
                    </div>

                    <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                        Workspace is Clear!
                    </h3>
                    <p className="max-w-md text-lg font-medium leading-relaxed text-slate-400">
                        No tasks found matching your criteria. Add a new task above or adjust your smart filters to continue.
                    </p>
                </div>
            ) : (

                /* ------------------------------------------------------------------------ */
                /* POPULATED LIST VIEW (WITH PAGINATION) */
                /* ------------------------------------------------------------------------ */
                <div>
                    {/* List Header Section */}
                    <div className="flex items-center justify-between pl-2 pr-2 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-inner">
                                <FiList className="text-2xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                            </div>
                            <h2 className="text-2xl font-extrabold tracking-widest uppercase text-slate-100 drop-shadow-sm">
                                Your Tasks
                            </h2>
                        </div>

                        {/* Premium Pagination Info Badge */}
                        <div className="flex items-center gap-3 px-5 py-2.5 font-bold border text-slate-300 bg-slate-900/60 border-slate-700/50 backdrop-blur-md rounded-2xl shadow-inner">
                            <span className="text-sm tracking-wide uppercase text-slate-400">Page</span>
                            <span className="flex items-center justify-center px-3 py-1 text-indigo-300 border rounded-full bg-indigo-500/20 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                {currentPage} / {totalPages}
                            </span>
                        </div>
                    </div>

                    {/* Rendered Task Items Container (Using currentTasks instead of all tasks) */}
                    <div className="space-y-6">
                        {currentTasks.map((task) => (
                            <TaskItem
                                key={task._id || task.id} // Seamless support for MongoDB _id
                                task={task}
                                onDelete={onDelete}
                                onStatusUpdate={onStatusUpdate}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>

                    {/* ------------------------------------------------------------------------ */}
                    {/* PAGINATION CONTROLS */}
                    {/* ------------------------------------------------------------------------ */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-12 mb-6">

                            {/* Previous Button */}
                            <button
                                onClick={paginatePrev}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-2 px-6 py-3 font-extrabold rounded-2xl transition-all duration-300 ${currentPage === 1 ? 'bg-slate-900/40 text-slate-600 border border-slate-800 cursor-not-allowed' : 'bg-slate-800 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]'}`}
                            >
                                <FiChevronLeft size={20} /> Prev
                            </button>

                            {/* Page Numbers */}
                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`w-12 h-12 flex items-center justify-center font-extrabold rounded-2xl transition-all duration-300 border ${currentPage === index + 1 ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-900/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-indigo-300'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={paginateNext}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-2 px-6 py-3 font-extrabold rounded-2xl transition-all duration-300 ${currentPage === totalPages ? 'bg-slate-900/40 text-slate-600 border border-slate-800 cursor-not-allowed' : 'bg-slate-800 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]'}`}
                            >
                                Next <FiChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskList;