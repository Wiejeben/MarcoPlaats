schemas = {
    UserPersonal:{
        FirstName: null,
        LastName: null,
        OAuthId: null,
        Email: null,
        Role: null,
        PhoneNumber: null,
        MainAddress: {
            Address: null,
            City: null,
            Zipcode: null,
        },
        DeliveryAddress: {
            Address: null,
            City: null,
            Zipcode: null,
        }
    },
    User: {
        FirstName: null,
        LastName: null,
        OAuthId: null,
        Email: null,
        Role: null,
        PhoneNumber: null,
        MainAddress: {
            Address: null,
            City: null,
            Zipcode: null,
        },
        DeliveryAddress: {
            Address: null,
            City: null,
            Zipcode: null,
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
        Images: [],
        // {filename}
        CreatedAt: null,
        DeletedAt: null,
        DeliveryMethod: null
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
            Address: null,
            City: null,
            Zipcode: null,
            DeliveryAddress: null,
        }
    },
    OrderLines:{
        ProductId: null,
        Amount: null
    }
}

module.exports = schemas;