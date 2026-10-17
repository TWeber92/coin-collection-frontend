export class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async API(endpoint, method, { headers = {}, body } = {}) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        credentials: "include",
        body,
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
    return this.API(endpoint, "POST", { body: JSON.stringify(dto) });
  }
  PUT(endpoint, dto) {
    return this.API(endpoint, "PUT", { body: JSON.stringify(dto) });
  }
  DELETE(endpoint, id) {
    return this.API(endpoint, "DELETE", id);
  }
}