const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

export const getEnv = () => {
    console.log(params.local)
    if (params.local) return 'https://localhost:44300/api';
    else return 'http://194.90.158.74/cgroup99/prod/api'
}