schemas = {
    User: {
        _id: null,
        FirstName: null,
        LastName: null,
        Email: null,
        Password: null,
        Role: null,
        Addresses: {
            Street: null,
            City: null,
            Province: null,
            Zipcode: null,
            Number: null,
            DeliveryAddress: null,
        },
        Orders: {
            ProductIds: [],
            OrderDate: null, 
            address: {
                Street: null,
                City: null,
                Province: null,
                Zipcode: null,
                Number: null,
                DeliveryAddress: null,
            }
        },
        ProductIds: [],
        WishlistProductIds: [],
        FavoriteProductIds: []
    },
    Product: {
        _id: null, 
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
        _id: null, 
        Name: null,
        ProductIds: []
    },
}