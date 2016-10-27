namespace MarcoPlaatsAPI
{
    using Nancy;

    public abstract class RestfulController : NancyModule
    {
        public RestfulController(string prefix)
        {
            prefix = "/" + prefix + "/";

            this.Get(prefix, _ => this.Index());
            this.Get(prefix + "{id}", _ => this.Show(_.id));
            this.Post(prefix, _ => this.Create());
            this.Put(prefix + "{id}", _ => this.Update(_.id));
            this.Delete(prefix + "{id}", _ => this.Delete(_.id));
        }

        public abstract string Index();
        public abstract string Create();
        public abstract string Show(string id);
        public abstract string Update(string id);
        public abstract string Delete(string id);
    }
}
