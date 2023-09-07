import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import app from '../../../app.js';

describe('Test suit for AdminController', () => {
  describe('#getBestProfession', () => {
    test.todo('');
  });

  describe('#getBestClients', () => {
    test.todo('');
  });

  describe('#getProfileById', () => {
    test('should be able to get a user by id', async () => {
      const userId = 1;

      const userResponse = await request(app)
        .get(`/admin/profile/${userId}`);

      expect(userResponse.status).toBe(200);
      expect(userResponse.body.data.firstName).toBe('Harry');
      expect(userResponse.body.data.lastName).toBe('Potter');
      expect(userResponse.body.data.profession).toBe('Wizard');
    });

    test('should throw 404 if the user id does not exists', async () => {
      const userId = 999;

      const userResponse = await request(app)
        .get(`/admin/profile/${userId}`);

      expect(userResponse.status).toBe(404);
      expect(userResponse.body).toStrictEqual({ message: 'User not found!' });
    });
  })
});