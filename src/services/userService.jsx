import { API } from './api.jsx';

export const getUserById = (id) => API.get(`/users/${id}`);

export const getProjectById = (id) => API.get(`/users/${id}`);

// export const newProject = (project) => API.post('/projects', project);

// export const deleteProjectById = (id) => API.delete('/projects/' + id);

// export const updateProject = (project) => API.put('/projects', project);