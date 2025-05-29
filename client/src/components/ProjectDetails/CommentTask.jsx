import { Trash2 } from "lucide-react";

const CommentsSection = ({ comments, handleDeleteComment }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <section className="bg-[#1F1F2E] rounded-lg p-6 w-full mx-auto shadow-lg relative flex flex-col flex-grow">
      <h2 className="text-indigo-400 font-bold text-xl mb-4">Recent Comments</h2>
      {comments.length > 0 ? (
        <ul className="space-y-4 max-h-56 overflow-y-auto ">
          {comments.map(({ comment_content, comment_created_at, comment_id, task_title, user_first_name, user_last_name }) => (

            <li key={comment_id} className="border-b border-[#3A3A4D] pb-3 flex justify-between">
              <div>
                <p className="text-[#A0A0C0] text-sm">{formatDate(comment_created_at)} - <span className="italic">{task_title}</span></p>
                <p className="text-[#E0E0F0] font-semibold">{user_first_name} {user_last_name}</p>
                <p className="text-gray-300">{comment_content}</p>
              </div>
              <button onClick={() => handleDeleteComment(comment_id)}
                className="text-red-500 cursor-pointer hover:text-red-700 transition ml-4 pr-10"
                title="Delete comment">
                <Trash2 size={20}  strokeWidth={3}/>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center mt-6">No comments yet</p>
      )}
    </section>
  )
}

export default CommentsSection;