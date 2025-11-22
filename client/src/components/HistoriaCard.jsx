const HistoriaCard = ({ historia, onEdit, onDelete }) => {
  const fechaConsulta = new Date(historia.fecha_consulta).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const fechaCreacion = new Date(historia.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="relative group bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl border-2 border-purple-200/50 p-6 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="shimmer absolute inset-0"></div>
      </div>
      
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-rose-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-rose-500/5 transition-all duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
                {historia.paciente_nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-black text-gradient mb-1">
                  {historia.paciente_nombre}
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-bold">
                    🆔 {historia.paciente_cedula}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-bold">
                    👤 {historia.paciente_edad} años
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onEdit(historia.id)}
              className="btn btn-primary text-sm px-4 py-2 relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="group-hover/btn:animate-spin">✏️</span>
                Editar
              </span>
            </button>
            <button
              onClick={() => onDelete(historia.id)}
              className="btn btn-danger text-sm px-4 py-2 relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="group-hover/btn:animate-bounce">🗑️</span>
                Eliminar
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <span className="text-lg">📅</span>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Fecha de Consulta</span>
              <p className="text-sm font-semibold text-gray-800">{fechaConsulta}</p>
            </div>
          </div>
          
          {historia.sintomas && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <span className="text-lg">🤒</span>
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Síntomas</span>
                <p className="text-sm font-semibold text-gray-800">{historia.sintomas}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
            <span className="text-lg">🩺</span>
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Diagnóstico</span>
              <p className="text-sm font-semibold text-gray-800">{historia.diagnostico}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <span className="text-lg">💊</span>
            <div>
              <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Tratamiento</span>
              <p className="text-sm font-semibold text-gray-800">{historia.tratamiento}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <span className="text-lg">👨‍⚕️</span>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">Médico</span>
              <p className="text-sm font-semibold text-gray-800">{historia.medico}</p>
            </div>
          </div>
          
          {historia.observaciones && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200">
              <span className="text-lg">📝</span>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Observaciones</span>
                <p className="text-sm font-semibold text-gray-800">{historia.observaciones}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t-2 border-gradient-to-r from-purple-200 to-pink-200 flex justify-between items-center">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-bold">
            ID: {historia.id}
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs font-bold">
            📅 {fechaCreacion}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoriaCard;

