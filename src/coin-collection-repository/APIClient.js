export class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async API(endpoint, method, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options,
      });
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          if (data.name === "AuthenticationError" || data.status === 401)
            return { authenticated: false, message: data.message };
          throw response;
        }
        return data;
      }
      if (contentType?.includes("image/svg+xml")) return await response.text();
      return await response.text();
    } catch (error) {
      console.error("APIClient error:", error);
      throw error;
    }
  }
  GET(endpoint) {
    return this.API(endpoint, "GET");
  }
  POST(endpoint, dto) {
    return this.API(endpoint, "POST", dto);
  }
  PUT(endpoint, dto) {
    return this.API(endpoint, "PUT", dto);
  }
  DELETE(endpoint) {
    return this.API(endpoint, "DELETE");
  }
}
