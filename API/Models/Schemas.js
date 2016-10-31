schemas = {
    User: {
        _id: null,
        FirstName: null,
        LastName: null,
        Email: null,
        Password: null,
        Rank: null,
        Addresses: {
            _id: null,
            Street: null,
            City: null,
            Province: null,
            Zipcode: null,
            NumberDeliveryAddress: null,
        },
        Orders: {
            _id: null,
            ProductIds: [],
            OrderDate: null, 
            address: {
                _id: null,
                Street: null,
                City: null,
                Province: null,
                Zipcode: null,
                NumberDeliveryAddress: null,
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
        Properties: [],
        Images: {
            _id: null,
            Filename:null
        },
        CreatedAt: null,
        DeletedAt: null
    },
    Category: {
        _id: null, 
        Name: null,
        Slug: null,
        ProductIds: []
    },
    
}