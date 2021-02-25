const dotenv = require('dotenv');
const { authorize } = require('./user.controller');
const User = require('./User');

describe('Should test authorize middleware', () => {
  let responseMock;
  let nextMock;

  beforeAll(() => {
    dotenv.config();
    jest.mock('./User');
    const response = {
      test: 'data',
    };
    User.findById = jest.fn(() => Promise.resolve(response));
  });

  beforeEach(() => {
    responseMock = {
      status: jest.fn(() => {
        return {
          send: jest.fn(),
        };
      }),
    };
    nextMock = jest.fn();
  });

  it('User token is missed', () => {
    const requestMock = {
      get: jest.fn(),
    };

    authorize(requestMock, responseMock, nextMock);

    expect(responseMock.status.mock.calls.length).toBe(1);
    expect(responseMock.status.mock.calls[0][0]).toBe(401);

    const sendMock = responseMock.status.mock.results[0].value.send;

    expect(sendMock.mock.calls.length).toBe(1);
    expect(sendMock.mock.calls[0][0]).toBe('User is unauthorized');
  });

  it('User token is invalid', () => {
    const requestMock = {
      get: jest.fn(() => 'fe3dfd3fdf3f4vce3fv4gebvfevd3v3r'),
    };

    authorize(requestMock, responseMock, nextMock);

    expect(responseMock.status.mock.calls.length).toBe(1);
    expect(responseMock.status.mock.calls[0][0]).toBe(401);

    const sendMock = responseMock.status.mock.results[0].value.send;

    expect(sendMock.mock.calls.length).toBe(1);
    expect(sendMock.mock.calls[0][0]).toBe('jwt malformed');
  });

  it('User token valid', async () => {
    const requestMock = {
      get: jest.fn(
        () =>
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDI0MmJmZDk4ZmM3ZGNlYjcyZjdkZmQiLCJpYXQiOjE2MTQyNzcwMjN9.ge3PRRAp2vdrLhuxvDIZT_FxA9t7Nnk9u2YStrmzM9Q'
      ),
    };

    await authorize(requestMock, responseMock, nextMock);

    expect(nextMock.mock.calls.length).toBe(1);
  });
});
