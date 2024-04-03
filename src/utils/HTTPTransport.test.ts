import Sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import HTTPTransport from './HTTPTransport.ts';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
    instance = new HTTPTransport('/auth');
  });
  afterEach(() => {
    requests = [];
  });
  it('.get() should send get request', () => {
    instance.get('/user');
    const [request] = requests;
    expect(request.method).to.eq('GET');
  });
  it('.post() should send post request', () => {
    instance.post('/signin');
    const [request] = requests;
    expect(request.method).to.eq('POST');
  });
  it('should send body request', () => {
    const expectData = { user: 'test' };
    instance.post('/signin', expectData);
    const [request] = requests;
    expect(request.requestBody).to.eq(JSON.stringify(expectData));
  });
  it('headers should be Content-type with application/json', () => {
    const data = { user: 'test' };
    instance.post('/signin', data);
    const [request] = requests;
    expect(request.requestHeaders['Content-Type']).to.include(
      'application/json',
    );
  });
});
