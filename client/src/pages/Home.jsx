import '../App.css' //.font-aleway //font-figtree
import Footer from '../components/Footer';
import JoinSection from '../components/JoinSection';
import FeaturesSection from '../components/FeaturesSection';
import LatestTasks from '../components/LatestTasks';
import ActiveMembers from '../components/ActiveMembers';
import MainFeatures from '../components/MainFeatures';
import { useStateContext } from '../context/authContext.jsx';
import NavDefault from '../components/NavDefault.jsx';
import UserNavDetails from '../components/UserNavDetails.jsx';

const Home = () =>{

  const { user, logOut } = useStateContext();

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 py-12 px-6 flex flex-col gap-y-20">
      {user === null ? (
        <NavDefault />
      ) : (
        <UserNavDetails user={user} logOut={logOut} />
      )}

      <header className="max-w-6xl mx-auto px-4 sm:px-0 mt-40 sm:mt-30 ">
        <JoinSection />
      </header>

      <main className="w-full max-w-6xl mx-auto flex flex-col gap-y-10 px-4 sm:px-0">
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

export default Home;