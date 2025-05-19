import { Link } from "react-router-dom";

const NavDefault = () => {

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 border-b border-slate-700 "
            role="navigation"
            aria-label="Project dashboard navigation"
        >
            <div className=" mx-auto w-full flex flex-col md:flex-row items-center justify-around py-3 gap-4 md:gap-0">
                {/* Título */}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white-400 text-center md:text-left">
                    Project Dashboard
                </h1>

                {/* Texto y botón */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-6 w-full md:w-auto text-center md:text-left">
                    <p className="text-lg font-medium text-slate-300 max-w-md">
                        Access all your projects and building features
                    </p>
                    <Link to='/login'>
                        <button
                            className="bg-indigo-600 font-semibold cursor-pointer  hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-auto"
                            type="button"
                        >
                            Access
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )

}

export default NavDefault;