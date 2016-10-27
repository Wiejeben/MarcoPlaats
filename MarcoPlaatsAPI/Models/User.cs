using System.Collections.Generic;

namespace MarcoPlaatsAPI
{
    class User
    {
        public ObjectId _id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; } // Unique
        public string Password { get; set; }
        public Rank Rank { get; set; }

        public List<Address> Addresses { get; set; }
        public List<Order> Orders { get; set; }

        public List<ObjectId> ProductIds { get; set; }
        public List<ObjectId> WishlistProductIds { get; set; }
        public List<ObjectId> FavoriteProductIds { get; set; }
    }
}