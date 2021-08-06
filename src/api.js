import axios from "axios";
const baseURL = `${process.env.REACT_APP_SERVER_HOSTNAME}/api`;

/* PROJECT ROUTES */

//What we do is removing the need to write //localhost:3000... everytime in the routes...
//...now we've just set a base URL
export const getAllProjects = () => {
    return axios.get(`${baseURL}/projects`);
};

export const addProject = (project) => {
    return axios.post(`${baseURL}/projects`, project, { withCredentials: true });
};

export const getProject = (projectId) => {
    return axios.get(`${baseURL}/projects/${projectId}`);};

export const deleteProject = (projectId) => {
    return axios.delete(`${baseURL}/projects/${projectId}`);
  };
  
  export const updateProject = (updatedProject) => {
    return axios.put(`${baseURL}/projects/${updatedProject.id}`, updatedProject);
  };
  
  export const uploadFile = (uploadData) => {
    return axios.post(`${baseURL}/upload`, uploadData);
  };


/* AUTHENTICATION API ROUTES */

export const signup = (user) => {
    return axios.post(`${baseURL}/signup`, user);
  };
  
  export const login = (user) => {
    return axios.post(`${baseURL}/login`, user, { withCredentials: true });
  };

  export const loggedIn = () => {
    return axios.get(`${baseURL}/loggedin`, { withCredentials: true });
  }

  export const logout = () => {
    return axios.post(`${baseURL}/logout`, null, { withCredentials: true });
  };