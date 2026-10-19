const API_BASE_URL = "http://localhost:8081";

function getToken() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    throw new Error("You are not logged in.");
  }

  const user = JSON.parse(storedUser);

  if (!user.token) {
    throw new Error("Authentication token is missing.");
  }

  return user.token;
}

async function fetchStudent(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again.");
  }

  if (response.status === 403) {
    throw new Error("You are not allowed to view this profile.");
  }

  if (response.status === 404) {
    throw new Error("Student profile not found.");
  }

  if (!response.ok) {
    throw new Error("Unable to load the student profile.");
  }

  return response.json();
}

export function getMyProfile() {
  return fetchStudent("/profile");
}

export function getStudentProfile(studentId) {
  return fetchStudent(`/students/${studentId}`);
}