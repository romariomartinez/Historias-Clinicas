import HistoriaCard from './HistoriaCard';

const HistoriasList = ({ historias, loading, onEdit, onDelete, onRefresh }) => {
  return (
    <div className="card card-gradient border-2 border-purple-200/50 shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gradient-to-r from-purple-200 to-pink-200">
        <div>
          <h2 className="text-3xl font-black text-gradient flex items-center gap-2">
            <span className="text-4xl animate-float">📋</span>
            Historias Clínicas
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mt-2"></div>
        </div>
        <button
          onClick={onRefresh}
          className="btn btn-success text-sm relative overflow-hidden group"
          title="Actualizar lista"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="animate-spin group-hover:animate-none">🔄</span>
            Actualizar
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {loading && historias.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 border-r-pink-600"></div>
          </div>
          <p className="text-gradient font-bold text-lg mt-6 animate-pulse">Cargando historias clínicas...</p>
        </div>
      ) : historias.length === 0 ? (
        <div className="text-center py-16">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <p className="relative text-7xl animate-bounce">📋</p>
          </div>
          <p className="text-gradient font-bold text-xl mb-2">No hay historias clínicas registradas</p>
          <p className="text-gray-600">Crea tu primera historia clínica usando el formulario</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
          {historias.map((historia, index) => (
            <div
              key={historia.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in"
            >
              <HistoriaCard
                historia={historia}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoriasList;

