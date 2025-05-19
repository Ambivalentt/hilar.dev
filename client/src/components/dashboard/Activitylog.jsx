import { Activity } from "lucide-react"
const Activitylog = ({activities}) => {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
                <Activity size={24} /> Activity Logs
            </h2>
            <div className="overflow-x-auto rounded-lg border border-cyan-700">
                <table className="min-w-full divide-y divide-cyan-700">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">
                                Action
                            </th>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr className="border-b border-cyan-700 hover:bg-gray-700">
                                <td className="px-6 py-3 text-gray-300">{activity.action}</td>
                                <td className="px-6 py-3 text-gray-300">{activity.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Activitylog