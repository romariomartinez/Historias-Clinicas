import { useState, useEffect } from 'react';

const HistoriaForm = ({ onSubmit, editingHistoria, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    paciente_nombre: '',
    paciente_edad: '',
    paciente_cedula: '',
    fecha_consulta: '',
    sintomas: '',
    diagnostico: '',
    tratamiento: '',
    medico: '',
    observaciones: '',
  });

  useEffect(() => {
    if (editingHistoria) {
      setFormData({
        paciente_nombre: editingHistoria.paciente_nombre || '',
        paciente_edad: editingHistoria.paciente_edad || '',
        paciente_cedula: editingHistoria.paciente_cedula || '',
        fecha_consulta: editingHistoria.fecha_consulta || '',
        sintomas: editingHistoria.sintomas || '',
        diagnostico: editingHistoria.diagnostico || '',
        tratamiento: editingHistoria.tratamiento || '',
        medico: editingHistoria.medico || '',
        observaciones: editingHistoria.observaciones || '',
      });
    } else {
      // Reset form
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        paciente_nombre: '',
        paciente_edad: '',
        paciente_cedula: '',
        fecha_consulta: today,
        sintomas: '',
        diagnostico: '',
        tratamiento: '',
        medico: '',
        observaciones: '',
      });
    }
  }, [editingHistoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      paciente_edad: parseInt(formData.paciente_edad),
      sintomas: formData.sintomas || null,
      observaciones: formData.observaciones || null,
    };
    onSubmit(data);
  };

  return (
    <div className="card card-gradient sticky top-4 border-2 border-purple-200/50 shadow-2xl">
      <div className="relative mb-6">
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <h2 className="relative text-3xl font-black text-gradient mb-2">
          {editingHistoria ? (
            <span className="flex items-center gap-2">
              <span className="text-4xl animate-bounce">✏️</span>
              Editar Historia Clínica
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-4xl animate-float">➕</span>
              Nueva Historia Clínica
            </span>
          )}
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Paciente *
          </label>
          <input
            type="text"
            name="paciente_nombre"
            value={formData.paciente_nombre}
            onChange={handleChange}
            required
            maxLength={200}
            className="input-field"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad *
            </label>
            <input
              type="number"
              name="paciente_edad"
              value={formData.paciente_edad}
              onChange={handleChange}
              required
              min="0"
              max="150"
              className="input-field"
              placeholder="35"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cédula/Documento *
            </label>
            <input
              type="text"
              name="paciente_cedula"
              value={formData.paciente_cedula}
              onChange={handleChange}
              required
              maxLength={50}
              className="input-field"
              placeholder="1234567890"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Consulta *
          </label>
          <input
            type="date"
            name="fecha_consulta"
            value={formData.fecha_consulta}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Síntomas
          </label>
          <textarea
            name="sintomas"
            value={formData.sintomas}
            onChange={handleChange}
            rows="3"
            maxLength={1000}
            className="input-field"
            placeholder="Describa los síntomas presentados"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diagnóstico *
          </label>
          <textarea
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleChange}
            required
            rows="3"
            maxLength={500}
            className="input-field"
            placeholder="Diagnóstico médico"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tratamiento *
          </label>
          <textarea
            name="tratamiento"
            value={formData.tratamiento}
            onChange={handleChange}
            required
            rows="4"
            maxLength={1000}
            className="input-field"
            placeholder="Tratamiento prescrito"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Médico *
          </label>
          <input
            type="text"
            name="medico"
            value={formData.medico}
            onChange={handleChange}
            required
            maxLength={200}
            className="input-field"
            placeholder="Ej: Dr. María García"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="3"
            maxLength={1000}
            className="input-field"
            placeholder="Observaciones adicionales"
          />
        </div>

        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Guardando...
                </>
              ) : editingHistoria ? (
                <>
                  <span className="animate-bounce">💾</span>
                  Actualizar
                </>
              ) : (
                <>
                  <span className="animate-pulse">✅</span>
                  Guardar
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          {editingHistoria && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary relative overflow-hidden group"
            >
              <span className="relative z-10">Cancelar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HistoriaForm;

