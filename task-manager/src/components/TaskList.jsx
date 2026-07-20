import React from 'react';
import TaskItem from './TaskItem';
// Importing professional icons for the list view
import { FiInbox, FiList } from 'react-icons/fi';

const TaskList = ({ tasks, onDelete, onStatusUpdate, onEdit }) => {

    // ------------------------------------------------------------------------
    // EMPTY STATE VIEW
    // Rendered when there are absolutely no tasks in the array
    // ------------------------------------------------------------------------
    if (tasks.length === 0) {
        return (
            <div className="relative flex flex-col items-center justify-center p-20 text-center transition-all duration-500 overflow-hidden glass-effect rounded-3xl border border-white/5 group hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]">

                {/* Subtle background glow effect for the empty state */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                {/* Animated Inbox Icon Container */}
                <div className="relative flex items-center justify-center mb-8 transition-colors duration-500 border rounded-full shadow-inner w-28 h-28 bg-slate-900/50 border-indigo-500/30 group-hover:bg-slate-900/80">
                    <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20"></div>
                    <FiInbox className="text-5xl text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1" />
                </div>

                <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                    Your Workspace is Clear!
                </h3>
                <p className="max-w-md text-lg font-medium leading-relaxed text-slate-400">
                    You currently have no pending tasks. Take a well-deserved break or add a new task above to kickstart your productivity workflow.
                </p>
            </div>
        );
    }

    // ------------------------------------------------------------------------
    // POPULATED LIST VIEW
    // Rendered when there are tasks available to display
    // ------------------------------------------------------------------------
    return (
        <div className="relative z-10 mt-8 mb-20 animate-fade-in">

            {/* List Header Section */}
            <div className="flex items-center justify-between pl-2 pr-2 mb-8">

                {/* Title Area */}
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <FiList className="text-2xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-widest uppercase text-slate-100 drop-shadow-sm">
                        Your Tasks
                    </h2>
                </div>

                {/* Premium Task Count Badge */}
                <div className="flex items-center gap-3 px-5 py-2.5 font-bold border text-slate-300 bg-slate-900/60 border-slate-700/50 backdrop-blur-md rounded-2xl shadow-inner">
                    <span className="text-sm tracking-wide uppercase text-slate-400">Total</span>
                    <span className="flex items-center justify-center w-8 h-8 text-indigo-300 border rounded-full bg-indigo-500/20 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Rendered Task Items Container */}
            <div className="space-y-6">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onStatusUpdate={onStatusUpdate}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;