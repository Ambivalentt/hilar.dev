import React, { useState } from "react";
import { createProjectFn } from "../../api/project.jsx";
import { set } from "date-fns";

const CreateProjectForm = ({ getProjectsFn, setShowCreateProject }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            await createProjectFn(formData);
            await getProjectsFn();
            setShowCreateProject(false);
        } catch (error) {
            setError(error.message || "Error al crear el proyecto.");
            console.error("Error creating the project:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-6 ps-1">
            <div>
                <label htmlFor="title" className="block text-sm text-gray-300 mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                        error ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-blue-500"
                    } bg-gray-800 text-white`}
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm text-gray-300 mb-2">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                        error ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-blue-500"
                    } bg-gray-800 text-white`}
                    required
                    disabled={loading}
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button
                type="submit"
                className="bg-indigo-700 cursor-pointer hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-md transition"
                disabled={loading}
            >
                {loading ? "Creating..." : "Creaate"}
            </button>
        </form>
    );
};

export default CreateProjectForm;
