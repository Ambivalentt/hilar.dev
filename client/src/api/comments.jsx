import axiosInstance from "./axiosInstance";
import React from "react";
const createComment = async (commentData) => {
    try {
        const response = await axiosInstance.post('/comments/create', commentData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
      console.log(error);
    }
}

const getAllCommentsByProjectIdFn = async (projectId) => {
    try {
        const response = await axiosInstance.get(`/comments/allByProjectId/${projectId}`, {
            withCredentials: true
        });
        return response.data.comments;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'An error occurred while fetching comments';
        throw new Error(errorMessage);
    }
}

const deleteComment = async (commentId) => {
    try {
        const response = await axiosInstance.delete('/comments/delete', {
            data: { comment_id: commentId },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'An error occurred while deleting the comment';
        throw new Error(errorMessage);
    }
}
export { createComment, getAllCommentsByProjectIdFn, deleteComment }