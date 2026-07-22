export class AppController {
  async APP(req, res, handler) {
    try {
      const result = await handler();
      if (res) res.obj(result);
    } catch (error) {
      console.error("Error creating Application instance:", error);
      throw error;
    }
  }
  async GET(req, res = null, handler) {
    await this.APP(req, res, handler);
  }
  async POST(req, res = null, handler) {
    await this.APP(req, res, handler);
  }
  async PUT(req, res = null, handler) {
    await this.APP(req, res, handler);
  }
  async DELETE(req, res = null, handler) {
    await this.APP(req, res, handler);
  }
}
