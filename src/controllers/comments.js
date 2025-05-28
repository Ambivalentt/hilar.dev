import Comment from "../repositories/comments.js"


const createComment = async (req, res) =>{
    try{
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const {project_id, task_id, content } = req.body;
        const result = await Comment.create({ project_id ,task_id, user_id: user.id, content });
        res.status(201).json({ message: 'Comment created successfully', comment: result });
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllCommentsByProjectId = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { id } = req.params;
        const comments = await Comment.allByProjectId({ project_id:id });
        res.status(200).json({ message: 'Comments retrieved successfully', comments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { comment_id } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const result = await Comment.delete({ comment_id, user_id: user.id });

        res.status(200).json({ message: 'Comment deleted successfully', result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { createComment, getAllCommentsByProjectId, deleteComment };