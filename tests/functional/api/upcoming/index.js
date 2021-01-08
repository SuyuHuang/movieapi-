import chai from "chai";
import request from "supertest";

const expect = chai.expect;

let api = require("../../../../index");;
let token='eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M'

const sampleMovie = {
  id: 337401,
  title: "Mulan",
};

describe("Upcoming endpoint", () => {
  beforeEach(async () => {
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load upcoming Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /upcoming ", () => {
    before((done)=>{
      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"test1"
      })
      .end((err,res)=>{
     
        console.log(token)
        done()
      })

    })
    it("should return 20 upcoming movies and a status 200", (done) => {
      request(api)
        .get("/api/upcoming")
        .set("Accept", "application/json")
        .set("Authorization",'BEARER '+token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
     
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  // describe("GET /movies/:id", () => {
  //   describe("when the id is valid", () => {

  //     it("should return the matching movie", () => {
  //       request(api)
  //         .get(`/api/movies/${sampleMovie.id}`)
  //         .set("Accept", "application/json")
  //         .set("Authorization",'BEARER '+token)
  //         // .expect("Content-Type", /json/)
  //         .expect(200)
  //         .then((res) => {
  //           expect(res.body).to.have.property("title", sampleMovie.title);
  //         });
  //     });
  //   });
    // describe("when the id is invalid", () => {
    //   it("should return the NOT found message", () => {
    //     return request(api)
    //       .get("/api/movies/xxx")
    //       .set("Accept", "application/json")
    //       .set("Authorization",'BEARER '+token)
    //       // .expect("Content-Type", /json/)
    //       .expect({
    //         success: false,
    //         status_code: 34,
    //         status_message: "The resource you requested could not be found.",
    //       });
    //   });
    // });
  });
// });
