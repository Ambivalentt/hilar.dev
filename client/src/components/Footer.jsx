const Footer = () => {
    return (
        <section className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} MyProject. All rights reserved.</p>
            <p className="mt-2">
                Built with <span className="text-indigo-400">React</span> + <span className="text-indigo-400">TailwindCSS</span>
            </p>
        </section>
    )
}

export default Footer