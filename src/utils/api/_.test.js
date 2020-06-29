/* eslint-disable */
import {api} from '.';

describe('utils/api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('test basic api call with simple query', async () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 1 }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return api({
      path: '/api/v1/cities',
      query: {
        limit: 1,
      },
    })
      .then(onResponse)
      .catch(onError)
      .finally(final => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual({ id: 1 });
      });
  });

  it('test api w/ no query object', async () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 1 }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return api({ path: '/api/v1/geo' })
      .then(onResponse)
      .catch(onError)
      .finally(final => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual({ id: 1 });
      });
  });

  it('test api POST w/ body and credentials', async () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 1, newUser: true }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return api({
      body: { id: 1, newUser: true },
      credentials: true,
      method: 'POST',
      path: '/api/v1/user',
    })
      .then(onResponse)
      .catch(onError)
      .finally(final => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual({ id: 1, newUser: true });
      });
  });

  it('test api w/ !ok in resp', async () => {
    fetch.mockRejectOnce('error!');
    const onResponse = jest.fn();

    return api({
      path: '/api/v1/user',
      query: {
        limit: 1,
      },
    })
      .then(resp => {
        expect(resp).toEqual('error!');
        return onResponse();
      })
      .finally(final => {
        expect(onResponse).toHaveBeenCalled();
      });
  });

  it('test api w/ error obj in resp', async () => {
    fetch.mockRejectOnce({text: () => 'error'});

    return api({
      path: '/api/v1/user',
      query: {
        limit: 1,
      },
    })
      .then(resp => {
        expect(resp).toEqual('error');
      });
  });

  it('test api w/ redux dispatch functions', async () => {
    fetch.mockResponseOnce(JSON.stringify({id: 5}));
    const dispatch = jest.fn(fn => fn);
    const init = jest.fn(value => value);
    const failure = jest.fn(value => value);
    const success = jest.fn(value => value);
    const onResponse = jest.fn();
    const onError = jest.fn();

    return api({
      dispatch,
      init,
      failure,
      success,
      path: '/api/v1/user',
      query: {
        limit: 1,
      },
    })
      .then(onResponse)
      .catch(onError)
      .finally(final => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual({ id: 5 });
      });
  });

  it('should throw if resp not ok', async () => {
    fetch.mockResponseOnce(JSON.stringify({ok: false}));

    return api({
      path: '/api/v1/user',
      query: {
        limit: 1,
      },
    })
      .then(resp => {
        expect(resp).toEqual({ok: false});
      });
  });
});
