using System.Web;
using System.Web.Optimization;

namespace TstStreamAuctioneer
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/modernizr-{version}.js",
                        "~/Scripts/angular.min.js",
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/angular-ui/ui-bootstrap.min.js",
                        "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
                        "~/Scripts/DataTables/jquery.dataTables.min.js",
                        "~/Scripts/DataTables/dataTables.bootstrap.min.js"
                       ));

            //Core AngularJS files
            bundles.Add(new ScriptBundle("~/SPA").Include(
                       "~/SPA/app.js"));

            //AngularJS Controllers
            bundles.Add(new ScriptBundle("~/SPA/Controllers")
                .IncludeDirectory("~/SPA/Controllers", "*.js", false));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/ui-bootstrap-csp.css",
                      "~/Content/DataTables/css/dataTables.bootstrap.min.css",
                      "~/Content/Site.css"));
        }
    }
}
