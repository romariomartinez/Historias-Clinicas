/**
 * Aplicación Frontend para Gestión de Historias Clínicas
 * Conecta con la API REST para realizar operaciones CRUD
 */

const API_BASE_URL = '/historias-clinicas';

// Elementos del DOM
const historiaForm = document.getElementById('historia-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const refreshBtn = document.getElementById('refresh-btn');
const historiasList = document.getElementById('historias-list');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const emptyState = document.getElementById('empty-state');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

let historiaIdToDelete = null;
let isEditMode = false;

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    // Establecer fecha de hoy por defecto
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha_consulta').value = today;
    
    loadHistorias();
    setupEventListeners();
});

/**
 * Configura los event listeners
 */
function setupEventListeners() {
    // Formulario
    historiaForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);

    // Botones
    refreshBtn.addEventListener('click', loadHistorias);

    // Modal de eliminación
    confirmDeleteBtn.addEventListener('click', handleDelete);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
}

/**
 * Carga todas las historias clínicas desde la API
 */
async function loadHistorias() {
    try {
        showLoading();
        hideError();
        
        const response = await fetch(API_BASE_URL);
        const data = await response.json();

        if (data.success) {
            displayHistorias(data.data);
        } else {
            showError('Error al cargar las historias clínicas: ' + (data.message || 'Error desconocido'));
        }
    } catch (error) {
        showError('Error de conexión: ' + error.message);
        console.error('Error al cargar historias clínicas:', error);
    } finally {
        hideLoading();
    }
}

/**
 * Muestra la lista de historias clínicas en el DOM
 */
function displayHistorias(historias) {
    historiasList.innerHTML = '';

    if (historias.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    historias.forEach(historia => {
        const historiaCard = createHistoriaCard(historia);
        historiasList.appendChild(historiaCard);
    });
}

/**
 * Crea un elemento card para una historia clínica
 */
function createHistoriaCard(historia) {
    const card = document.createElement('div');
    card.className = 'curso-card';

    const fechaConsulta = new Date(historia.fecha_consulta).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const fechaCreacion = new Date(historia.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    card.innerHTML = `
        <div class="curso-header">
            <div>
                <h3 class="curso-title">${escapeHtml(historia.paciente_nombre)}</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 5px;">
                    Cédula: ${escapeHtml(historia.paciente_cedula)} | Edad: ${historia.paciente_edad} años
                </p>
            </div>
            <div class="curso-actions">
                <button class="btn btn-primary btn-sm btn-edit" data-id="${historia.id}">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger btn-sm btn-delete" data-id="${historia.id}">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
        <div class="curso-info">
            <p><strong>Fecha de Consulta:</strong> ${fechaConsulta}</p>
            ${historia.sintomas ? `<p><strong>Síntomas:</strong> ${escapeHtml(historia.sintomas)}</p>` : ''}
            <p><strong>Diagnóstico:</strong> ${escapeHtml(historia.diagnostico)}</p>
            <p><strong>Tratamiento:</strong> ${escapeHtml(historia.tratamiento)}</p>
            <p><strong>Médico:</strong> ${escapeHtml(historia.medico)}</p>
            ${historia.observaciones ? `<p><strong>Observaciones:</strong> ${escapeHtml(historia.observaciones)}</p>` : ''}
        </div>
        <div class="curso-footer">
            <span>ID: ${historia.id}</span>
            <span>Registrado: ${fechaCreacion}</span>
        </div>
    `;

    // Agregar event listeners a los botones
    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = card.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', () => {
        const id = parseInt(editBtn.getAttribute('data-id'));
        editHistoria(id);
    });
    
    deleteBtn.addEventListener('click', () => {
        const id = parseInt(deleteBtn.getAttribute('data-id'));
        showDeleteModal(id);
    });

    return card;
}

/**
 * Maneja el envío del formulario (crear o actualizar)
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        paciente_nombre: document.getElementById('paciente_nombre').value.trim(),
        paciente_edad: parseInt(document.getElementById('paciente_edad').value),
        paciente_cedula: document.getElementById('paciente_cedula').value.trim(),
        fecha_consulta: document.getElementById('fecha_consulta').value,
        sintomas: document.getElementById('sintomas').value.trim() || null,
        diagnostico: document.getElementById('diagnostico').value.trim(),
        tratamiento: document.getElementById('tratamiento').value.trim(),
        medico: document.getElementById('medico').value.trim(),
        observaciones: document.getElementById('observaciones').value.trim() || null
    };

    try {
        showLoading();
        hideError();

        const url = isEditMode 
            ? `${API_BASE_URL}/${document.getElementById('historia-id').value}`
            : API_BASE_URL;

        const method = isEditMode ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            resetForm();
            loadHistorias();
            showSuccessMessage(isEditMode ? 'Historia clínica actualizada exitosamente' : 'Historia clínica creada exitosamente');
        } else {
            showError('Error: ' + (data.message || data.error || 'Error desconocido'));
        }
    } catch (error) {
        showError('Error de conexión: ' + error.message);
        console.error('Error al guardar historia clínica:', error);
    } finally {
        hideLoading();
    }
}

/**
 * Carga una historia clínica para editar
 */
