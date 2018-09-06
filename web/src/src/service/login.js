export function githubLogin() {
    const githubClientId = '3ef56cc0eabe1f73c4b0';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=http://127.0.0.1:9001/login/callback`;
}
