namespace MarcoPlaatsAPI
{
    
    class Category
    {
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; } // Unique
        public List<ObjectId> ProductIds { get; set; }
    }

}