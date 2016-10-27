namespace MarcoPlaatsAPI
{
    using Nancy.Extensions;

    public class ProductController : RestfulController
    {
        
        public ProductController() : base("products")
        {

        }

        public override string Index()
        {
            return "index";
        }

        public override string Create()
        {
            return "create: " + this.Request.Body.AsString();
        }

        public override string Show(string id)
        {
            return id;
        }

        public override string Update(string id)
        {
            return "update: " + this.Request.Body.AsString();
        }

        public override string Delete(string id)
        {
            return "delete";
        }
    }
}
