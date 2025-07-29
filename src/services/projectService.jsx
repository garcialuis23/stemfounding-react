import { API } from './api.jsx';

export const getProjectList = () => API.get('/projects');
export const getProjectById = (id) => API.get(`/projects/${id}`);
export const newProject = (project) => API.post('/projects', project);
export const getInvestmentsByProjectId = (id) => API.get(`/projects/${id}/investments`);
export const deleteComment2 = (projectId, commentIndex) => API.delete(`/projects/${projectId}/comments/${commentIndex}`);
export const updateComment2 = (projectId, commentIndex, comment) => API.put(`/projects/${projectId}/comments/${commentIndex}`, comment);
export const addComment2 = (projectId, comment) => API.post(`/projects/${projectId}/comments`, comment);
export const inactivateProject = (projectId) => API.put(`/projects/${projectId}/inactivate`);
export const updateProject = (projectId, project) => API.put(`/projects/${projectId}`, project);

// export const deleteProjectById = (id) => API.delete('/projects/' + id);
// export const updateProject = (project) => API.put('/projects', project);