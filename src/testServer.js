/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}`, async (req, res, ctx) => res(ctx.json({
    name: '노승준',
    amount: 50_000,
  }))),

  rest.post(`${baseUrl}/login`, async (req, res, ctx) => {
    const { userId, password } = await req.json();
    if (userId === 'jel1y' && password === 'password') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '노승준',
        amount: 50_000,
      }));
    }

    if (userId === '') {
      return res(
        ctx.status(400),
        ctx.json('아이디를 입력해주세요'),
      );
    }
    if (!password) {
      return res(
        ctx.status(400),
        ctx.json('비밀번호를 입력해주세요'),
      );
    }

    return res(ctx.status(400));
  }),

  rest.post(`${baseUrl}/signup`, async (req, res, ctx) => {
    const {
      name, userId, password, confirmPassword,
    } = await req.json();

    if (name === '') {
      return res(
        ctx.status(400),
        ctx.json('이름을 입력해주세요'),
      );
    }

    if (userId === '') {
      return res(
        ctx.status(400),
        ctx.json('아이디를 입력해주세요'),
      );
    }

    if (password === '') {
      return res(
        ctx.status(400),
        ctx.json('비밀번호를 입력해주세요'),
      );
    }

    if (confirmPassword === '') {
      return res(
        ctx.status(400),
        ctx.json('비밀번호를 입력해주세요'),
      );
    }

    return res(ctx.json({ name, userId }));
  }),

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json({
    id: 1, manufacturer: '킹왕짱젤리', name: '젤리세트', option: '대왕젤리2개포함한', price: 10_000,
  }))),

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => {
    const page = await req.url.searchParams.get('page');

    if (page === '1') {
      return res(ctx.json({
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
        ],

        productNumber: 8,
      }));
    }

    if (page === '2') {
      return res(ctx.json({
        products: [
          {
            id: 9, manufacturer: '샘송', name: '네뷸라워치', option: '시계로 할 수 있는건 다 있다. 상상을 뛰어넘는 워치', price: 30_000,
          },
          {
            id: 10, manufacturer: '샘송', name: '네뷸라워치', option: '시계로 할 수 있는건 다 있다. 상상을 뛰어넘는 워치', price: 30_000,
          },
        ],

        productNumber: 10,
      }));
    }
  }),

  rest.post(`${baseUrl}/order`, async (req, res, ctx) => {
    const {
      userId, receiver, address, message, productNumber,
      price, manufacturer, productName, option, image,
    } = await req.json();

    if (receiver === '') {
      return res(
        ctx.status(400),
        ctx.json('성함을 입력해주세요'),
      );
    }

    if (address === '') {
      return res(
        ctx.status(400),
        ctx.json('주소를 입력해주세요'),
      );
    }

    return res(
      ctx.json({
        userId,
        receiver,
        address,
        message,
        productNumber,
        price,
        manufacturer,
        productName,
        option,
        image,
      }),
    );
  }),

  rest.get(`${baseUrl}/orders/1`, async (req, res, ctx) => res(ctx.json({
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
  }))),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    const page = await req.url.searchParams.get('page');

    if (page === '1') {
      return res(ctx.json({
        transactions: [
          {
            id: 1, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },
          {
            id: 2, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },
          {
            id: 3, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },
          {
            id: 4, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },
          {
            id: 5, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },
          {
            id: 6, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },
          {
            id: 7, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },
          {
            id: 8, receiver: '노승준', sender: 'jel1y', manufacturer: '빙그레', productName: '요맘때', option: '수억마리의 유산균이 싱싱하게 살아있는', productNumber: 1, address: '서울 종로', price: 1_000, message: '선물도착', createdAt: '2022-10-06',
          },

        ],
        transactionNumber: 8,
      }));
    }

    if (page === '2') {
      return res(ctx.json({
        transactions: [
          {
            id: 9,
            receiver: '노승준',
            sender: 'jel1y',
            manufacturer: '빙그레',
            productName: '요맘때',
            option: '수억마리의 유산균이 싱싱하게 살아있는',
            productNumber: 1,
            address: '서울 종로',
            price: 1_000,
            message: '선물도착',
            createdAt: '2022-10-06',
          },
        ],
        transactionNumber: 9,
      }));
    }
  }),

);

export default server;
