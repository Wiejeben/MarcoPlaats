category = {
    Name: 'Computers',
    ProductIds: ['58150d65a271881c7601f9b3', '58150d9aa271881c7601f9b4', '58150da3a271881c7601f9b5']
}

User = {
    FirstName: 'Jacky',
    LastName: 'Fong',
    Email: 'Jacky@hotmail.com',
    Password: 'test123',
    Role: 'Admin',
    Addresses: {
        Street: 'Wijnhaven',
        City: 'Rotterdam',
        Province: 'Zuid-Holland',
        Zipcode: '3066AA',
        Number: 107,
        DeliveryAddress: true
    },
    Orders: {
        ProductIds: ['58150d65a271881c7601f9b3', '58150d9aa271881c7601f9b4', '58150da3a271881c7601f9b5'],
        OrderDate: 1477920664,
        address: {
            Street: 'Wijnhaven',
            City: 'Rotterdam',
            Province: 'Zuid-Holland',
            Zipcode: '3066AA',
            Number: 107,
            DeliveryAddress: true
        }
    },
    ProductIds: [],
    WishlistProductIds: [],
    FavoriteProductIds: []
}

Product = {
    Name: 'Aspire 3750G',
    Description: 'Very nice laptop',
    Price: 700,
    Amount: 1,
    Images: {
        Filename: 'Laptop.png'
    },
    CreatedAt: 1477921387,
    DeletedAt: 1477921401
}
