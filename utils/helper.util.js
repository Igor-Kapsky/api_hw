import { assert } from 'chai';
import fs from 'fs';
import config from '../config.js';

export default class HelperUtil {
    createUrl(path) {
        return `${config.baseURL}${path}`;
    }

    checkBodyIsJSON(body) {
        if (body.data.length) {
            for (let i = 0; i < body.data.length; i++) {
                return this.isValidJson(body.data[i]);
            }
        } else {
            return this.isValidJson(body.data);
        }
    }

    isValidJson(obj) {
        try {
            obj = JSON.stringify(obj);
            if (typeof obj != 'string') return false;
            JSON.parse(obj);
            return true;
        } catch (error) {
            return false;
        }
    }

    checkOrderIsASC(body) {
        for (let i = 0; i < body.data.length; i++) {
            if (body.data[i].id !== i) {
                break;
            }
        }
        return true;
    }

    getRandomText(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    postDataIsEqual(actObj, expectedObj) {
        assert.equal(actObj.data.userId, expectedObj.userId, `Actual userId is ${actObj.userId} and not equals to ${expectedObj.userId}`);
        assert.equal(actObj.data.id, expectedObj.id, `Actual id is ${actObj.id} and not equals to ${expectedObj.id}`);
        assert.isNotEmpty(actObj.data.title, 'Title is empty');
        assert.isNotEmpty(actObj.data.body, 'Body is empty');
        return true;
    }

    writeUserInfoToFile(userInfo) {
        fs.writeFile(config.fileName, userInfo, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    readUserInfoFromFile() {
        return fs.readFileSync(config.fileName, 'utf8');
    }

    compareUserData(actObj, expectedObj) {
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
