using MongoDB.Bson;

namespace MarcoPlaatsAPI
{
    class Address
    {
        public ObjectId _id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Zipcode { get; set; }
        public string Number { get; set; }
        public bool DeliveryAddress { get; set; }
    }
}