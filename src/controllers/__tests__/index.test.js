const request = require('supertest');
const app = require('../../index');

describe('Requests return valid status codes', () => {
    it('returns 200 status code for requests to valid URLs', async () => {
        const url = '/jobs';

        const response = await request(app).get(url).expect(200);

        expect(response.status).toBe(200);
    })

    it('returns 404 status code for requests to invalid URLs', async () => {
        const url = '/invalidURL';

        const response = await request(app).get(url).expect(404);

        expect(response.status).toBe(404);
    })
})

describe('Requests to valid URLs', () => {
    it('returns a body that contains the HTML generated from the relevant index.md', async () => {
        const url = '/about-page';
        const response = await request(app).get(url).expect(200);
        console.log(response);

        expect(response.text).toBe(mockReponseData);
    })
})

const mockReponseData = '<!DOCTYPE html>\r\n' +
'<html>\r\n' +
'  <head>\r\n' +
'    <title>Welcome to Acme</title>\r\n' +
'    <link rel="stylesheet" href="styles.css" >\r\n' +
'  </head>\r\n' +
'  <h1 style="color: lightcoral">About page</h1>\r\n' +
'  <h2 style="color: lightcoral;"></h2>\r\n' +
'  <body \n' +
'    style="\r\n' +
'      background-color: bisque;\r\n' +
'      color: lightcoral;\r\n' +
'      font-size: 30px;\r\n' +
'      inline-size: 450px;\r\n' +
'      overflow-wrap: break-word;\r\n' +
'      display: table;\r\n' +
'      margin: auto;\r\n' +
'    "\r\n' +
'    id="content"\r\n' +
'  >\r\n' +
'      This is the About page\r\n' +
'\r\n' +
'Acme Co. is a reputable maker of widgets and is an international brand.\r\n' +
'\r\n' +
'Thank you for your interest in our services. Please contact us at enquiries@acme.com.\r\n' +
'\r\n' +
'  </body>\r\n' +
'</html>\r\n';
