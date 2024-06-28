import supertest from 'supertest';

import { createServer } from '../lib/server/server';
import { createDBServer } from '../lib/server/db_server';

import { DB_PORT } from '@/common/constants';

const server = createServer();
const serverDB = createDBServer().listen(DB_PORT);

const withoutAge = {
  username: 'Poopsen',
  hobbies: ['hiding age'],
};

const withoutHobbies = {
  username: 'Woopsen',
  age: 1024,
};

const withoutUsername = {
    age: 333,
    hobbies: ['hiding username'],
  };

const invalidHobbies = {
  username: 'Weird One',
  age: 45,
  hobbies: [12345],
};

const invalidHobbiesType = {
  username: 'Weird Two',
  age: 45,
  hobbies: 123456,
};

describe('Second scenario', () => {
  afterAll((done) => {
    serverDB.close(done);
  });

  it("doesn't create new user without username", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(withoutUsername);

    expect(response.status).toEqual(400);
  });

  it("doesn't create new user without age", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(withoutAge);

    expect(response.status).toEqual(400);
  });

  it("doesn't create new user without hobbies", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(withoutHobbies);

    expect(response.status).toEqual(400);
  });

  it("doesn't create new user with invalid hobbies", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(invalidHobbies);

    expect(response.status).toEqual(400);
  });

  it("doesn't create new user with invalid types of hobbies", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(invalidHobbiesType);

    expect(response.status).toEqual(400);
  });
});