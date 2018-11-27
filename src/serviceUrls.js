export const SERVICE_URLS = (key, params) => {
    const routes = {
        'GetEmployees':`http://localhost:3000/users/`
    }
    return routes[key];
}
export function getApiUrl(key, {...params}) {
    return SERVICE_URLS(key, params);
}
