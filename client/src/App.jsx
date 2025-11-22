import { useState, useEffect } from 'react';
import Header from './components/Header';
import HistoriaForm from './components/HistoriaForm';
import HistoriasList from './components/HistoriasList';
import DeleteModal from './components/DeleteModal';
import { getAllHistorias, getHistoriaById, createHistoria, updateHistoria, deleteHistoria } from './services/api';

const API_BASE_URL = '/historias-clinicas';

function App() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingHistoria, setEditingHistoria] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  useEffect(() => {
    loadHistorias();
  }, []);

  const loadHistorias = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllHistorias();
      if (data.success) {
        setHistorias(data.data);
      } else {
        setError('Error al cargar las historias clínicas');
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      let data;
      if (editingHistoria) {
        data = await updateHistoria(editingHistoria.id, formData);
        setSuccess('Historia clínica actualizada exitosamente');
      } else {
        data = await createHistoria(formData);
        setSuccess('Historia clínica creada exitosamente');
      }

      if (data.success) {
        loadHistorias();
        handleCancel();
      } else {
        setError(data.message || data.error || 'Error al guardar');
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      setError('');
      const data = await getHistoriaById(id);
      if (data.success) {
        setEditingHistoria(data.data);
        // Scroll al formulario
        document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError('Error al cargar la historia clínica');
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const data = await deleteHistoria(deleteModal.id);
      
      if (data.success) {
        setSuccess('Historia clínica eliminada exitosamente');
        loadHistorias();
        setDeleteModal({ show: false, id: null });
      } else {
        setError(data.message || 'Error al eliminar');
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingHistoria(null);
  };

  const showDeleteModal = (id) => {
    setDeleteModal({ show: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, id: null });
  };

  // Auto-hide success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="min-h-screen relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Messages */}
          {error && (
            <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 p-5 rounded-xl shadow-lg animate-shake">
              <div className="flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <p className="font-bold">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-700 p-5 rounded-xl shadow-lg animate-bounce-in">
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-spin">✅</span>
                <p className="font-bold">{success}</p>
              </div>
            </div>
          )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <section className="form-section">
            <HistoriaForm
              onSubmit={handleSubmit}
              editingHistoria={editingHistoria}
              onCancel={handleCancel}
              loading={loading}
            />
          </section>

          {/* List Section */}
          <section>
            <HistoriasList
              historias={historias}
              loading={loading}
              onEdit={handleEdit}
              onDelete={showDeleteModal}
              onRefresh={loadHistorias}
            />
          </section>
        </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        show={deleteModal.show}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
}

export default App;

