import {connect} from "mongoose";

export async function connectMongo(){
    try {
        await connect(
            "mongodb+srv://axeelcordoba:y9X5iIgWclbMKxwS@axel-cluster.jqlgacw.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("plug to mongo!")
    } catch (error) {
        console.log(error);
        throw "can not connecto to the db";
    }
}