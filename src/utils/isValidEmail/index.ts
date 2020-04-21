// OWASP approved email validation regex, yet eslint-security says its unsafe
// eslint-disable-next-line
const RE = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
export const isValidEmail = (email: string): boolean => RE.test(email);
