import React, { useState } from "react";
import { useProjectContext } from "../../context/projectContext";

const CreateProjectForm = ({ getProjectsFn }) => {
    const { createProjectFn } = useProjectContext();
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
        await createProjectFn(formData)
        await getProjectsFn();
        setFormData({
            title: "",
            description: ""
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Configuración de Perfil</h2>

            <div>
                <label htmlFor="title" className="block text-sm text-gray-300 mb-2">First Name</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm text-gray-300 mb-2">Last Name</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>


            <button
                type="submit"
                className="bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-semibold py-2 px-6 rounded-md transition"
            >
                Guardar Cambios
            </button>
        </form>
    );
};

export default CreateProjectForm;
