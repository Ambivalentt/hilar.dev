import React, { useState, useEffect, useRef } from "react";
import { ClipboardList, Clock, User, Calendar, Trash2, MessageSquarePlus } from "lucide-react";


const TaskCards = ({ task, handleDeleteTask, loadingTaskId, addNewCommentFn }) => {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState("");
    const { task_id, task_title, task_due_date, task_status } = task;

    const handleSave = () => {
        if (!commentText.trim()) return;
        addNewCommentFn({task_id, content:commentText});
        console.log("Comment added:", commentText, task_id);
        setCommentText("");
        setShowCommentInput(false);
    };
    const assigedTo = `${task.assigned_first_name} ${task.assigned_last_name}`;

    const isDeleting = loadingTaskId === task.task_id;
    return (
        <section className="relative bg-[#2B2B3F] rounded-xl p-5 shadow-md flex flex-col justify-between min-h-[180px] border border-indigo-700 hover:shadow-indigo-500/30 transition-shadow duration-300">
            <div className="flex items-start gap-3">
                <ClipboardList className="text-indigo-400 w-5 h-5 mt-1" />
                <div>
                    <h3 className="text-[#E0E0F0] text-lg font-semibold mb-1">{task_title}</h3>
                    <p className="text-sm text-gray-400">Estimated date: {new Date(task_due_date).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Info adicional con íconos */}
            <div className="mt-3 grid grid-cols-2 gap-y-4 text-sm text-[#A0A0C0]">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span><strong>Status:</strong> {task_status || "No definido"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span><strong>Assigged to:</strong> {assigedTo || "No asignado"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span><strong>Deadline:</strong> {task_due_date ? new Date(task_due_date).toLocaleDateString() : "No definida"}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-[#A0A0C0] relative z-10">
                <div className="flex gap-3">
                    <button
                        title="Añadir Comentario"
                        className="flex items-center gap-1 hover:text-indigo-400 transition cursor-pointer font-semibold"
                        onClick={() => setShowCommentInput(!showCommentInput)}
                    >
                        <MessageSquarePlus size={18} /> Comment
                    </button>
                </div>
                <button
                    disabled={isDeleting}
                    onClick={() => handleDeleteTask(task.task_id)}
                    className={`text-red-500 hover:text-red-700 transition flex items-center gap-1 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    title="Delete task"
                >
                    <Trash2 size={18} />
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>

            <div className={`absolute left-0 bottom-[-140px] w-full z-20 transform transition-all duration-300 ease-in-out ${showCommentInput ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}>
                {/* add comment btn */}
                <section className="bg-[#1F1F2E] border-2 border-indigo-500 rounded-lg shadow-md p-4">
                    <p className="mb-2 text-indigo-400 font-semibold">
                        Add comment to: <span className="text-white">{task_title}</span>
                    </p>
                    <input
                        className="w-full rounded-md bg-[#1F1F2E] text-white p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Escribe tu comentario aquí..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="mt-3 flex justify-end gap-2">
                        <button
                            onClick={() => {
                                setShowCommentInput(false);
                                setCommentText("");
                            }}
                            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition text-white"
                        >
                            Save
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
}


export default TaskCards;