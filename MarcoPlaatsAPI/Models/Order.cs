using System;
using System.Collections.Generic;
using MongoDB.Bson;

namespace MarcoPlaatsAPI
{
    class Order
    {
        public ObjectId _id { get; set; }
        public List<ObjectId> ProductIds { get; set; }
        public DateTime OrderDate { get; set; }
        public Address Address { get; set; }
    }
}