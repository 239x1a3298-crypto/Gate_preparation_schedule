const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Users
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  async createUser(userData: any) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Syllabus
  async getSyllabus() {
    const response = await fetch(`${API_BASE_URL}/syllabus`);
    return response.json();
  },

  async updateSyllabus(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/syllabus/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
