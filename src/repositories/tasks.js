import { use } from 'react';
import db from '../config/server.js';
import Validator from './dataValidator.js';

class Task {
    static async create({ title, description, assigned_to, due_date, project_id, user_id }) {
        const connection = await db.promise().getConnection();
        try {
            await connection.beginTransaction();
            Validator.str(title, 'title');
            Validator.str(description, 'description');
            Validator.number(assigned_to, 'assigned_to');

            const isUserExistsInProject = `
                SELECT user_id FROM project_members WHERE project_id = ? AND user_id = ?
            `
            await connection.query(isUserExistsInProject, [project_id, assigned_to]);

            const query = `
                INSERT INTO tasks (title, description, status, assigned_to, due_date, project_id)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const [results] = await connection.query(query, [title, description, 'in_progress', assigned_to, due_date, project_id]);

            if (results.affectedRows === 0) {
                throw new Error('Error creating task');
            }

            const taskId = results.insertId;

            // Insert into activity logs
            const queryActivityLogs = `
                INSERT INTO activity_logs (project_id, task_id, user_id, action)
                VALUES (?, ?, ?, ?)
            `;
            const [resultsActivityLogs] = await connection.query(queryActivityLogs, [project_id, taskId, user_id, 'created']);

            if (resultsActivityLogs.affectedRows === 0) {
                throw new Error('Error creating activity log');
            }

            await connection.commit();
            return results.insertId
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getByProjectId(projectId) {
        try {
            const query = `
            SELECT
                t.id AS task_id,
                t.title AS task_title,
                t.description AS task_description,
                t.status AS task_status,
                t.assigned_to AS task_assigned_to,
                t.due_date AS task_due_date,
                u.first_name AS assigned_first_name,
                u.last_name AS assigned_last_name
            FROM tasks t JOIN users u ON t.assigned_to = u.id
            WHERE t.project_id = ?

        `
            const [results] = await db.promise().query(query, [projectId]);
            return results
        } catch (error) {
            console.error('Error fetching tasks by project ID:', error);
            throw error;
        }
    }
    static async deleteTask({ task_id, user_id }) {
        const connection = await db.promise().getConnection();
        try {
            await connection.beginTransaction();
            //check if user can delete the task only assigned to or owner can delete the task
            const queryCheckTask = `
              SELECT 
                t.assigned_to AS assigned_to, 
                pm.user_id AS owner_id,
                pm.role AS role
              FROM tasks t
              JOIN project_members pm ON t.project_id = pm.project_id
              WHERE t.id = ? 
              AND pm.user_id = ?
              AND role = 'owner'
            `;
            const [taskResults] = await connection.query(queryCheckTask, [task_id, user_id]);
            const assignedTo = taskResults[0].assigned_to;
            const ownerId = taskResults[0].owner_id;

            if (assignedTo !== user_id && ownerId !== user_id) {
                throw new Error('You are not authorized to delete this task');
            }
            ////////////////////////////////////////////////////////////////////////////
            //Get information about the task to be deleted
            const query = `
                SELECT p.id AS project_id,
                p.title AS project_title,
                u.first_name AS user_first_name,
                u.last_name AS user_last_name
                FROM tasks t
                JOIN projects p ON t.project_id = p.id
                JOIN users u ON u.id = ? WHERE t.id = ? 
            `;
            const [results] = await connection.query(query, [user_id, task_id]);
            if (results.length === 0) {
                throw new Error('Error getting task information');
            }

            ////
            // Insert into activity logs
            const queryActivityLogs = `
                INSERT INTO activity_logs (project_id, task_id, user_id, action)
                VALUES (?, ?, ?, ?)
            `;
            const [resultsActivityLogs] = await connection.query(queryActivityLogs, [null, task_id, user_id, `deleted`]);

            if (resultsActivityLogs.affectedRows === 0) {
                throw new Error('Error creating activity log');
            }
            /// Delete the task
            const deleteQuery = `DELETE FROM tasks WHERE id = ?`;
            const [deleteResults] = await connection.query(deleteQuery, [task_id]);
            if (deleteResults.affectedRows === 0) {
                throw new Error('Error deleting task');
            }
            ///

            /////
            const deleteDetails = {
                project_title: results[0].project_title,
                user_first_name: results[0].user_first_name,
                user_last_name: results[0].user_last_name,
                task_id: task_id,
                action: 'deleted'
            }
            await connection.commit();
            return deleteDetails;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}


export default Task;