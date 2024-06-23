import axios from 'axios';

const API_URL = 'http://192.168.79.122:8000/api'; // Actualiza con tu URL base de la API

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export const getData = async (endpoint) => {
  const response = await axiosInstance.get(endpoint);
  return response.data;
};

export const createData = async (endpoint, data, isFormData = false) => {
  const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.post(`${API_URL}${endpoint}`, data, config);
  return response.data;
};

export const updateData = async (endpoint, id, data, isFormData = false) => {
  const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.put(`${API_URL}${endpoint}/${id}/`, data, config);
  return response.data;
};

export const updateDato = async (endpoint, data) => {
  const response = await axios.put(`${API_URL}${endpoint}`, data);
  return response.data;
};

export const deleteData = async (endpoint, id) => {
  const response = await axiosInstance.delete(`${endpoint}/${id}/`);
  return response.data;
};

// Nuevas funciones para sensor_data y servo_motor_state
export const getSensorData = async () => {
  return await getData('/sensor_data/');
};

export const getServoMotorState = async () => {
  return await getData('/servo_motor_state/');
};

export const updateServoMotorState = async (data) => {
  return await updateDato('/servo_motor_state/', data);
};
