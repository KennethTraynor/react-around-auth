const baseUrl = 'https://register.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => handleResponse(res))
};

export const authorize = (password, email) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => handleResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return Promise.reject(data);
            }
        })
};

export const getContent = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => handleResponse(res))
}

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res);
}