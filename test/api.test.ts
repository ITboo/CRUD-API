import supertest from "supertest";
import { server } from "../src/index";

const app = server;
const Route = '/api/users';
let id = '';
const fakeUser = Object.assign({
    name: "test-user",
    age: 25,
    hobbies: ["test-hobby"]});

// Get all records with a GET api/users request (an empty array is expected)
describe('Server test - 1 - Getting all records', () => {
    it('returns an empty array', async () => {
        await supertest(app)
            .get(Route)
        expect([]);
    });
    afterAll(() => app.close());
});
//With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)



//A new object is created by a POST api/users request (a response containing newly created record is expected)
describe('Server test - 2 - Creating a new user', () => {
    it('creates a new user', async () => {
        
            const res = await supertest(app)
            .post(Route)
            .send(fakeUser)
            .expect(201);
        })

    });
      afterAll(() => app.close());

