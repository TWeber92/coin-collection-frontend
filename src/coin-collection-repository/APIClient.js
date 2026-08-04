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
      if (!response.ok) throw response;
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("image/svg+xml")) return await response.text();
      return await response.json();
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