async function editHistoria(id) {
    // Validar que el ID sea un número válido
    const historiaId = parseInt(id);
    if (isNaN(historiaId) || historiaId <= 0) {
        showError('ID inválido para editar');
        return;
    }

    try {
        showLoading();
        hideError();

        const response = await fetch(`${API_BASE_URL}/${historiaId}`);
        const data = await response.json();

        if (data.success) {
            const historia = data.data;
            
            document.getElementById('historia-id').value = historia.id;
            document.getElementById('paciente_nombre').value = historia.paciente_nombre;
            document.getElementById('paciente_edad').value = historia.paciente_edad;
            document.getElementById('paciente_cedula').value = historia.paciente_cedula;
            document.getElementById('fecha_consulta').value = historia.fecha_consulta;
            document.getElementById('sintomas').value = historia.sintomas || '';
            document.getElementById('diagnostico').value = historia.diagnostico;
            document.getElementById('tratamiento').value = historia.tratamiento;
            document.getElementById('medico').value = historia.medico;
            document.getElementById('observaciones').value = historia.observaciones || '';

            formTitle.textContent = 'Editar Historia Clínica';
            submitBtn.textContent = 'Actualizar Historia';
            cancelBtn.style.display = 'block';
            isEditMode = true;

            // Scroll al formulario
            document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
        } else {
            showError('Error al cargar la historia clínica: ' + data.message);
        }
    } catch (error) {
        showError('Error de conexión: ' + error.message);
        console.error('Error al cargar historia clínica:', error);
    } finally {
        hideLoading();
    }
}

/**
 * Muestra el modal de confirmación para eliminar
 */
function showDeleteModal(id) {
    // Validar que el ID sea un número válido
    const historiaId = parseInt(id);
    if (isNaN(historiaId) || historiaId <= 0) {
        showError('ID inválido para eliminar');
        return;
    }
    
    historiaIdToDelete = historiaId;
    deleteModal.style.display = 'flex';
}

/**
 * Cierra el modal de eliminación
 */
function closeDeleteModal() {
    deleteModal.style.display = 'none';
    historiaIdToDelete = null;
}

/**
 * Elimina una historia clínica
 */
async function handleDelete() {
    if (!historiaIdToDelete) {
        showError('No se ha seleccionado una historia clínica para eliminar');
        return;
    }

    // Asegurar que el ID sea un número válido
    const historiaId = parseInt(historiaIdToDelete);
    if (isNaN(historiaId) || historiaId <= 0) {
        showError('ID inválido. Debe ser un número entero positivo');
        closeDeleteModal();
        return;
    }

    try {
        showLoading();
        hideError();
        closeDeleteModal();

        const response = await fetch(`${API_BASE_URL}/${historiaId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            loadHistorias();
            showSuccessMessage('Historia clínica eliminada exitosamente');
        } else {
            showError('Error al eliminar: ' + (data.message || 'Error desconocido'));
        }
    } catch (error) {
        showError('Error de conexión: ' + error.message);
        console.error('Error al eliminar historia clínica:', error);
    } finally {
        hideLoading();
    }
}

/**
 * Resetea el formulario a su estado inicial
 */
function resetForm() {
    historiaForm.reset();
    document.getElementById('historia-id').value = '';
    
    // Restablecer fecha de hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha_consulta').value = today;
    
    formTitle.textContent = 'Nueva Historia Clínica';
    submitBtn.textContent = 'Guardar Historia';
    cancelBtn.style.display = 'none';
    isEditMode = false;
    hideError();
}

/**
 * Muestra un mensaje de éxito temporal
 */
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message';
    successDiv.style.background = '#d1fae5';
    successDiv.style.color = '#065f46';
    successDiv.style.borderLeftColor = '#10b981';
    successDiv.textContent = message;
    
    const listSection = document.querySelector('.list-section');
    listSection.insertBefore(successDiv, listSection.firstChild);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

/**
 * Muestra un mensaje de error
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Oculta el mensaje de error
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Muestra el indicador de carga
 */
function showLoading() {
    loading.style.display = 'block';
    historiasList.style.opacity = '0.5';
}

/**
 * Oculta el indicador de carga
 */
function hideLoading() {
    loading.style.display = 'none';
    historiasList.style.opacity = '1';
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Las funciones ya no necesitan ser globales, se usan con event listeners
