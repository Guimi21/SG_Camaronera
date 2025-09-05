

// Servicio para Usuarios
export const userService = {
  getProfile: async (authFetch) => {
    const response = await authFetch('/user/profile');
    if (!response.ok) throw new Error('Error obteniendo perfil');
    return response.json();
  },

  
};