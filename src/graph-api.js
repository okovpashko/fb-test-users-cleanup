'use strict'

const request = require('request-promise-native');

const API_ROOT = 'https://graph.facebook.com/v4.0';

module.exports = function({appId, appToken}) {
    return {
        fetchUsers({limit = 10} = {}) {
            const requestOptions = {
                qs: {
                    access_token: appToken,
                },
                json: true,
            };
    
            return request.get(`${API_ROOT}/${appId}/accounts/test-users?limit=${limit}`, requestOptions);
        },
    
        deleteUser(uid) {
            const requestOptions = {
                qs: {
                    uid,
                    access_token: appToken,
                }
            };
    
            return request.delete(`${API_ROOT}/${uid}`, requestOptions);
        },
    }
}