using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;

namespace TstStreamAuctioneer
{
    public class BundleConfig
    {
        //Testing..
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //General scripts
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

            //AngularJS Core
            bundles.Add(new ScriptBundle("~/SPA")
                .NonOrdering() //fix order
                .Include("~/SPA/app.js") //specific first
                .IncludeDirectory("~/SPA", "*.js", false));

            //AngularJS Controllers
            bundles.Add(new ScriptBundle("~/SPA/Controllers")
                .NonOrdering() //fix order
                .Include("~/SPA/Controllers/AuthController.js") //specific first
                .IncludeDirectory("~/SPA/Controllers", "*.js", false));

            //CSS
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/ui-bootstrap-csp.css",
                      "~/Content/DataTables/css/dataTables.bootstrap.min.css",
                      "~/Content/Site.css"));
        }
    }
    class NonOrderingBundleOrderer : IBundleOrderer
    {
        public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }


    static class BundleExtentions
    {
        public static Bundle NonOrdering(this Bundle bundle)
        {
            bundle.Orderer = new NonOrderingBundleOrderer();
            return bundle;
        }
    }
}
