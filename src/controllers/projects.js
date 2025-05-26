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

const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const project = await Projects.getProjectById({ project_id: projectId });
        res.status(200).json({ message: 'Project retrieved successfully', project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getMembersFromProject = async (req, res) =>{
    try{
        const projectId = req.params.id;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const members = await Projects.getAllMembersByProjectId({ project_id: projectId });
        res.status(200).json({ message: 'Members retrieved successfully', members });
    }catch (error) {
        console.error('Error in getMembersFromProject:', error);
        res.status(400).json({ message: error.message });
    }
}

const addMemberToProject = async (req, res) => {
    try {
        const { add_member } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const project_id = req.params.id;
        const result = await Projects.addMember({ project_id, user_id: add_member });
        res.status(200).json({ message: 'Member added successfully', result });
    } catch (error) {
        console.error('Error in addMemberToProject:', error);
        res.status(400).json({ message: error.message });
    }
}

export { createProject, getAllProjectByUserId, deleteProject, getProjectById, getMembersFromProject, addMemberToProject }; 