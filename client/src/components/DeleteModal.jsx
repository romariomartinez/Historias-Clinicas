const DeleteModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="bg-gradient-to-br from-white via-red-50/30 to-pink-50/30 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-red-200/50 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative text-6xl animate-bounce">⚠️</div>
          </div>
          <h3 className="text-2xl font-black text-gradient mb-2">¿Eliminar historia clínica?</h3>
          <p className="text-gray-600 font-semibold">Esta acción no se puede deshacer.</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="btn btn-secondary relative overflow-hidden group"
          >
            <span className="relative z-10">Cancelar</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover:animate-spin">🗑️</span>
              Eliminar
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

