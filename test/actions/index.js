import sinon from 'sinon';

import * as actions from 'src/client/actions';

describe('actions', () => {
  describe('.userDataRequest', () => {
    it('should return the correct object', () => {
      expect(actions.userDataRequest()).to.eql({ type: 'USER_DATA_REQUEST' });
    });
  });

  describe('.userDataReceive', () => {
    it('should return the correct object', () => {
      const testData = { key: 'value' };

      expect(actions.userDataReceive()).to.eql({
        type: 'USER_DATA_RECEIVE',
        data: undefined
      });

      expect(actions.userDataReceive(testData)).to.eql({
        type: 'USER_DATA_RECEIVE',
        data: testData
      });
    });
  });

  describe('.userDataError', () => {
    it('should return the correct object', () => {
      const testData = { key: 'value' };

      expect(actions.userDataError()).to.eql({
        type: 'USER_DATA_ERROR',
        error: undefined
      });

      expect(actions.userDataError(testData)).to.eql({
        type: 'USER_DATA_ERROR',
        error: testData
      });
    });
  });

  describe('.userDataLoad', () => {
    let dispatch, msg, response;

    class Response {
      constructor(msg) {
        this.msg = msg;
      }

      json() {
        return JSON.parse(this.msg)
      }
    }

    beforeEach(() => {
      msg = msg || '{"key": "value"}';
      dispatch = sinon.stub();

      // TODO - do this in the test helper? replace with nock?
      sinon.stub(global, 'fetch').returns(Promise.resolve(new Response(msg)));
    });

    afterEach(() => {
      global.fetch.restore();
    });

    it('should return a function', () => {
      expect(actions.userDataLoad()).to.be.a('function');
    });

    it('should dispatch the request action', () => {
      actions.userDataLoad()(dispatch);

      expect(dispatch).to.be.calledOnce
        .calledWithExactly(actions.userDataRequest());
    });

    it('should fetch user details', () => {
      actions.userDataLoad()(dispatch);

      expect(fetch).to.be.calledOnce
        .calledWithExactly('/api/user', { credentials: 'include' });
    });

    it('should dispatch the receive action on success', (done) => {
      actions.userDataLoad()(dispatch)
        .then(() => {
          expect(dispatch).to.be.calledTwice
            .calledWithExactly(actions.userDataReceive(JSON.parse(msg)));

          done();
        })
        .catch(done);

      expect(dispatch).to.be.calledOnce;
    });

    it('should dispatch the error action on error', (done) => {
      fetch.returns(Promise.reject('err!'));

      actions.userDataLoad()(dispatch)
        .then(() => {
          expect(dispatch.secondCall)
            .calledWithExactly(actions.userDataError('err!'));

          done();
        });
    });
  });
});
