import axios from 'axios';
import Printer from '../utils/printer.util.js';
import Paths from '../constants/path.js';
import Helper from '../utils/helper.util.js';

export default class TestAPI {
    constructor() {
        this.helper = new Helper(this);
    }

    async getRequest(path) {
        try {
            Printer.printInfo(`Send GET request to ${path}`);
            return await axios.get(path);
        } catch (e) {
            Printer.printError(`Error ${e.response.status} is occurred`);
            return e.response;
        }
    }

    async postRequest(path, body) {
        try {
            Printer.printInfo(`Send POST request to ${path}`);
            return await axios.post(path, body);
        } catch (e) {
            Printer.printError(`Error ${e.response.status} is occurred`);
            return e.response;
        }
    }

    async getAllPosts() {
        return await this.getRequest(this.helper.createUrl(Paths.posts));
    }

    async getPostById(id) {
        return await this.getRequest(this.helper.createUrl(Paths.post(id)));
    }

    async createNewPost(body) {
        return await this.postRequest(this.helper.createUrl(Paths.posts), body);
    }

    async getAllUsers() {
        return await this.getRequest(this.helper.createUrl(Paths.users));
    }

    async getUserById(id) {
        return await this.getRequest(this.helper.createUrl(Paths.user(id)));
    }
}
