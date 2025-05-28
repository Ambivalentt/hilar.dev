import React, { useState, useEffect, useRef } from "react";
import { PlusCircle, UserPlus } from "lucide-react";
import { set } from "date-fns";

const AddTaskBtn = ({ setAllmembers, handleAddNewTask, loadingTasks }) => {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        due_date: "",
        assigned_to: ""
    });
    console.log("All members:", newTask);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cerrar dropdown si se hace click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const onChangeTask = (event) => {
        const { name, value } = event.target;

        // Lista de campos que deben ser números
        const numberFields = ["assigned_to"];

        setNewTask({
            ...newTask,
            [name]: numberFields.includes(name) ? Number(value) : value
        });
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.title || !newTask.description || !newTask.due_date) {
            alert("Por favor completa todos los campos antes de agregar la tarea.");
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

    const addMember = () => {
        alert("Funcionalidad para añadir miembro (a implementar)");
    };
    return (
            <section className="flex flex-col gap-y-4 md:flex-row md justify-between items-center  relative">
                {/* Botón y dropdown nuevo task */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="bg-indigo-700 hover:bg-indigo-800 cursor-pointer px-5 py-3 rounded-lg text-white flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <PlusCircle size={20} /> Add new task
                    </button>

                    {/* Dropdown animado */}
                    <div className={`
                          absolute -left-1/2 z-20 md:left-0 top-full border-indigo-600 border mt-2 w-80 bg-[#2B2B3F] rounded-lg p-4 shadow-lg
                          transform origin-top transition-all duration-300 ease-out
                          ${dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
                    >
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
                                className="w-full mb-4 px-4 py-2 rounded bg-[#1F1F2D] text-white "
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
                                        : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                                    }`}
                            >
                                {loadingTasks ? "Loading..." : "New task"}
                            </button>

                        </form>
                    </div>
                </div>

                {/* Botón añadir miembro */}
                <button
                    onClick={addMember}
                    className="bg-indigo-700 hover:bg-indigo-800 cursor-pointer px-5 py-3 rounded-lg text-white font-semibold transition flex items-center gap-2"
                    title="Añadir miembro">
                    <UserPlus size={20} /> Add new member
                </button>
            </section>
    )
}

export default AddTaskBtn;