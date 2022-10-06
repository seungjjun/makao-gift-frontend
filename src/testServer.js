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

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json({
    product: {
      id: 1, manufacturer: '킹왕짱젤리', name: '젤리세트', option: '대왕젤리2개포함한', price: 10_000,
    },
  }))),

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 1, manufacturer: '킹왕짱젤리', name: '젤리세트', option: '대왕젤리2개포함한', price: 10_000,
      },
      {
        id: 2, manufacturer: '롯데', name: '감자칩', option: '어제 캔 감자로 만든', price: 3_000,
      },
      {
        id: 3, manufacturer: '빙그레', name: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', price: 1_000,
      },
      {
        id: 4, manufacturer: '씨맥스', name: '비타민MAX', option: '한달치 비타민이 들어가있는', price: 10_000,
      },
      {
        id: 5, manufacturer: 'C&C', name: '내츄럴 티슈(50 WIPES)', option: '10년 묵은때도 한번에 닦을 수 있는', price: 5_000,
      },
      {
        id: 6, manufacturer: 'coke', name: '코카콜라', option: '설탕은 1도 안들었지만 매우 달달한', price: 2_500,
      },
      {
        id: 7, manufacturer: '롯데', name: '죠스바', option: '진짜 죠스를 먹는듯한 느낌을 가진', price: 1_000,
      },
      {
        id: 8, manufacturer: '애쁠', name: '밀북', option: '한번쓰면 맥북은 생각도 나지 않는 최고의 가성비', price: 50_000,
      },
      {
        id: 9, manufacturer: '샘송', name: '네뷸라워치', option: '시계로 할 수 있는건 다 있다. 상상을 뛰어넘는 워치', price: 30_000,
      },
    ],
  }))),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(ctx.json({
    transactions: [
      {
        id: 1,
        receiver: '노승준',
        manufacturer: '빙그레',
        productName: '요맘때',
        option: '수억마리의 유산균이 싱싱하게 살아있는',
        productNumber: 1,
        address: '서울 종로',
        price: 1_000,
        message: '선물도착',
        purchaseDate: '2022-10-06',
      },
    ],
  }))),
);

export default server;
