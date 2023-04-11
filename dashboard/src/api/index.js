import axios from 'axios';

const Url = 'http://localhost:8000';


export const getScans = async (id) => {
    id = id || '';
    return await axios.get(`${Url}/${id}`);
}

export const addScan = async (scan) => {
    return await axios.post(`${Url}/add`, scan);
}

export const deleteScan = async (id) => {
    return await axios.delete(`${Url}/${id}`);
}

export const editScan = async (id, scan) => {
    return await axios.put(`${Url}/${id}`, scan)
}
