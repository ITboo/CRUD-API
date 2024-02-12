import supertest from 'supertest';

import { createServer } from '../lib/server/server';
import { createDBServer } from '../lib/server/db_server';

import { DB_PORT } from '../common/constants';
import { UserIdType } from '../common/types/types';

const server = createServer();
const serverDB = createDBServer().listen(DB_PORT);

const invalidId: UserIdType = 'something_invalid';
const validId: UserIdType = '6ff8c4e4-322b-2024-81d3-c12388932ee7';

const mockUser = {
  username: 'Mocked User',
  age: 96,
  hobbies: ['garden', 'cats', 'rock-n-roll'],
};

describe('First scenario', () => {
  afterAll((done) => {
    serverDB.close(done);
  });

  describe('status code 400 if userId is not uuid', () => {
    it('GET', async () => {
      const response = await supertest(server)
        .get(`/api/users/${invalidId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
    });

    it('PUT', async () => {
      const response = await supertest(server)
        .put(`/api/users/${invalidId}`)
        .set('Accept', 'application/json')
        .send(mockUser);

      expect(response.status).toEqual(400);
    });

    it('DELETE', async () => {
      const response = await supertest(server)
        .delete(`/api/users/${invalidId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
    });
  });

  describe('status code 404 if userId is not exist', () => {
    it('GET', async () => {
      const response = await supertest(server)
        .get(`/api/users/${validId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(404);
    });

    it('PUT', async () => {
      const response = await supertest(server)
        .put(`/api/users/${validId}`)
        .set('Accept', 'application/json')
        .send(mockUser);

      expect(response.status).toEqual(404);
    });

    it('DELETE', async () => {
      const response = await supertest(server)
        .delete(`/api/users/${validId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(404);
    });
  });
});