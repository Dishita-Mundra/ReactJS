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

    // Register a new user
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // Auto login after successful signup
                return this.login({ email, password });
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    // Login existing user
    async login({ email, password }) {

        try {
            // Create an email-password session
            return await this.client.account.createEmailSession(email, password);

        } catch (error) {
            throw error;
        }
    }

    // Get currently logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        // Return null if no active session exists
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

// Singleton instance shared across the entire application
const authService = new AuthService();

export default authService;