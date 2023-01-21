import axios from 'axios';
import Printer from '../utils/printer.util.js';

export default class testAPI {

    async getRequest(path) {
        const printer = new Printer();
        try {
            printer.printInfo(`Send GET request to ${path}`);
            return await axios.get(path);
        } catch (e) {
            printer.printError(`Error ${e.response.status} is occurred`);
            return e.response;
        }
    }

    async postRequest(path, body) {
        const printer = new Printer();
        try {
            printer.printInfo(`Send POST request to ${path}`);
            return await axios.post(path, body);
        } catch (e) {
            printer.printError(`Error ${e.response.status} is occurred`);
            return e.response;
        }
    }
}
