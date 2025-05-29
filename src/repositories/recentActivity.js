import db from '../config/server.js';
import Validator from './dataValidator.js';

class Activity {
    static async getRecently({ project_id }) {
        const connection = await db.promise().getConnection();
        try {
            await connection.beginTransaction();
            if(!project_id){
                throw new Error('Project ID is required');
            }

            const query = `
                SELECT
                    u.first_name AS user_first_name,
                    u.last_name AS user_last_name,
                    al.created_at AS activity_created_at,
                    al.action AS activity_action,
                    al.id AS activity_id
                FROM activity_logs al
                JOIN users u ON al.user_id = u.id
                WHERE al.project_id = ?
                ORDER BY al.created_at DESC
                LIMIT 5;
            `;
            const [activityLogs] = await connection.query(query, [project_id]);
           
            await connection.commit();

            return activityLogs;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

export default Activity;