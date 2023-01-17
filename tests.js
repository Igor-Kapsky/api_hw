import Api from './API/API.js';
import Helper from './utils/helper.util.js';
import StatusCodes from './constants/statusCodes.js';
import Paths from './constants/path.js';
import { assert } from 'chai';
import TestData from './testData.json' assert { type: "json" };

describe('Level 2. REST API (GET/POST)', () => {
    const testAPI = new Api();
    const helper = new Helper();

    it('Task 1: Get all posts', async () => {
        const apiPath = helper.createUrl(Paths.posts);
        const response = await testAPI.getRequest(apiPath);

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.checkBodyIsJSON(response), 'Response is not JSON');
        assert.isTrue(helper.checkOrderIsASC(response), 'Array is not sorted correctly');
    });

    it('Task 2: Get post 99', async () => {
        const apiPath = helper.createUrl(Paths.post(99));
        const response = await testAPI.getRequest(apiPath);

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.postDataIsEqual(response, TestData.existingPost), 'Response data is not equal');
    });

    it('Task 3: Get post 150', async () => {
        const apiPath = helper.createUrl(Paths.post(150));
        const response = await testAPI.getRequest(apiPath);

        assert.strictEqual(response.status, StatusCodes.NOT_FOUND, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isEmpty(response.data, 'Response body is not empty');
    });

    it('Task 4: Send a POST request', async () => {
        const apiPath = helper.createUrl(Paths.posts);
        const body = {
            title: helper.getRandomText(10),
            body: helper.getRandomText(10),
            userId: TestData.newUser['userId']
        };
        const expectedBody = Object.assign(TestData.newUser, body);
        const response = await testAPI.postRequest(apiPath, body);

        assert.strictEqual(response.status, StatusCodes.CREATED, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.deepEqual(response.data, expectedBody, "Response data does not match");
    });

    it('Task 5: Get users', async () => {
        const apiPath = helper.createUrl(Paths.users);
        const response = await testAPI.getRequest(apiPath);
        const userData = response.data.find((user) => user.id === 5);
        helper.writeUserInfoToFile(JSON.stringify(userData));

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.checkBodyIsJSON(response), 'Response is not JSON');
        assert.isTrue(helper.compareUserData(userData, TestData.existingUser), 'User data is not match');
    });

    it('Task 6: Get user 5 data', async () => {
        const apiPath = helper.createUrl(Paths.user(5));
        const response = await testAPI.getRequest(apiPath);
        const userData = helper.readUserInfoFromFile();

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.compareUserData(userData, response.data), 'User data is not match')
    });
})