import chai from "chai";
import request from "supertest";

const expect = chai.expect;

let api = require("../../../../index");;
let token='eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M'

const sampleMovie = {
  id: 337401,
  title: "Mulan",
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
  describe("GET /movies ", () => {
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
        .get("/api/movies")
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
    it("should return 20 movies according to the specific kind", (done) => {
      request(api)
        .get("/api/movies/kind/popularity")
        .set("Accept", "application/json")
        .set("Authorization",'BEARER '+token)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          expect(res.body[0].popularity>res.body[1].popularity)
          done();
        });
    });

    it("should return the error message the kind is invalid", () => {
      request(api)
        .get("/api/movies/kind/age")
        .set("Accept", "application/json")
        .set("Authorization",'BEARER '+token)
        .expect("Content-Type", /json/)
        .expect(401)
        .expect({
      
            code:401,
            msg: 'The movies can not be sorted by this kind'
            
         
        });
      
    });
  });

  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {

      it("should return the matching movie", () => {
        request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization",'BEARER '+token)
          // .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
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
});
// await ActorModel.collection.find().sort({popularity:1})