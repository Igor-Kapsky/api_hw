import Helper from './utils/helper.util.js';
import StatusCodes from './constants/statusCodes.js';
import { assert } from 'chai';
import TestData from './testData.json' assert { type: "json" };

describe('Level 2. REST API (GET/POST)', () => {
    const helper = new Helper();

    it('Task 1: Get all posts', async () => {
        const response = await helper.getAllPosts();

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.checkBodyIsJSON(response), 'Response is not JSON');
        assert.isTrue(helper.checkOrderIsASC(response), 'Array is not sorted correctly');
    });

    it('Task 2: Get post 99', async () => {
        const response = await helper.getPostById(TestData.idsForTests.test2);

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.postDataIsEqual(response, TestData.existingPost), 'Response data is not equal');
    });

    it('Task 3: Get post 150', async () => {
        const response = await helper.getPostById(TestData.idsForTests.test3);

        assert.strictEqual(response.status, StatusCodes.NOT_FOUND, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isEmpty(response.data, 'Response body is not empty');
    });

    it('Task 4: Send a POST request', async () => {
        const body = {
            title: helper.getRandomText(TestData.lengthForTextGenerator.title),
            body: helper.getRandomText(TestData.lengthForTextGenerator.body),
            userId: TestData.newUser['userId']
        };
        const expectedBody = Object.assign(TestData.newUser, body);
        const response = await helper.createNewPost(body);

        assert.strictEqual(response.status, StatusCodes.CREATED, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.deepEqual(response.data, expectedBody, "Response data does not match");
    });

    it('Task 5: Get users', async () => {
        const response = await helper.getAllUsers();
        const userData = response.data.find((user) => user.id === 5);
        helper.writeUserInfoToFile(JSON.stringify(userData));

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.checkBodyIsJSON(response), 'Response is not JSON');
        assert.isTrue(helper.compareUserData(userData, TestData.existingUser), 'User data is not match');
    });

    it('Task 6: Get user 5 data', async () => {
        const response = await helper.getUserById(TestData.idsForTests.test6);
        const userData = helper.readUserInfoFromFile();

        assert.strictEqual(response.status, StatusCodes.OK, `Actual code is ${response.status} and not equals to ${StatusCodes.OK}`);
        assert.isTrue(helper.compareUserData(userData, response.data), 'User data is not match')
    });
})