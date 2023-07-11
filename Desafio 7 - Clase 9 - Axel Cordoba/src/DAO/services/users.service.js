//@ts-check
import { userModel } from "../models/user.model.js";



class UserService {
    validatePostUser(firstName, lastName, email) {
        if (!firstName || !lastName || !email) {
            console.log(
                "validation error: please complete firstName, lastname and email."
            );
            throw "Validation Error";
        }
    }
    validatePutUser(id, firstName, lastName, email) {
        if (!id || !firstName || !lastName || !email) {
            console.log(
                "validation error: please complete ID, firstName, lastname and email."
            );
            throw "Validation Error";
        }
    }
    validateId(id) {
        if (!id) {
            console.log(
                "validation error: please complete ID."
            );
            throw "Validation Error";
        }
    }

    async getAllUsers() {
        let users = await userModel.find({});
        return users;
    }

    async createUser(firstName, lastName, email) {
        this.validatePostUser(firstName, lastName, email);
        const userCreated = await userModel.create({ firstName, lastName, email });
        return userCreated;
    }
    async putUser(id, firstName, lastName, email) {
        this.validatePutUser(id, firstName, lastName, email);
        const userUptaded = await userModel.updateOne(
            { _id: id },
            { firstName, lastName, email }
        );
        return userUptaded;
    }
    async deleteUser(id) {
        this.validateId(id);
        const deleted = await userModel.deleteOne({ _id: id })
        return deleted;
    }
}

export const userService = new UserService();