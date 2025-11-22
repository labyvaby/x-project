export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem('auth') === 'true';
  } catch {
    return false;
  }
}

export function setAuthenticated(value: boolean) {
  try {
    if (value) localStorage.setItem('auth', 'true');
    else localStorage.removeItem('auth');
  } catch {
    // ignore
  }
}
