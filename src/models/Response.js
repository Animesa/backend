import { SUCCESS_MESSAGE } from "../utils/globals.js";

class Response {
    success = true;
    message = SUCCESS_MESSAGE;
    data;
    errors;

    constructor({success = true, message = SUCCESS_MESSAGE, data, errors} = {success: true, message: SUCCESS_MESSAGE}){
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}

export default Response;