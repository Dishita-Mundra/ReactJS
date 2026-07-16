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
        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument();
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
}

const service = new Service()
export default service;