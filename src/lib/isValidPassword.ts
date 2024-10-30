export async function isValidPassword(
  password: string,
  hashedPassword: string
) {
  return (await hashPassword(password)) === hashedPassword
}

export async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  )

  return Buffer.from(arrayBuffer).toString("base64")
}


export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function isValidPhone(num: string) {
  // const phoneReg = /^0\d{9}$/
  return num.startsWith("+") && num.length < 15
}
