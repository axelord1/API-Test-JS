var frisby = require('frisby');
var API_URL = 'https://images-api.nasa.gov/search';
var valid_search_without_authentication_response = require('../resources/responses/valid_search_without_authentication_response.json');
var valid_authentication_and_search_response = require('../resources/responses/valid_authentication_and_search_response.json');
var valid_nasaID_search_response = require('../resources/responses/valid_nasaID_search_response.json');


var invalid_search_response = require('../resources/responses/invalid_search_response.json');
var invalid_nasaID_with_authentication_response = require('../resources/responses/invalid_nasaID_with_authentication_response.json');


//var res_id = Math.floor(Math.random() * 10000) + 100

describe('The images.nasa.gov API with search/ endpoint VALID scenarios', function () {

    it('should perform a GET request with valid text search parameter without authentication and receive a valid response', function () {
        return frisby
            .get(API_URL + '?q=comet')
            .expect('status', 200)
            .expect('header', 'content-type', 'application/json; charset=UTF-8')
            .expect('json', valid_search_without_authentication_response);
    });

    it('should perform a GET request with valid authentication and text search parameter and receive a valid response', function () {
        return frisby
            .setup({
            request: {
                headers: {
                    'api_key': 'DEMO_KEY'
                }
            }
            })
            .get(API_URL + '?q=comet')
            .expect('status', 200)
            .expect('header', 'content-type', 'application/json; charset=UTF-8')
            .expect('json', valid_authentication_and_search_response);
    });

    it('should perform a GET request with valid authentication and nasaID search parameter and receive a valid response', function () {
        return frisby
            .setup({
            request: {
                headers: {
                    'api_key': 'DEMO_KEY'
                }
            }
            })
            .get(API_URL + '?nasa_id=PIA17666')
            .expect('status', 200)
            .expect('header', 'content-type', 'application/json; charset=UTF-8')
            .expect('json', valid_nasaID_search_response);
    });

    

    

});

describe('The images.nasa.gov API with search/ endpoint INVALID scenarios', function () {

    it('should perform a GET request without authentication and search parameters and receive an invalid response', function () {
        return frisby
            .setup({
            request: {
                headers: {
                    'api_key': 'BOGUS_KEY'
                }
            }
            })
            .get(API_URL + '?q=')
            .expect('status', 400)
            .expect('header', 'content-type', 'application/json; charset=UTF-8')
            .expect('json', invalid_search_response);
    });

    //Unexpected issue: The response expected expected obtained through postman is different what is obtaining through frisby
    /* it('should perform a GET request with invalid nasaID with authentication and receive an invalid response', function () {
        return frisby
            .setup({
            request: {
                headers: {
                    'api_key': 'DEMO_KEY'
                }
            }
            })
            .get(API_URL + '?nasa_id=000000')
            .expect('status', 200)
            .expect('header', 'content-type', 'application/json; charset=UTF-8')
            .expect('json', invalid_nasaID_with_authentication_response);
    }); */

    

});
