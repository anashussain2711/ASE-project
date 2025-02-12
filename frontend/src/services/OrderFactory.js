// services/OrderFactory.js
class OrderFactory {
    static createOrder(item) {
        return {
            menuItem: item.name,
            price: item.price,
            status: "Being Cooked",
        };
    }
}

export default OrderFactory;
// This creates orders in a structured way. The createOrder method takes a menu item and returns an order object with the required properties.
// Factory Pattern