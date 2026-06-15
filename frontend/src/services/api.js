const BASE_URL = 'http://localhost:5001/api';

const getHeaders = (options = {}) => {
    const headers = { ...options };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = response.statusText;
        try {
            const errorObj = await response.json();
            errorMessage = errorObj.error || errorMessage;
        } catch (e) {
            errorMessage = await response.text() || errorMessage;
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

const fetchWithAuth = (url, options = {}) => {
    return fetch(url, {
        ...options,
        headers: getHeaders(options.headers)
    }).then(handleResponse);
};

export const api = {
    auth: {
        login: (credentials) => fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }).then(handleResponse),
        register: (userData) => fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(handleResponse)
    },
    teams: {
        getAll: () => fetchWithAuth(`${BASE_URL}/teams`),
        getById: (id) => fetchWithAuth(`${BASE_URL}/teams/${id}`)
    },
    races: {
        getAll: () => fetchWithAuth(`${BASE_URL}/races`),
        getById: (id) => fetchWithAuth(`${BASE_URL}/races/${id}`),
        create: (data) => fetchWithAuth(`${BASE_URL}/races`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    },
    components: {
        getAll: () => fetchWithAuth(`${BASE_URL}/components`),
        getById: (id) => fetchWithAuth(`${BASE_URL}/components/${id}`),
        create: (data) => fetchWithAuth(`${BASE_URL}/components`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    },
    shipments: {
        getAll: () => fetchWithAuth(`${BASE_URL}/shipments`),
        getById: (id) => fetchWithAuth(`${BASE_URL}/shipments/${id}`)
    },
    expenses: {
        getAll: () => fetchWithAuth(`${BASE_URL}/expenses`),
        getById: (id) => fetchWithAuth(`${BASE_URL}/expenses/${id}`)
    },
    settings: {
        get: () => fetchWithAuth(`${BASE_URL}/settings`),
        update: (data) => fetchWithAuth(`${BASE_URL}/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    },
    database: {
        getStats: () => fetchWithAuth(`${BASE_URL}/database/stats`),
        runQuery: (query) => fetchWithAuth(`${BASE_URL}/database/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        })
    }
};
