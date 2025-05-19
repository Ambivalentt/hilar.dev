import { MessageSquare } from "lucide-react"

const Comments = ({ comments }) => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
                <MessageSquare size={24} /> Comments
            </h2>
            <div className="overflow-x-auto rounded-lg border border-cyan-700">
                <table className="min-w-full divide-y divide-cyan-700">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">
                                Comment
                            </th>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.id} className="border-b border-cyan-700 hover:bg-gray-700">
                                <td className="px-6 py-3 text-gray-300">{comment.user}</td>
                                <td className="px-6 py-3 text-gray-300">{comment.content}</td>
                                <td className="px-6 py-3 text-gray-300">{comment.date}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Comments