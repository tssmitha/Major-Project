export function getDashboardPath(role) {
  if (role === "Student") return "/dashboard";
  if (role === "Admin") return "/admin/dashboard";
  return null;
}

export function getSession() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.token || !getDashboardPath(user.role)) {
      return null;
    }

    const parts = user.token.split(".");
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded));

    if (
      typeof payload.exp !== "number" ||
      payload.exp * 1000 <= Date.now()
    ) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}