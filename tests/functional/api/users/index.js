import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
let api;
const expect = chai.expect;

let db;

let token='eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M'
const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    before((done)=>{
      request(api)
      .post("/api/users")  
      .send({
        "username":"user1",
        "password":"test1"
        
      })
      
      .end((err,res)=>{
        
        console.log('BEARER '+token)
        done()
      })

    })
    it("should be able to register", () => {
      
      return request(api)
        .post("/api/users?action=register")
        .set("Authorization",'BEARER '+token)
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .expect({code: 201, msg: 'Successful created new user.'});
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .set("Authorization",'BEARER '+token)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(3);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2", "user3"]);
        });
    });
  });
});
