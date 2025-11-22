const API_BASE_URL = '/historias-clinicas';

export const getAllHistorias = async () => {
  const response = await fetch(API_BASE_URL);
  return await response.json();
};

export const getHistoriaById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return await response.json();
};

export const getHistoriasByCedula = async (cedula) => {
  const response = await fetch(`${API_BASE_URL}/cedula/${cedula}`);
  return await response.json();
};

export const createHistoria = async (data) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updateHistoria = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteHistoria = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};

