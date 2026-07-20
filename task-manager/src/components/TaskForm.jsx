import React, { useState } from 'react';
import toast from 'react-hot-toast';
// Imported beautiful icons
import { FiPlus, FiAlertCircle, FiCheckCircle, FiChevronDown, FiFlag, FiType, FiCalendar, FiAlignLeft } from 'react-icons/fi';

const TaskForm = ({ onSave }) => {
    // Initializing state for the task object exactly as requested
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'Pending'
    });

    // Handle dynamic updates for all input fields
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    // Handle the submission of the task form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Strict Validation: Ensure title is provided
        if (!task.title.trim()) {
            toast.error('Task title cannot be empty!', {
                icon: <FiAlertCircle className="text-rose-400" size={24} />
            });
            return;
        }

        // Strict Validation: Ensure due date is provided
        if (!task.dueDate) {
            toast.error('A due date is required!', {
                icon: <FiAlertCircle className="text-orange-400" size={24} />
            });
            return;
        }

        // Send the task to App.jsx (MongoDB will automatically generate the _id for this)
        onSave(task);

        // Show premium success notification
        toast.success('Task successfully added!', {
            icon: <FiCheckCircle className="text-emerald-400" size={24} />
        });

        // Reset the form back to default state
        setTask({
            title: '',
            description: '',
            priority: 'Medium',
            dueDate: '',
            status: 'Pending'
        });
    };

    // Reusable styling classes perfectly tuned for the Deep Purple Breathing Background
    const inputClasses = "w-full bg-slate-900/30 backdrop-blur-md border border-indigo-500/20 p-4 pl-12 rounded-2xl outline-none focus:bg-slate-800/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-inner font-medium text-slate-100 placeholder-slate-500 hover:border-indigo-500/40";
    const labelClasses = "text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors duration-300 group-focus-within:text-indigo-300";
    const iconContainerClasses = "absolute left-4 text-slate-500 transition-colors duration-300 group-focus-within:text-indigo-400 pointer-events-none";

    return (
        <form onSubmit={handleSubmit} className="p-8 mb-10 transition-all duration-500 glass-effect rounded-3xl hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] border border-white/5 relative overflow-hidden">

            {/* Subtle background glow effect for the form container */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

            <h2 className="flex items-center gap-3 mb-8 text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Create New Task
            </h2>

            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2">

                {/* 1. Task Title Input Area */}
                <div className="flex flex-col gap-2 group">
                    <label className={labelClasses}>Task Title <span className="text-rose-500">*</span></label>
                    <div className="relative flex items-center">
                        <div className={iconContainerClasses}>
                            <FiType size={18} />
                        </div>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            placeholder="e.g., Complete backend API"
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* 2. Target Date Input Area */}
                <div className="flex flex-col gap-2 group">
                    <label className={labelClasses}>Target Date <span className="text-rose-500">*</span></label>
                    <div className="relative flex items-center">
                        <div className={iconContainerClasses}>
                            <FiCalendar size={18} />
                        </div>
                        <input
                            type="date"
                            name="dueDate"
                            value={task.dueDate}
                            onChange={handleChange}
                            className={inputClasses}
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                </div>

                {/* 3. Detailed Description Textarea Area */}
                <div className="flex flex-col gap-2 md:col-span-2 group">
                    <label className={labelClasses}>Detailed Description</label>
                    <div className="relative">
                        <div className={`${iconContainerClasses} top-4`}>
                            <FiAlignLeft size={18} />
                        </div>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Provide more context or details..."
                            className={`${inputClasses} resize-none`}
                        ></textarea>
                    </div>
                </div>

                {/* 4. Custom Priority Level Dropdown (No Emojis) */}
                <div className="flex flex-col gap-2 md:col-span-2 group">
                    <label className={labelClasses}>Priority Level</label>
                    <div className="relative flex items-center">
                        {/* Custom Left Icon */}
                        <div className={iconContainerClasses}>
                            <FiFlag size={18} />
                        </div>

                        {/* Native Select (Appearance hidden via CSS, styled custom) */}
                        <select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            className={`${inputClasses} cursor-pointer appearance-none pr-12`}
                        >
                            <option value="High" className="py-2 bg-slate-900 text-slate-100">High Priority (Urgent)</option>
                            <option value="Medium" className="py-2 bg-slate-900 text-slate-100">Medium Priority (Normal)</option>
                            <option value="Low" className="py-2 bg-slate-900 text-slate-100">Low Priority (Flexible)</option>
                        </select>

                        {/* Custom Right Dropdown Arrow */}
                        <div className="absolute transition-transform duration-300 pointer-events-none right-4 text-slate-400 group-focus-within:-rotate-180 group-focus-within:text-indigo-400">
                            <FiChevronDown size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button Area */}
            <div className="relative z-10 flex justify-end mt-10">
                <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-10 py-4 rounded-2xl font-extrabold tracking-wide flex items-center gap-3 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                    <FiPlus size={22} className="stroke-[3]" /> Add New Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;