export class MockClient {
  constructor({ fail = false } = {}) {
    this.fail = fail;
    this.user = {
      id: "mock-uuid",
      email: "tadweber92@gmail.com",
      createdAt: "2026-08-15T12:00:00.000Z",
      collection: {
        favorites: ["California", "Texas"],
        archive: ["Nevada"],
      },
    };
  }
  PUT(endpoint, entity) {
    if (this.fail) return { message: "Session expired", authenticated: false };
    if (endpoint === "/api/user/collection") {
      this.user.collection = entity.collection;
    }
    return this.user;
  }
}
