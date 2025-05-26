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

    static async delete({ project_id, user_id }) {
        const connection = await db.promise().getConnection();
        try {
            await connection.beginTransaction();

            // Check if the project exists and if the user is a owner
            const query = `
            SELECT p.title, pm.role, pm.project_id, pm.user_id
            FROM project_members pm
            JOIN projects p ON p.id = pm.project_id
            WHERE pm.project_id = ? AND pm.user_id = ? AND pm.role = 'owner';

        `;
            const [rows] = await connection.query(query, [project_id, user_id]);

            if (rows.length === 0) {
                throw new Error('User must be the owner of project, or project does not exist');
            }

            //obtain the project title for the activity log
            const projectTitle = rows[0].title;
            const description = `Project "${projectTitle}" deleted`;

            // Delete the project
            const deleteQuery = 'DELETE FROM projects WHERE id = ?';
            const [deleteResult] = await connection.query(deleteQuery, [project_id]);

            if (deleteResult.affectedRows === 0) {
                throw new Error('Error deleting project');
            }

            //Insert into activity logs
            const insertActivityLogQuery = 'INSERT INTO activity_logs (project_id, task_id, user_id, action) VALUES (?, ?, ?, ?)';
            const [insertActivityLogResult] = await connection.query(insertActivityLogQuery, [null, null, user_id, description]);
            if (insertActivityLogResult.affectedRows === 0) {
                throw new Error('Error inserting activity log');
            }
            await connection.commit();
        } catch (error) {
            console.error('Error deleting project:', error);
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getProjectById({ project_id }) {
        try {
            if (!project_id) {
                throw new Error('Project ID is required');
            }
            const query = `SELECT
                            projects.id AS project_id,
                            projects.title,
                            projects.description,
                            projects.status,
                            projects.created_at,
                            users.first_name AS creator_first_name,
                            users.last_name AS creator_last_name
                            FROM projects
                            JOIN users ON projects.creator_id = users.id
                            WHERE projects.id = ?
            `;
            const [rows] = await db.promise().query(query, [project_id]);
            if (rows.length === 0) {
                throw new Error('Project not found');
            }

            return rows[0];
        } catch (error) {
            throw error;
        } 
    }

    static async getAllMembersByProjectId({ project_id }) {
        try {
            if (!project_id) {
                throw new Error('Project ID is required');
            }
            const query = `
                SELECT 
                    users.id AS user_id,
                    users.first_name,
                    users.last_name,
                    project_members.role
                FROM project_members
                JOIN users ON project_members.user_id = users.id
                WHERE project_members.project_id = ?
            `;
            const [rows] = await db.promise().query(query, [project_id]);
            return rows;
        } catch (error) {
            console.error('Error fetching project members:', error);
            throw error;
        }
    }

    static async addMember({ project_id, user_id }) {
        try{
            if (!project_id || !user_id ) {
                throw new Error('Project ID and User ID are required');
            }
            const query = `
                INSERT INTO project_members (project_id, user_id, role)
                VALUES (?, ?, ?)
            `;
            const [result] = await db.promise().query(query, [project_id, user_id, 'collaborator']);
            if (result.affectedRows === 0) {
                throw new Error('Error adding member to project');
            }
        }catch (error) {
            throw error;
        }
    }
}

export default Project;