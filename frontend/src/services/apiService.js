// services/apiService.js
import axios from "axios";

class ApiService {
    constructor() {
        if (!ApiService.instance) {
            this.api = axios.create({ baseURL: "http://localhost:5000/orders" });
            ApiService.instance = this;
        }
        return ApiService.instance;
    }

    async getOrders() {
        const res = await this.api.get("/");
        return res.data;
    }

    async addOrder(order) {
        await this.api.post("/", order);
    }

    async updateOrder(id, status) {
        await this.api.put(`/${id}`, { status });
    }

    async deleteOrder(id) {
        await this.api.delete(`/${id}`);
    }
}

const apiService = new ApiService();
export default apiService;

// This ensures a single instance of Axios handles all API requests. The class methods are used to interact with the backend API.
// Singleton Pattern