import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";

// Blueprint for creating an authentication service
export class AuthService {

    // Creates an Appwrite client instance
    client = new Client();

    // Stores the Account service instance
    account;

    constructor() {
        this.client

            // Configure the Appwrite server URL
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // Create the Account service using the configured client
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {

        try {
            return await this.client.account.createEmailSession(email, password);

        } catch (error) {
            throw error;
        }
    }
}

// Singleton instance shared across the entire application
const authService = new AuthService();

export default authService;