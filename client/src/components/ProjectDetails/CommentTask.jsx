const CommentsSection = ({ comments }) => {
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
        <h2 className="text-indigo-400 font-bold text-xl mb-4">Comentarios Recientes</h2>
        <ul className="space-y-4 max-h-56 overflow-y-auto">
            {comments.map(({ id, user, content, date, taskTitle }) => (
                <li key={id} className="border-b border-[#3A3A4D] pb-3">
                    <p className="text-[#A0A0C0] text-sm">{formatDate(date)} - <span className="italic">{taskTitle}</span></p>
                    <p className="text-[#E0E0F0] font-semibold">{user}</p>
                    <p className="text-gray-300">{content}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default CommentsSection;