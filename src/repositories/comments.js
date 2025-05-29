import db from '../config/server.js';
import Validator from './dataValidator.js';

class Comment {
    static async create({ project_id, task_id, user_id, content }) {
        const connection = await db.promise().getConnection();
        try {
            await connection.beginTransaction();
            Validator.number(task_id, 'task_id');
            Validator.number(user_id, 'user_id');
            Validator.number(project_id, 'project_id');
            Validator.str(content, 'content');
            
            const validateTaskQuery = 'SELECT id, title FROM tasks WHERE id = ? AND project_id = ?';
            const [taskResults] = await connection.query(validateTaskQuery, [task_id, project_id]);
            if (taskResults.length === 0) {
                throw new Error('Task not found in the specified project');
            }
            const taskTitle = taskResults[0].title;
            //INSERT NEW COMMENT TO DB
            const query = `INSERT INTO comments (task_id, user_id, content) VALUES (?,?,?)`;
            const [resultInsertNewComment] = await connection.query(query, [task_id, user_id, content]);
            const commentId = resultInsertNewComment.insertId;
            if (resultInsertNewComment.affectedRows === 0) {
                throw new Error('Error creating comment');
            }
            //INSERT ACTIVITY LOG FOR COMMENT
            const queryActivityLogs = `INSERT INTO activity_logs (project_id, task_id, user_id, action) VALUES (?, ?, ?, ?)`;
            const [resultActivityLogs] = await connection.query(queryActivityLogs, [project_id, task_id, user_id, `Post a new comment to task: ${taskTitle} `]);
            if (resultActivityLogs.affectedRows === 0) {
                throw new Error('Error creating activity log for comment');
            }

            //GET COMMENT INFO
            const queryInfo = `
               SELECT
                c.id AS comment_id,
                u.first_name AS user_first_name,
                u.last_name AS user_last_name,
                c.created_at AS comment_created_at,
                t.title AS task_title,
                c.content AS comment_content
            FROM comments c
            JOIN users u ON c.user_id = u.id
            JOIN tasks t ON c.task_id = t.id
            WHERE c.id = ?
            ORDER BY c.created_at DESC`;
            const [commentInfo] = await connection.query(queryInfo, [commentId]);
            await connection.commit();
            if (commentInfo.length === 0) {
                throw new Error('Comment info not found after creation.');
            }

            return commentInfo[0];
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async allByProjectId({ project_id }) {
        try {
            if (!project_id) {
                throw new Error('Project ID is required');
            }
            const query = `
            SELECT
                c.id AS comment_id,
                u.first_name AS user_first_name,
                u.last_name AS user_last_name,
                c.created_at AS comment_created_at,
                t.title AS task_title,
                c.content AS comment_content
            FROM comments c
            JOIN users u ON c.user_id = u.id
            JOIN tasks t ON c.task_id = t.id
            WHERE t.project_id = ?
            ORDER BY c.created_at DESC`;
            const [comments] = await db.promise().query(query, [project_id]);
            return comments;
        } catch (error) {
            throw error;
        }
    }

    static async delete({ comment_id, user_id }) {
        const connection = await db.promise().getConnection();
        try {
            Validator.number(comment_id, 'comment_id');
            await connection.beginTransaction();
            //VALIDATE USER ROL
            const validateUserQuery = `
                SELECT pm.role AS user_role,
                pm.project_id AS project_id
                FROM project_members pm
                WHERE pm.user_id = ? AND pm.role IN ('owner', 'collaborator')
            `
            const [userResults] = await connection.query(validateUserQuery, [user_id]);
            if (userResults.length === 0) {
                throw new Error('User is not authorized to delete comments');
            }
            //DELETE COMMENT FROM DB
            const query = `DELETE FROM comments WHERE id = ?`;
            const [resultDeleteComment] = await connection.query(query, [comment_id]);
            if (resultDeleteComment.affectedRows === 0) {
                throw new Error('Error getting id from comment');
            }

            //INSERT ACTIVITY LOG FOR DELETED COMMENT
            const queryActivityLogs = `INSERT INTO activity_logs (project_id, task_id, user_id, action) VALUES (?, ?, ?, ?)`;
            const [resultActivityLogs] = await connection.query(queryActivityLogs, [null, null, user_id, 'A comment was deleted']);
            if (resultActivityLogs.affectedRows === 0) {
                throw new Error('Error creating activity log for deleted comment');
            }

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

export default Comment;