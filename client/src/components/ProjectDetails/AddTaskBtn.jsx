import React, { useState, useEffect, useRef } from "react";
import { PlusCircle, UserPlus } from "lucide-react";

const AddTaskBtn = ({ setAllmembers, handleAddNewTask, loadingTasks }) => {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        due_date: "",
        assigned_to: ""
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownUserOpen, setDropdownUserOpen] = useState(false);
    const [userIdToAdd, setUserIdToAdd] = useState("");
    const [error, setError] = useState(null);

    const dropdownRef = useRef(null);
    const dropdownUserRef = useRef(null);

    // Cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
                setError(null);
            }
            if (dropdownUserRef.current && !dropdownUserRef.current.contains(event.target)) {
                setDropdownUserOpen(false);
            }
        };

        if (dropdownOpen || dropdownUserOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen, dropdownUserOpen]);

    const onChangeTask = (event) => {
        const { name, value } = event.target;
        const numberFields = ["assigned_to"];

        setNewTask({
            ...newTask,
            [name]: numberFields.includes(name) ? Number(value) : value
        });
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.title || !newTask.description || !newTask.due_date || !newTask.assigned_to) {
            setError("All fields are required");
            return;
        }

        await handleAddNewTask(newTask);
        setNewTask({
            title: "",
            description: "",
            due_date: "",
            assigned_to: ""
        });
        setDropdownOpen(false);
    };

    const handleAddUserById = async (e) => {
        e.preventDefault();
        if (!userIdToAdd.trim()) return;

        // Aquí puedes llamar a una función real para añadir el usuario
        console.log("Usuario añadido con ID:", userIdToAdd);

        setUserIdToAdd("");
        setDropdownUserOpen(false);
    };

    return (
        <section className="flex flex-col gap-y-4 md:flex-row md:justify-between items-center relative">
            {/* Botón y dropdown para nueva tarea */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-indigo-700 hover:bg-indigo-800 cursor-pointer px-5 py-3 rounded-lg text-white flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <PlusCircle size={20} /> Add new task
                </button>

                <div className={`
                    absolute -left-10 z-20 md:left-0 top-full border-indigo-600 xl:w-80 border mt-2 w-60 bg-[#2B2B3F] rounded-lg p-4 shadow-lg
                    transform origin-top transition-all duration-300 ease-out
                    ${dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
                `}>
                    <form onSubmit={handleAddTask}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newTask.title}
                            onChange={onChangeTask}
                            className="w-full mb-3 px-4 py-2 rounded bg-[#1F1F2D] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newTask.description}
                            onChange={onChangeTask}
                            className="w-full mb-3 px-4 py-2 rounded bg-[#1F1F2D] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <select
                            name="assigned_to"
                            value={newTask.assigned_to}
                            onChange={onChangeTask}
                            className="w-full mb-4 px-4 py-2 rounded bg-[#1F1F2D] text-white"
                        >
                            <option value="">Select member</option>
                            {setAllmembers.members?.map((member) => (
                                <option key={member.user_id} value={member.user_id}>
                                    {member.first_name} {member.last_name} ({member.role})
                                </option>
                            ))}
                        </select>
                        <input
                            type="date"
                            name="due_date"
                            value={newTask.due_date}
                            onChange={onChangeTask}
                            className="w-full mb-4 px-4 py-2 rounded bg-[#1F1F2D] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            disabled={loadingTasks}
                            className={`w-full py-2 rounded text-white font-semibold transition
                                ${loadingTasks
                                    ? "bg-indigo-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"}
                            `}
                        >
                            {loadingTasks ? "Loading..." : "New task"}
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            </div>

            {/* Botón y dropdown para añadir usuario por ID */}
            <div className="relative" ref={dropdownUserRef}>
                <button
                    onClick={() => setDropdownUserOpen(!dropdownUserOpen)}
                    className="bg-indigo-700 hover:bg-indigo-800 cursor-pointer px-5 py-3 rounded-lg text-white font-semibold transition flex items-center gap-2"
                    title="Añadir miembro por ID"
                >
                    <UserPlus size={20} /> Add user by ID
                </button>

                <div className={`
                    absolute -left-13 z-20 md:-left-26  top-full border-indigo-600 border mt-2 w-70 bg-[#2B2B3F] rounded-lg p-4 shadow-lg
                    transform origin-top transition-all duration-300 ease-out
                    ${dropdownUserOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
                `}>
                    <form onSubmit={handleAddUserById}>
                        <input
                            type="number"
                            placeholder="Enter user ID"
                            value={userIdToAdd}
                            onChange={(e) => setUserIdToAdd(e.target.value)}
                            className="w-full mb-3 px-4 py-2 rounded bg-[#1F1F2D] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 rounded text-white font-semibold transition bg-indigo-600 hover:bg-indigo-700"
                        >
                            Add user
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddTaskBtn;
