import Projects from "../repositories/projects.js";


const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const creator_id = req.user.id

        const result = await Projects.create({ title, description, creator_id });
        res.status(201).json({ message: 'Project created successfully', project: result });
    } catch (error) {
        console.error('Error in createProject:', error);
        res.status(400).json({ message: error.message });
    }
}

const getAllProjectByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await Projects.getAllProjectsInfoById({ user_id: userId });
        res.status(200).json({ message: 'Projects retrieved successfully', projects });
    } catch (error) {
        console.error('Error in getAllProjectByUserId:', error);
        res.status(400).json({ message: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const projectId  = req.body.project_id;
        const userId = req.user.id
        const result = await Projects.delete({ project_id: projectId, user_id: userId });
        res.status(200).json({ message: 'Project deleted successfully', result });
    } catch (error) {
        console.error('Error in deleteProject:', error);
        res.status(400).json({ message: error.message });
    }
}


export { createProject, getAllProjectByUserId, deleteProject }; 