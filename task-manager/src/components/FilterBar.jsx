import React from 'react';
// Importing premium icons including new ones for Search and Time filtering
import { FiFilter, FiActivity, FiFlag, FiChevronDown, FiSearch, FiClock } from 'react-icons/fi';

const FilterBar = ({
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    searchQuery,
    setSearchQuery,
    filterTime,
    setFilterTime
}) => {

    // Reusable CSS classes for the premium dropdowns and inputs to maintain consistency
    const inputClasses = "w-full py-4 pl-12 pr-12 font-bold transition-all duration-300 border outline-none appearance-none cursor-pointer text-slate-200 bg-slate-900/40 border-slate-700/50 rounded-2xl focus:bg-slate-800/80 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 hover:border-slate-600/50 shadow-inner";
    const iconContainerClasses = "absolute left-4 transition-transform duration-300 pointer-events-none group-focus-within:scale-110";

    return (
        <div className="relative flex flex-col gap-6 p-6 mb-10 overflow-hidden transition-all duration-500 glass-effect rounded-3xl border-white/5 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] z-20">

            {/* Subtle background glow effect for the filter container */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

            {/* Top Row: Header & Advanced Search Bar */}
            <div className="relative z-10 flex flex-col items-center justify-between w-full gap-5 md:flex-row">

                {/* Header Section */}
                <div className="flex items-center w-full gap-4 text-xl font-extrabold tracking-widest uppercase text-slate-200 drop-shadow-sm md:w-auto shrink-0">
                    <div className="p-3 text-indigo-400 transition-transform duration-300 border shadow-inner bg-indigo-500/10 rounded-2xl border-indigo-500/20 group-hover:scale-110 group-hover:rotate-3">
                        <FiFilter size={24} />
                    </div>
                    <span>Smart Filters</span>
                </div>

                {/* Search Bar (New Feature) */}
                <div className="relative flex items-center w-full group md:max-w-md">
                    <div className={`${iconContainerClasses} text-indigo-400 group-focus-within:text-indigo-300`}>
                        <FiSearch size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`${inputClasses} cursor-text pr-4`} // cursor-text overrides the cursor-pointer from shared classes
                    />
                </div>
            </div>

            {/* Bottom Row: Filter Dropdown Controls */}
            <div className="relative z-10 flex flex-col w-full gap-5 sm:flex-row">

                {/* 1. Status Filter Dropdown */}
                <div className="relative flex items-center flex-1 group">
                    <div className={`${iconContainerClasses} text-cyan-500 group-focus-within:text-cyan-400`}>
                        <FiActivity size={18} />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="All" className="py-2 bg-slate-900 text-slate-100">All Statuses</option>
                        <option value="Pending" className="py-2 bg-slate-900 text-slate-100">Pending Tasks</option>
                        <option value="In Progress" className="py-2 bg-slate-900 text-slate-100">In Progress</option>
                        <option value="Completed" className="py-2 bg-slate-900 text-slate-100">Completed</option>
                    </select>
                    <div className="absolute transition-transform duration-300 pointer-events-none right-4 text-slate-500 group-focus-within:-rotate-180 group-focus-within:text-indigo-400">
                        <FiChevronDown size={20} />
                    </div>
                </div>

                {/* 2. Priority Filter Dropdown */}
                <div className="relative flex items-center flex-1 group">
                    <div className={`${iconContainerClasses} text-orange-500 group-focus-within:text-orange-400`}>
                        <FiFlag size={18} />
                    </div>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="All" className="py-2 bg-slate-900 text-slate-100">All Priorities</option>
                        <option value="High" className="py-2 bg-slate-900 text-slate-100">High Priority</option>
                        <option value="Medium" className="py-2 bg-slate-900 text-slate-100">Medium Priority</option>
                        <option value="Low" className="py-2 bg-slate-900 text-slate-100">Low Priority</option>
                    </select>
                    <div className="absolute transition-transform duration-300 pointer-events-none right-4 text-slate-500 group-focus-within:-rotate-180 group-focus-within:text-indigo-400">
                        <FiChevronDown size={20} />
                    </div>
                </div>

                {/* 3. Urgency/Time Filter Dropdown (New Feature) */}
                <div className="relative flex items-center flex-1 group">
                    <div className={`${iconContainerClasses} text-rose-500 group-focus-within:text-rose-400`}>
                        <FiClock size={18} />
                    </div>
                    <select
                        value={filterTime}
                        onChange={(e) => setFilterTime(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="All" className="py-2 bg-slate-900 text-slate-100">All Timelines</option>
                        <option value="Due Soon" className="py-2 bg-slate-900 text-slate-100">Due Soon (48h)</option>
                        <option value="Overdue" className="py-2 font-bold bg-slate-900 text-rose-400">⚠️ Overdue</option>
                    </select>
                    <div className="absolute transition-transform duration-300 pointer-events-none right-4 text-slate-500 group-focus-within:-rotate-180 group-focus-within:text-indigo-400">
                        <FiChevronDown size={20} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FilterBar;