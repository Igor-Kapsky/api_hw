import axios from 'axios';

export default class testAPI {

    async getRequest(path) {
        try {
            return await axios.get(path);
        } catch (e) {
            return e.response;
        }
    }

    async postRequest(path, body) {
        try {
            return await axios.post(path, body);
        } catch (e) {
            return e.response;
        }
    }
}
