const expect = require("chai").expect;
const request = require("request");

describe("Plant API (/api/plants)", function () {
  const baseUrl = "http://localhost:3000";

  it("Valid: GET /api/plants returns 200 and JSON structure", function (done) {
    request.get(`${baseUrl}/api/plants`, function (error, response, body) {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);

      const parsed = JSON.parse(body);
      expect(parsed).to.have.property("statusCode", 200);
      expect(parsed).to.have.property("data");
      expect(parsed.data).to.be.an("array");

      done();
    });
  });

  it("Valid: GET /api/plants?limit=2 returns at most 2 records", function (done) {
    request.get(`${baseUrl}/api/plants?limit=2`, function (error, response, body) {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);

      const parsed = JSON.parse(body);
      expect(parsed.data).to.be.an("array");
      expect(parsed.data.length).to.be.at.most(2);

      done();
    });
  });

  it("Invalid: GET /api/plants?limit=0 returns 400", function (done) {
    request.get(`${baseUrl}/api/plants?limit=0`, function (error, response, body) {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(400);

      const parsed = JSON.parse(body);
      expect(parsed).to.have.property("statusCode", 400);

      done();
    });
  });
});