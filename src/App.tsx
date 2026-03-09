import React from "react";
import { GoogleAnalytics } from "@/components/shared";
import { SidebarLayout } from "@/components/shared";
import { Providers } from "@/providers";
import Page from "@/app/page";
import PymesPage from "@/app/pymes/page";
import sidebarConfig from "@/config/sidebar.config";

function App() {
  const [pathname, setPathname] = React.useState("/");

  React.useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname || "/");

    syncPathname();
    window.addEventListener("popstate", syncPathname);

    return () => {
      window.removeEventListener("popstate", syncPathname);
    };
  }, []);

  const CurrentPage = pathname === "/pymes" ? PymesPage : Page;

  return (
    <div className="antialiased">
      <Providers>
        {sidebarConfig.enabled ? (
          <SidebarLayout
            expandOnHover={sidebarConfig.expandOnHover}
            defaultExpanded={sidebarConfig.defaultExpanded}
          >
            <CurrentPage />
          </SidebarLayout>
        ) : (
          <CurrentPage />
        )}
        <GoogleAnalytics />
      </Providers>
    </div>
  );
}

export default App;
