import conf from '../conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client

            // Configure the Appwrite server URL
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
    }
}

const service = new Service()
export default service;