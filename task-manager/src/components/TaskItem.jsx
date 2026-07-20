import React, { useState } from 'react';
// Imported consistent premium icons across the app
import { FiEdit2, FiTrash2, FiCheck, FiClock, FiSave, FiX, FiAlertCircle, FiType, FiCalendar, FiAlignLeft, FiFlag, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TaskItem = ({ task, onDelete, onStatusUpdate, onEdit }) => {
    // Managing component states
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(task);

    // Dynamic state updates for inline editing
    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Save modifications logic
    const handleSave = () => {
        if (!editData.title.trim() || !editData.dueDate) return;
        onEdit(editData);
        setIsEditing(false);
        toast.success('Task updated!', { style: { background: '#1e293b', color: '#fff' } });
    };

    // Custom Interactive Premium Delete Confirmation Toast
    const handleDeleteClick = () => {
        toast((t) => (
            <div className="flex flex-col gap-4 p-1">
                <div className="flex items-start gap-4">
                    <div className="p-3 border rounded-full shadow-inner text-rose-400 bg-rose-500/10 border-rose-500/20">
                        <FiAlertCircle size={28} />
                    </div>
                    <div>
                        <h4 className="text-lg font-extrabold text-white">Delete this task?</h4>
                        <p className="mt-1 text-sm font-medium text-slate-400">This action cannot be undone.</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-5 py-2.5 text-sm font-bold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onDelete(task.id); toast.dismiss(t.id); }}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-rose-600 rounded-xl hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-shadow"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 6000,
            style: {
                background: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(225,29,72,0.3)',
                backdropFilter: 'blur(16px)'
            }
        });
    };

    // Priority configuration mapping
    const priorityStyles = {
        High: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-sm',
        Medium: 'bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-sm',
        Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm'
    };

    const isCompleted = task.status === 'Completed';

    // Reusable styles for edit mode inputs to match main form
    const inputClasses = "w-full bg-slate-900/50 border border-slate-700/50 p-3.5 pl-11 rounded-xl outline-none focus:bg-slate-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-100 placeholder-slate-500";
    const iconContainerClasses = "absolute left-3.5 text-slate-500 transition-colors duration-300 group-focus-within:text-indigo-400 pointer-events-none";

    // ------------------------------------------------------------------------
    // EDIT MODE UI
    // ------------------------------------------------------------------------
    if (isEditing) {
        return (
            <div className="glass-effect p-6 rounded-3xl mb-6 scale-[1.02] shadow-[0_0_40px_rgba(99,102,241,0.15)] border border-indigo-500/30 relative">
                <h4 className="mb-4 text-xs font-extrabold tracking-widest text-indigo-400 uppercase">
                    Editing Task Mode
                </h4>
                <div className="relative z-10 grid grid-cols-1 gap-5 mb-6 md:grid-cols-2">

                    <div className="relative flex items-center group">
                        <div className={iconContainerClasses}><FiType size={16} /></div>
                        <input type="text" name="title" value={editData.title} onChange={handleChange} className={inputClasses} placeholder="Task Title" />
                    </div>

                    <div className="relative flex items-center group">
                        <div className={iconContainerClasses}><FiCalendar size={16} /></div>
                        <input type="date" name="dueDate" value={editData.dueDate} onChange={handleChange} className={inputClasses} style={{ colorScheme: 'dark' }} />
                    </div>

                    <div className="relative group md:col-span-2">
                        <div className={`${iconContainerClasses} top-4`}><FiAlignLeft size={16} /></div>
                        <textarea name="description" value={editData.description} onChange={handleChange} className={`${inputClasses} resize-none pl-11`} rows="2" placeholder="Task Description"></textarea>
                    </div>

                    <div className="relative flex items-center group md:col-span-2">
                        <div className={iconContainerClasses}><FiFlag size={16} /></div>
                        <select name="priority" value={editData.priority} onChange={handleChange} className={`${inputClasses} cursor-pointer appearance-none pr-10`}>
                            <option value="High" className="bg-slate-900">High Priority</option>
                            <option value="Medium" className="bg-slate-900">Medium Priority</option>
                            <option value="Low" className="bg-slate-900">Low Priority</option>
                        </select>
                        <div className="absolute right-3.5 text-slate-400 pointer-events-none"><FiChevronDown size={18} /></div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={() => { setEditData(task); setIsEditing(false); }} className="px-5 py-2.5 font-extrabold text-slate-300 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2">
                        <FiX size={16} /> Cancel
                    </button>
                    <button onClick={handleSave} className="px-5 py-2.5 bg-indigo-600 text-white font-extrabold rounded-xl hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-shadow flex items-center gap-2">
                        <FiSave size={16} /> Update Task
                    </button>
                </div>
            </div>
        );
    }

    // ------------------------------------------------------------------------
    // DISPLAY MODE UI
    // ------------------------------------------------------------------------
    return (
        <div className={`glass-effect p-6 rounded-3xl mb-5 transition-all duration-300 hover:border-slate-500/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group ${isCompleted ? 'opacity-60 grayscale-[20%]' : ''}`}>

            <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className={`font-extrabold text-xl sm:text-2xl tracking-tight transition-colors ${isCompleted ? 'line-through text-slate-500' : 'text-slate-100 group-hover:text-indigo-300'}`}>
                        {task.title}
                    </h3>
                    <span className={`text-xs px-3.5 py-1 rounded-full border font-extrabold uppercase tracking-widest ${priorityStyles[task.priority]}`}>
                        {task.priority}
                    </span>
                </div>

                <p className="mb-5 text-sm font-medium leading-relaxed text-slate-400">
                    {task.description || <span className="italic opacity-50">No description provided</span>}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold">
                    <span className="flex items-center gap-1.5 bg-slate-900/60 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-700/50 shadow-inner">
                        <FiClock className="text-cyan-400" size={16} /> Due: {task.dueDate}
                    </span>
                    <span className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border shadow-inner ${isCompleted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : task.status === 'In Progress' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'}`}>
                        Status: {task.status}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-end w-full gap-3 pt-5 border-t border-slate-700/50 sm:w-auto sm:pt-0 sm:border-none">
                <button
                    onClick={() => onStatusUpdate(task.id, isCompleted ? 'Pending' : 'Completed')}
                    className={`p-3.5 rounded-2xl flex items-center gap-2 transition-all shadow-sm ${isCompleted ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30'}`}
                    title={isCompleted ? "Mark Pending" : "Mark Complete"}
                >
                    {isCompleted ? <FiClock size={20} /> : <FiCheck size={20} strokeWidth={3} />}
                </button>
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-3.5 text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                    title="Edit Task"
                >
                    <FiEdit2 size={20} />
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="p-3.5 text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                    title="Delete Task"
                >
                    <FiTrash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;