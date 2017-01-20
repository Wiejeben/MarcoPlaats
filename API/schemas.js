schemas = {
    UserPersonal: {
        FirstName: null,
        LastName: null,
        OAuthId: null,
        Email: null,
        Role: null,
        PhoneNumber: null,
        PublicWishlist: false,
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
        PublicWishlist: false,
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
    Order: {
        OrderLines: [],
        OrderDate: null,
        userId: null,
        Address: {
            Address: null,
            City: null,
            Zipcode: null,
        }
    },
    OrderLines: {
        ProductId: null,
        Amount: null
    },
    Image: {
        Filename: null
    }
}

module.exports = schemas;