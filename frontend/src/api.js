const apiFetch = async (endpoint, options = {}) => {
  try {

    const token = localStorage.getItem("token");
    console.log(`Using token: ${token}`);
    const res = await fetch(`http://localhost:5500/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      },
      ...options
    });

    const data = await res.json();


    if (!res.ok || data.success === false) {
      throw new Error(data.message || `HTTP ${res.status} - ${res.statusText} ${data.error || ''}`);
    }

    return data;
  } catch (error) {

    if (error instanceof TypeError) {
      throw new Error("Network error. Please check your connection.");
    }

    throw error;
  }
};

export default apiFetch;