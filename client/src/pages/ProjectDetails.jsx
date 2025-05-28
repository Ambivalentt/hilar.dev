import Details from '../components/ProjectDetails/ProjectDtails.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/ProjectDetails/CommentTask.jsx';
import TaskCards from '../components/ProjectDetails/TaskCards.jsx';
import AddTaskBtn from '../components/ProjectDetails/AddTaskBtn.jsx';
import ActivityLog from '../components/ProjectDetails/ActivityLog.jsx';
import { getProjectByIdFn, getTasksByProjectIdFn, getMembersFromProjectFn } from '../api/project.jsx';
import { deleteTask, addNewTaskProjectfn } from '../api/tasks.jsx';
import { getAllCommentsByProjectIdFn, createComment, deleteComment } from '../api/comments.jsx';
import { add, set } from 'date-fns';


const ProjectDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true); //loading state
    const [project, setProject] = useState(null); //project details
    const [tasksOfProject, setTasksOfProject] = useState(null); //tasks of the project
    const [loadingTasks, setLoadingTasks] = useState(false); //loading tasks state
    const [allMembers, setAllMembers] = useState(null); //members of the project
    const [loadingTaskId, setLoadingTaskId] = useState(false); //loading state while deleting a task
    const [comments, setComments] = useState([]); //comments for the tasks
    const [loadingComments, setLoadingComments] = useState(false); //loading state for comments
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectByIdFn(id);
                const tasksData = await getTasksByProjectIdFn(id);
                const membersData = await getMembersFromProjectFn(id);
                const AllComments = await getAllCommentsByProjectIdFn(id);
                setProject(projectData);
                setTasksOfProject(tasksData);
                setAllMembers(membersData);
                setComments(AllComments);

            } catch (error) {
                console.error("Error fetching project details:", error);
            } finally {
                setLoading(false);
            }

        };
        fetchProject();
    }, [id]);


    const handleAddNewTask = async (taskData) => {
        try {
            setLoadingTasks(true);
            await addNewTaskProjectfn(id, taskData);
            const newsTaskData = await getTasksByProjectIdFn(id);
            setTasksOfProject(newsTaskData);

        } catch (error) {
            console.error("Error adding new task:", error);
        } finally {
            setLoadingTasks(false);
        }
    }

    const handleDeleteTask = async (taskId) => {
        setLoadingTaskId(taskId);
        try {
            await deleteTask({ task_id: taskId });
            const updatedTasks = tasksOfProject.filter(task => task.task_id !== taskId);
            setTasksOfProject(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setLoadingTaskId(null);
        }
    }

    const handleDeleteComment = async (commentId) => {
        const prevComments = [...comments]
        try {
            setLoadingComments(true);
            setComments(prevComments.filter(comment => comment.comment_id !== commentId));
            await deleteComment(commentId);
        } catch (error) {
            console.error("Error deleting comment:", error);
            // If there's an error, revert the comments to the previous state
            setComments(prevComments);
        }finally{
            setLoadingComments(false);
        }
    }

    const addNewCommentFn = async ({ task_id, content }) => {
        try {
            setLoadingComments(true);
            const commentData = {
                project_id: Number(id),
                task_id,
                content,
            }

            await createComment(commentData);
            const updatedComments = await getAllCommentsByProjectIdFn(id);
            setComments(updatedComments);
        } catch (error) {
            console.error("Error adding new comment:", error);
        } finally {
            setLoadingComments(false);
        }
    }

    const activityData = [
        {
            id: 1,
            description: "Andrés creó la tarea 'Diseñar interfaz móvil'",
            date: "2025-05-20 09:00",
        },
        {
            id: 2,
            description:
                "María añadió un comentario en la tarea 'Configurar base de datos'",
            date: "2025-05-19 18:45",
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4.93 4.93a10 10 0 0114.14 14.14L12 12l-7.07-7.07z"></path>
                </svg>
            </div>
        )
    }

    return (
        <main className='max-w-6xl mx-auto flex flex-col gap-y-6'>
            <Details project={project} />
            <AddTaskBtn setAllmembers={allMembers} handleAddNewTask={handleAddNewTask} loadingTasks={loadingTasks} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasksOfProject.length > 0 ? (
                    <>
                        {tasksOfProject.map((task) => (
                            <TaskCards
                                key={task.task_id}
                                task={task}
                                handleDeleteTask={handleDeleteTask}
                                loadingTaskId={loadingTaskId}
                                addNewCommentFn={addNewCommentFn}
                            />
                        ))}
                    </>
                ) : (
                    <div className="col-span-1 md:col-span-2 text-center text-gray-500">
                        <p>No tasks found, add a new one!</p>
                    </div>
                )}
            </div>
            <Comments comments={comments} handleDeleteComment={handleDeleteComment}/>
            <ActivityLog activities={activityData} />
        </main>
    )
}

export default ProjectDetails;