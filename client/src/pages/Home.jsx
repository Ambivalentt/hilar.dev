import '../App.css' //.font-aleway //font-figtree
import Footer from '../components/Footer';
import JoinSection from '../components/JoinSection';
import FeaturesSection from '../components/FeaturesSection';
import LatestTasks from '../components/LatestTasks';
import ActiveMembers from '../components/ActiveMembers';
import MainFeatures from '../components/MainFeatures';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 py-6 px-8 flex flex-col gap-y-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-3xl font-bold">Project Dashboard</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
          New Project
        </button>
      </div>
      <header className='max-w-6xl mx-auto mb-10'>
        <JoinSection />
      </header>
      <main className=' w-full max-w-6xl mx-auto flex flex-col gap-y-10'>
        <MainFeatures />
        <FeaturesSection />
        <LatestTasks />
        <ActiveMembers />
      </main>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
