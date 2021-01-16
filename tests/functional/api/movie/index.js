import chai from "chai";
import request from "supertest";

const expect = chai.expect;

let api = require("../../../../index");;
let token='eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M'

const sampleMovie = {
  id: 508442,
  title: "Soul",
};

describe("Movies endpoint", () => {
  beforeEach( (done) => {
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    setTimeout(() => {
      done();
    }, 6000);
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /movie ", () => {
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
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movie")
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

  describe("GET /movie/:id", () => {
    describe("when the id is valid", () => {

      it("should return the matching movie", () => {
        request(api)
          .get(`/api/movie/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization",'BEARER '+token)
          // .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("original_title", sampleMovie.title);
          });
      });
    });

    
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
  describe("Post /movie/:id", () => {
  describe("when the id is valid", () => {

    it("should update the rate", () => {
      request(api)
        .post(`/api/movie/${sampleMovie.id}`)
        .set("value",8)
        .set("Accept", "application/json")
        .set("Authorization",'BEARER '+token)
        // .expect("Content-Type", /json/)
        .expect(201)
        .then((res) => {
          expect(res.body.rate.length).to.equal(1);
        });
    });
    it("should alert the body doesn't have the value", () => {
        request(api)
          .post(`/api/movie/${sampleMovie.id}`)
          .set("vae",8)
          .set("Accept", "application/json")
          .set("Authorization",'BEARER '+token)
          // .expect("Content-Type", /json/)
        .expect({
            code: 403,
            msg: 'Please enter the value'
          });
      });
      it("should alert that the value should be a number", () => {
        request(api)
          .post(`/api/movie/${sampleMovie.id}`)
          .set("value","aaa")
          .set("Accept", "application/json")
          .set("Authorization",'BEARER '+token)
          // .expect("Content-Type", /json/)
          .expect({
            code: 402,
            msg: 'Please enter the valid rate'
          });
      });
  });
  describe("when the id is invalid", () => {
    request(api)
    .post(`/api/movie/xxx`)
    .set("value",8)
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)
    // .expect("Content-Type", /json/)
    .expect({
        code: 401,
        msg: 'The movie does not exist'
    });
  })
});
});
