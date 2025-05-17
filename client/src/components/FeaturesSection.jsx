import { ClipboardList, Users, Activity } from 'lucide-react';

const FeaturesSection = () => {

    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">What can you do here?</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center">
                        <ClipboardList size={36} className="mb-4 text-indigo-400" />
                        <h3 className="text-xl font-semibold mb-2">Create Projects</h3>
                        <p className="text-sm text-gray-300">
                            Manage your ideas and workspaces all in one place.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <Users size={36} className="mb-4 text-indigo-400" />
                        <h3 className="text-xl font-semibold mb-2">Assign Tasks</h3>
                        <p className="text-sm text-gray-300">
                            Collaborate with your team and move faster together.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <Activity size={36} className="mb-4 text-indigo-400" />
                        <h3 className="text-xl font-semibold mb-2">Track Activity</h3>
                        <p className="text-sm text-gray-300">
                            Stay informed with real-time updates and logs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection