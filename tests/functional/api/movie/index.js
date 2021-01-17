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

describe("Post /movie/:id/reviews", () => {
  describe("when the id is valid", () => {
    it("should post the review", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews`)
      .send({"author":"kenny","reviews":"abc"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      // .expect("Content-Type", /json/)
      .expect({
        code: 201,
        msg: 'The review has been updated'
      });
    })
    it("should alert when there is no review input", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews`)
      .set("author","Kenny")

      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      // .expect("Content-Type", /json/)
      .expect({
        code: 401,
          msg: 'Please enter the reviews'
      });
    })
  });
  
})

describe("GET /movie/:id/reviews/author", () => {
  describe("when the id is valid", () => {
    it("should get the review of a specific author", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews/Kenny`)
      .send({"author":"Kenny","reviews":"abc"})
      .send({"author":"Kenny","reviews":"abc"})
      .send({"author":"Kennya","reviews":"abc"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      // .expect("Content-Type", /json/)
      .expect({
        code: 201,
        length:2
      });
    })
    it("should alert when there is no review input", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews/Kennyabc`)
      .send({"author":"Kenny","reviews":"abc"})
      .send({"author":"Kenny","reviews":"abc"})
      .send({"author":"Kennya","reviews":"abc"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      // .expect("Content-Type", /json/)
      .expect({
        code: 401,
        msg: "The author has not wrote any reviews"
      });
    })
  });
  
})
describe("Put /movie/:id/reviews/:author", () => {
    it("should update the review according to the author", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews`)
      .send({"author":"kenny","reviews":"abc"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)

      request(api)
      .put(`/api/movie/${sampleMovie.id}/reviews/:author`)
      .send({"author":"Kenny","reviews":"abcd"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      .expect({
        code:201,
        msg: 'The rate has been updated',
        length:1,
      });
    })
    it("should alert when the input author has not wrote anything", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews`)
      .send({"author":"kenny","reviews":"abc"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)

     request(api)
      .put(`/api/movie/${sampleMovie.id}/reviews/:author`)
      .send({"author":"Kenny1","reviews":"abcd"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      .expect({
        code:401,
        msg: 'There is no record in this author',
      });
    
  });
  
})

describe("Delete /movie/:id/reviews/:author", () => {
  it("should delete the review according to the author", () => {
    request(api)
    .post(`/api/movie/${sampleMovie.id}/reviews`)
    .send({"author":"kenny","reviews":"abc"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)

    request(api)
    .post(`/api/movie/${sampleMovie.id}/reviews`)
    .send({"author":"kenny","reviews":"abcd"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)

    request(api)
    .post(`/api/movie/${sampleMovie.id}/reviews`)
    .send({"author":"kenny1","reviews":"abc"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)

    request(api)
    .delete(`/api/movie/${sampleMovie.id}/reviews/:author`)
    .send({"author":"Kenny","reviews":"abcd"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)
    .expect({
      code:201,
      msg: 'The remark has been deleted',
      length:1
    });
  })
  it("should alert when there is no record in the input author", () => {
    request(api)
    .post(`/api/movie/${sampleMovie.id}/reviews`)
    .send({"author":"kenny","reviews":"abc"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)

   request(api)
    .delete(`/api/movie/${sampleMovie.id}/reviews/:author`)
    .send({"author":"Kenny1","reviews":"abcd"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)
    .expect({
      code:401,
      msg: 'There is no record in this author',
    });
  
});

})
});
