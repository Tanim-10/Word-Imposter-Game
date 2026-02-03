const Footer = () => {
    const links = {
        linkedin: "https://linkedin.com/in/md-tanim-islam-351164326/",
        instagram: "https://instagram.com/islammdtanim10",
        github: "https://github.com/Tanim-10",
        repo: "https://github.com/Tanim-10/Word-Imposter-Game"
    };

    return (
        <footer className="w-full py-3 px-4 bg-slate-900/80 border-t border-slate-800 backdrop-blur-sm">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
                {/* Connect Links */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                    <span className="text-xs text-slate-400">Made by <span className="text-blue-400 font-medium">Tanim</span></span>
                    <span className="text-slate-700 hidden sm:inline">|</span>
                    <div className="flex gap-2 sm:gap-3">
                        <a href={links.linkedin} target="_blank" rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">
                            LinkedIn
                        </a>
                        <a href={links.instagram} target="_blank" rel="noopener noreferrer"
                            className="text-slate-400 hover:text-pink-400 transition-colors text-xs sm:text-sm">
                            Instagram
                        </a>
                        <a href={links.github} target="_blank" rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm">
                            GitHub
                        </a>
                    </div>
                </div>

                {/* Contribute */}
                <a href={links.repo} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-blue-400 transition-colors text-center">
                    ⭐ Star & Contribute
                </a>
            </div>
        </footer>
    );
};

export default Footer;
