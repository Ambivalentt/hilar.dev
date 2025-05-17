import { Users, Folder, CheckCircle, MessageSquareText, Activity, } from "lucide-react";

const stats = [
    { title: "Users", icon: Users, description: "Manage your team", count: 12 },
    { title: "Projects", icon: Folder, description: "Active projects", count: 8 },
    { title: "Tasks", icon: CheckCircle, description: "Assigned tasks", count: 45 },
    { title: "Comments", icon: MessageSquareText, description: "Discussions", count: 122 },
    { title: "Activity Logs", icon: Activity, description: "Recent activity", count: 305 },
];


const MainFeatures = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stats.map(({ title, icon: Icon, description, count }) => (
                <div
                    key={title}
                    className="bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-slate-700"
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-slate-700 p-3 rounded-full">
                            <Icon className="text-indigo-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{title}</h3>
                            <p className="text-slate-400 text-sm">{description}</p>
                        </div>
                    </div>
                    <p className="text-3xl font-bold">{count}</p>
                </div>
            ))}
        </section>
    )
}

export default MainFeatures