import React from "react";
import {
  Folder,
  CheckCircle,
  MessageSquare,
  Activity,
  Users,
  Settings,
  Eye,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Build alpha version of the app",
    members: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Project Beta",
    description: "Beta testing and feedback",
    members: 3,
    status: "Paused",
  },
];

const tasks = [
  {
    id: 1,
    title: "Design UI mockups",
    assignedTo: "Alice",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Set up backend API",
    assignedTo: "Bob",
    status: "Pending",
  },
  {
    id: 3,
    title: "Write tests",
    assignedTo: "Charlie",
    status: "Completed",
  },
];

const comments = [
  {
    id: 1,
    user: "Alice",
    content: "I updated the UI with the new design.",
    date: "2025-05-16",
  },
  {
    id: 2,
    user: "Bob",
    content: "Backend endpoints are almost done.",
    date: "2025-05-15",
  },
];

const activities = [
  {
    id: 1,
    action: "Alice created task 'Design UI mockups'",
    date: "2025-05-14",
  },
  {
    id: 2,
    action: "Bob commented on task 'Set up backend API'",
    date: "2025-05-15",
  },
];

const Sidebar = () => (
  <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-cyan-900 flex flex-col">
    <div className="p-6 text-cyan-400 font-extrabold text-xl border-b border-cyan-900">
      ProjectZone
    </div>
    <nav className="flex flex-col mt-6 space-y-1">
      <a
        href="#"
        className="flex items-center gap-3 px-6 py-3 text-cyan-300 hover:bg-cyan-700 hover:text-white rounded-md transition"
      >
        <Folder size={20} />
        My Projects
      </a>
      <a
        href="#"
        className="flex items-center gap-3 px-6 py-3 text-cyan-300 hover:bg-cyan-700 hover:text-white rounded-md transition"
      >
        <Users size={20} />
        My User
      </a>
      <a
        href="#"
        className="flex items-center gap-3 px-6 py-3 text-cyan-300 hover:bg-cyan-700 hover:text-white rounded-md transition"
      >
        <Settings size={20} />
        Configuración
      </a>
    </nav>
  </aside>
);

const ProjectCard = ({ project }) => (
  <div className="bg-gray-800 border border-indigo-700 rounded-xl p-6 shadow-lg flex flex-col justify-between hover:shadow-cyan-500/50 transition-shadow">
    <div>
      <h3 className="text-xl font-semibold text-indigo-300">{project.name}</h3>
      <p className="mt-2 text-gray-300">{project.description}</p>
    </div>

    <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
      <span>{project.members} members</span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          project.status === "Active"
            ? "bg-amber-600 text-amber-100"
            : "bg-gray-600 text-gray-300"
        }`}
      >
        {project.status}
      </span>
    </div>

    <button
      className="mt-4 flex items-center gap-2 self-start bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition"
      type="button"
    >
      <Eye size={16} /> View Details
    </button>
  </div>
);

const TaskRow = ({ task }) => {
  const statusColor =
    task.status === "Completed"
      ? "bg-green-600 text-green-100"
      : task.status === "In Progress"
      ? "bg-cyan-600 text-cyan-100"
      : "bg-gray-600 text-gray-300";

  return (
    <tr className="border-b border-cyan-700 hover:bg-gray-700">
      <td className="px-6 py-3 text-gray-300">{task.title}</td>
      <td className="px-6 py-3 text-gray-300">{task.assignedTo}</td>
      <td className="px-6 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
        >
          {task.status}
        </span>
      </td>
    </tr>
  );
};

const CommentRow = ({ comment }) => (
  <tr className="border-b border-cyan-700 hover:bg-gray-700">
    <td className="px-6 py-3 text-gray-300">{comment.user}</td>
    <td className="px-6 py-3 text-gray-300">{comment.content}</td>
    <td className="px-6 py-3 text-gray-300">{comment.date}</td>
  </tr>
);

const ActivityRow = ({ activity }) => (
  <tr className="border-b border-cyan-700 hover:bg-gray-700">
    <td className="px-6 py-3 text-gray-300">{activity.action}</td>
    <td className="px-6 py-3 text-gray-300">{activity.date}</td>
  </tr>
);

const Dashboard = () => (
  <div className="flex">
    <Sidebar />

    <main className="ml-64 p-10 bg-gray-900 min-h-screen flex-1 overflow-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-cyan-300 mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Overview of your projects, tasks, comments, and activity logs.
        </p>
      </header>

      {/* Projects Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
          <Folder size={24} /> Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* Tasks Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
          <CheckCircle size={24} /> Tasks
        </h2>
        <div className="overflow-x-auto rounded-lg border border-cyan-700">
          <table className="min-w-full divide-y divide-cyan-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400 font-medium">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-gray-400 font-medium">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-gray-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comments Section */}
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
                <CommentRow key={comment.id} comment={comment} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Activity Logs Section */}
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
                <ActivityRow key={activity.id} activity={activity} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
);

export default Dashboard;
