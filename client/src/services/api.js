// Servicio para Piscinas
export const piscinaService = {
  getAll: async (authFetch) => {
    const response = await authFetch('/piscinas');
    if (!response.ok) throw new Error('Error obteniendo piscinas');
    return response.json();
  },

  getById: async (authFetch, id) => {
    const response = await authFetch(`/piscinas/${id}`);
    if (!response.ok) throw new Error('Error obteniendo piscina');
    return response.json();
  },

  create: async (authFetch, piscinaData) => {
    const response = await authFetch('/piscinas', {
      method: 'POST',
      body: JSON.stringify(piscinaData),
    });
    if (!response.ok) throw new Error('Error creando piscina');
    return response.json();
  }
};

// Servicio para Cosechas
export const cosechaService = {
  getAll: async (authFetch) => {
    const response = await authFetch('/cosechas');
    if (!response.ok) throw new Error('Error obteniendo cosechas');
    return response.json();
  },

  getByPiscina: async (authFetch, piscinaId) => {
    const response = await authFetch(`/cosechas/piscina/${piscinaId}`);
    if (!response.ok) throw new Error('Error obteniendo cosechas');
    return response.json();
  },

  create: async (authFetch, cosechaData) => {
    const response = await authFetch('/cosechas', {
      method: 'POST',
      body: JSON.stringify(cosechaData),
    });
    if (!response.ok) throw new Error('Error registrando cosecha');
    return response.json();
  }
};

// Servicio para Usuarios
export const userService = {
  getProfile: async (authFetch) => {
    const response = await authFetch('/user/profile');
    if (!response.ok) throw new Error('Error obteniendo perfil');
    return response.json();
  },

  updateProfile: async (authFetch, profileData) => {
    const response = await authFetch('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    if (!response.ok) throw new Error('Error actualizando perfil');
    return response.json();
  },

  changePassword: async (authFetch, passwordData) => {
    const response = await authFetch('/user/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) throw new Error('Error cambiando contraseña');
    return response.json();
  }
};