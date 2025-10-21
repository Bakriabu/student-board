export function isAdminByEmail(email){
  const admin = import.meta.env.VITE_ADMIN_EMAIL
  if(!admin) return false
  return email === admin
}