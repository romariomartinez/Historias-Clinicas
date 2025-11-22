const Header = () => {
  const patternUrl = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
  
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 shadow-2xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url("${patternUrl}")` }}
      ></div>
      
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse-slow"></div>
              <div className="relative text-6xl animate-float">🏥</div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl mb-2">
                <span className="bg-gradient-to-r from-white via-yellow-100 to-pink-100 bg-clip-text text-transparent">
                  Gestión de Historias Clínicas
                </span>
              </h1>
              <p className="text-purple-100 text-lg font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                Sistema CRUD completo para administración médica
              </p>
            </div>
          </div>
          <a
            href="/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group btn btn-secondary text-sm font-bold px-6 py-3 rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              📖 Swagger Docs
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

