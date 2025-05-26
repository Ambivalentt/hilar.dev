import Tasks from '../repositories/tasks.js';

const createTask = async (req, res) => {
    try {
        const { title, description, assigned_to, due_date } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const project_id = req.params.id;
        const results = await Tasks.create({
            title, description, assigned_to, due_date, project_id, user_id: user.id
        });

        res.status(201).json({ message: 'Task created successfully', task_id: results.id });
    } catch (error) {
        console.error('Error in tasks controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const tasksById = async (req, res) => {

    try {
        const { id } = req.params;
        const user = req.user
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const results = await Tasks.getByProjectId(id);
        res.status(200).json({ message: 'Tasks fetched successfully', data: results });
    } catch (error) {
        console.error('Error in tasks controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { task_id } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const result = await Tasks.deleteTask({ task_id, user_id: user.id });
        res.status(200).json({ message: 'Task deleted successfully', result });
    } catch (error) {
        console.error('Error in tasks controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}   
export {createTask, tasksById, deleteTask}