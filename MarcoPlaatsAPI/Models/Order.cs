using System;
using System.Collections.Generic;

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