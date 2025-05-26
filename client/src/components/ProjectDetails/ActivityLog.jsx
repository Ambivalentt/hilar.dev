
import { CalendarCheck } from "lucide-react";

const ActivitySection = ({ activities }) => {
    return (
        <section className="bg-[#1F1F2E] rounded-lg p-6 w-full mx-auto shadow-lg">
            <h2 className="text-indigo-400 font-bold text-xl mb-4">Actividad Reciente</h2>
            <ul className="space-y-3 max-h-56 overflow-y-auto text-[#E0E0F0]">
                {activities.map(({ id, description, date }) => (
                    <li key={id} className="border-b border-[#3A3A4D] pb-2">
                        <p className="text-sm flex items-center gap-2">
                            <CalendarCheck className="w-4 h-4 text-indigo-400" />
                            {description}
                        </p>
                        <p className="text-xs text-[#A0A0C0] ml-6">{date}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ActivitySection;