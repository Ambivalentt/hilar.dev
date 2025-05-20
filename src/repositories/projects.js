import db from '../config/server.js';
import DataValidator from './dataValidator.js';
class Project {
    static async create({ title, description, creator_id }) {
        const connection = await db.promise().getConnection();
        try {
            await connection.beginTransaction();
            DataValidator.str(title, 'title');
            DataValidator.str(description, 'description');
            DataValidator.number(creator_id, 'creator_id');

            // Check if the user exists
            const queryProject = 'INSERT INTO projects (title, description, creator_id, status) VALUES (?, ?, ?, ?)';
            const [resultsProject] = await connection.query(queryProject, [title, description, creator_id, 'active']);

            if (resultsProject.affectedRows === 0) {
                throw new Error('Error creating project');
            }

            // Get the inserted project ID to put in the activity logs
            const projectId = resultsProject.insertId;

            //insert into activity logs
            const queryActivity_logs = 'INSERT INTO activity_logs (project_id, task_id, user_id, action) VALUES (?, ?, ?, ?)';
            const [resultsActivityLogs] = await connection.query(queryActivity_logs, [projectId, null, creator_id, 'created']);

            if (resultsActivityLogs.affectedRows === 0) {
                throw new Error('Error creating activity log');
            }

            //insert into project members
            const queryProjectMembers = 'INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)';
            const [resultsProjectMembers] = await connection.query(queryProjectMembers, [projectId, creator_id, 'owner']);

            if (resultsProjectMembers.affectedRows === 0) {
                throw new Error('Error adding project member');
            }

            await connection.commit();
            return {
                id: projectId,
                title,
                description,
                creator_id,
                status: 'active',
            };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getAllProjectsInfoById({ user_id }) {
        const connection = await db.promise().getConnection();
        try {
            const query = `
            SELECT 
              p.id AS project_id,
              p.title,
              p.description,
              p.status,
              p.created_at,
              pm.role,
              COUNT(pm_all.user_id) AS total_users
            FROM projects p
            JOIN project_members pm ON p.id = pm.project_id AND pm.user_id = ?
            JOIN project_members pm_all ON p.id = pm_all.project_id
            GROUP BY p.id, pm.role
        `;

            const [rows] = await connection.query(query, [user_id]);
           
            await connection.commit();
            return rows
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

export default Project;