import {
  BadgeCheck,
  CalendarDays,
  User,
  Info,
  Hash,
  Tags,
  Edit,
  Trash2,
  ArrowLeft,
  MessageSquarePlus 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Details = ({ project }) => {
  const {
    project_id,
    created_at,
    creator_first_name,
    creator_last_name,
    status,
    title,
    description,
    tags = [], // Opcional: tags como ["React", "UI/UX"]
  } = project;

  const statusColors = {
    active: "bg-indigo-600",
    completed: "bg-green-600",
    pending: "bg-yellow-500",
    cancelled: "bg-red-600",
  };

  return (
    <section className=" mx-auto w-full p-6 sm:p-8 bg-[#1F1F2E] rounded-2xl shadow-xl text-[#E0E0F0] space-y-8">
      {/* Título principal */}
      <div className="flex items-center gap-3">
        <Info className="w-7 h-7 text-indigo-300" />
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400">{title}</h1>
      </div>

      {/* Descripción */}
      <p className="text-gray-300 leading-relaxed">{description}</p>

      {/* Detalles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-gray-400 font-semibold uppercase tracking-wide">
            <User className="w-4 h-4" />
            Creator
          </p>
          <p>
            {creator_first_name} {creator_last_name}
            <span className="italic text-gray-400 ml-1">(Owner)</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="flex items-center gap-2 text-gray-400 font-semibold uppercase tracking-wide">
            <CalendarDays className="w-4 h-4" />
            Created At
          </p>
          <p>{new Date(created_at).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500 italic">
            {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
          </p>
        </div>

        <div className="space-y-1">
          <p className="flex items-center gap-2 text-gray-400 font-semibold uppercase tracking-wide">
            <BadgeCheck className="w-4 h-4" />
            Status
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize text-white ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-1 break-words">
          <p className="flex items-center gap-2 text-gray-400 font-semibold uppercase tracking-wide">
            <Hash className="w-4 h-4" />
            Proyecto ID
          </p>
          <p>{project_id}</p>
        </div>
      </div>

      {/* Tags opcionales */}
      {tags.length > 0 && (
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-gray-400 font-semibold uppercase tracking-wide">
            <Tags className="w-4 h-4" />
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-700 text-xs font-medium px-3 py-1 rounded-full text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-700 justify-end">
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition">
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-indigo-400 hover:text-white border border-indigo-500 transition">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </section>
  );
};

export default Details;
