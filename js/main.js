async function init() {
    const users = await (await fetch('/data/users.json')).json();
    
    localStorage.setItem('users', JSON.stringify(users));
}