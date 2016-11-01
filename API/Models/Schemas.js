schemas = {
    User: {
        FirstName: null,
        LastName: null,
        OAuthId: null,
        Email: null,
        Role: null,
        Addresses: {
            Street: null,
            City: null,
            Province: null,
            Zipcode: null,
            Number: null,
            DeliveryAddress: null,
        },
        Orders: [],
        ProductIds: [],
        WishlistProductIds: [],
        FavoriteProductIds: []
    },
    Product: {
        Name: null,
        Description: null,
        Price: null,
        Amount: null,
        Images: {
            Filename:null
        },
        CreatedAt: null,
        DeletedAt: null
    },
    Category: {
        Name: null,
        ProductIds: []
    },
    Order:
        {
        OrderLines: [],
        OrderDate: null,
        address: {
            Street: null,
            City: null,
            Province: null,
            Zipcode: null,
            Number: null,
            DeliveryAddress: null,
        }
    }
}

module.exports = schemas;