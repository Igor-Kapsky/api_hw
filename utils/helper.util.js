import { assert } from 'chai';
import fs from 'fs';
import config from '../config.js';
import Printer from './printer.util.js';
import Api from '../API/API.js';
import Paths from '../constants/path.js';

export default class HelperUtil {
    createUrl(path) {
        const printer = new Printer();
        const url = `${config.baseURL}${path}`;
        printer.printInfo(`Url ${url} is created`);
        return url;
    }

    async getAllPosts() {
        const testAPI = new Api();
        return await testAPI.getRequest(this.createUrl(Paths.posts));
    }

    async getPostById(id) {
        const testAPI = new Api();
        return await testAPI.getRequest(this.createUrl(Paths.post(id)));
    }

    async createNewPost(body) {
        const testAPI = new Api();
        return await testAPI.postRequest(this.createUrl(Paths.posts), body);
    }

    async getAllUsers() {
        const testAPI = new Api();
        return await testAPI.getRequest(this.createUrl(Paths.users));
    }

    async getUserById(id) {
        const testAPI = new Api();
        return await testAPI.getRequest(this.createUrl(Paths.user(id)));
    }

    checkBodyIsJSON(body) {
        const printer = new Printer();
        printer.printInfo('Check if body has valid JSON format');
        let bodyIsJson;
        if (body.data.length) {
            for (let i = 0; i < body.data.length; i++) {
                bodyIsJson = this.isValidJson(body.data[i]);
                if (!bodyIsJson) {
                    break;
                }
            }
        } else {
            bodyIsJson = this.isValidJson(body.data);
        }
        return bodyIsJson;
    }

    isValidJson(obj) {
        const printer = new Printer();
        try {
            obj = JSON.stringify(obj);
            if (typeof obj != 'string') return false;
            JSON.parse(obj);
            printer.printInfo(`${obj} is valid JSON format`);
            return true;
        } catch (error) {
            printer.printError(error);
            return false;
        }
    }

    checkOrderIsASC(body) {
        const printer = new Printer();
        printer.printInfo('Verifying that order is ASC');
        for (let i = 0; i < body.data.length; i++) {
            if (body.data[i].id !== i) {
                break;
            }
        }
        return true;
    }

    getRandomText(length) {
        const printer = new Printer();
        printer.printInfo('Generating random text data');
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        printer.printInfo(`Text data is ${result}`);
        return result;
    }

    postDataIsEqual(actObj, expectedObj) {
        const printer = new Printer();
        printer.printInfo('Verifying that data is correct');
        assert.equal(actObj.data.userId, expectedObj.userId, `Actual userId is ${actObj.userId} and not equals to ${expectedObj.userId}`);
        assert.equal(actObj.data.id, expectedObj.id, `Actual id is ${actObj.id} and not equals to ${expectedObj.id}`);
        assert.isNotEmpty(actObj.data.title, 'Title is empty');
        assert.isNotEmpty(actObj.data.body, 'Body is empty');
        return true;
    }

    writeUserInfoToFile(userInfo) {
        const printer = new Printer();
        printer.printInfo('Saving user data to file');
        fs.writeFile(config.fileName, userInfo, err => {
            if (err) {
                printer.printError(err);
            }
        });
    }

    readUserInfoFromFile() {
        const printer = new Printer();
        printer.printInfo('Reading user data from file');
        return fs.readFileSync(config.fileName, 'utf8');
    }

    compareUserData(actObj, expectedObj) {
        const printer = new Printer();
        printer.printInfo('Comparing users data');
        if (typeof actObj !== 'string') {
            actObj = JSON.stringify(actObj);
        }
        if (typeof expectedObj !== 'string') {
            expectedObj = JSON.stringify(expectedObj);
        }
        if (actObj === expectedObj) {
            return true;
        }
    }
}
