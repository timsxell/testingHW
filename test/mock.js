class MockData {
    products = [
        {
            id: 111,
            name: 'Good 1',
            price: 999,
            description: 'Some description',
            material: 'iron',
            color: 'violet',
        },
        {
            id: 222,
            name: 'Good 2',
            price: 888,
            description: 'Some description',
            material: 'iron',
            color: 'green',
        },
        {
            id: 333,
            name: 'Good 3',
            price: 777,
            description: 'Some description',
            material: 'iron',
            color: 'yellow',
        },
    ];

    async getProducts() {
        return { data: this.products };
    }

    async getProductById(id) {
        return { data: this.products.find((product) => product.id === id) };
    }

    async checkout(form, cart) {
        return { data: { id: 1 } };
    }
}

class MockCartApi {
    cart = {};

    getState() {
        return this.cart;
    }

    setState(cart) {
        this.cart = cart;
    }
}

module.exports = {
    MockData,
    MockCartApi,
};
