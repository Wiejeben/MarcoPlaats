namespace MarcoPlaatsAPI
{
    using System;
    using Nancy;

    public abstract class RestfulController : NancyModule
    {
        public RestfulController(string prefix)
        {
            prefix = "/" + prefix + "/";

            Get(prefix, _ => this.Index());
            Get(prefix + "{id}", _ => this.Show(_.id));
            Post(prefix, _ => this.Create());
            Put(prefix + "{id}", _ => this.Update(_.id));
            Delete(prefix + "{id}", _ => this.Delete(_.id));
        }

        public abstract string Index();
        public abstract string Create();
        public abstract string Show(string id);
        public abstract string Update(string id);
        public abstract string Delete(string id);
    }
}
