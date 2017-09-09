using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TstStreamAuctioneer.Startup))]
namespace TstStreamAuctioneer
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
