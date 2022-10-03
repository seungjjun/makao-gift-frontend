/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/login`, async (req, res, ctx) => {
    const { id, password } = await req.json();
    if (id === 'jel1y' && password === 'Qwe1234!') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '노승준',
        amount: 50_000,
      }));
    }
    return res(ctx.status(400));
  }),
  rest.get(`${baseUrl}/user/me`, async (req, res, ctx) => res(ctx.json({
    name: '노승준',
    amount: 50_000,
  }))),
);

export default server;
