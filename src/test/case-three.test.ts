import supertest from 'supertest';

import { createServer } from '../lib/server/server';
import { createDBServer } from '../lib/server/db_server';

import { DB_PORT } from '../common/constants';
import { UserIdType } from '../common/types/types';

const server = createServer();
const serverDB = createDBServer().listen(DB_PORT);

const newUser = {
  username: 'Billie Gates',
  age: 60,
  hobbies: ['coding', 'money', 'anime'],
};

const updatedAge = { ...newUser, age: 30 };

describe('Third scenario', () => {
  afterAll((done) => {
    serverDB.close(done);
  });

  let userId: UserIdType;

  it('gets empty users array', async () => {
    const res = await supertest(server).get('/api/users').set('Accept', 'application/json');

    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('creates new user and receive it', async () => {
    expect.assertions(3);
    const res = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(newUser);

    expect(res.status).toEqual(201);
    expect(res.body.id).toBeDefined();
    userId = res.body.id;
    expect(res.body).toStrictEqual({ id: userId, ...newUser });
  });

  it('gets the created user', async () => {
    const res = await supertest(server)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(200);
    expect(res.body).toStrictEqual({ id: userId, ...newUser });
  });

  it('updates user', async () => {
    const res = await supertest(server)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send(updatedAge);

    expect(res.status).toEqual(200);
    expect(res.body).toStrictEqual({ id: userId, ...updatedAge });
  });

  it('deletes user', async () => {
    const response = await supertest(server)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(204);
  });

  it("doesn't get deleted user", async () => {
    const response = await supertest(server)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);
  });
});