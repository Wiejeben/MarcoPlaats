using System.Collections.Generic;

namespace MarcoPlaatsAPI
{
    class Product
    {
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public Dictionary<string, string> Properties { get; set; }
        public List<Image> Images { get; set; }
        public DateTime PublishDate { get; set; }
        public bool Deleted { get; set; }
    }
}