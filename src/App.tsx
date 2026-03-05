import { GoogleAnalytics } from "@/components/shared";
import { SidebarLayout } from "@/components/shared";
import { Providers } from "@/providers";
import Page from "@/app/page";
import sidebarConfig from "@/config/sidebar.config";

function App() {
  return (
    <div className="antialiased">
      <Providers>
        {sidebarConfig.enabled ? (
          <SidebarLayout
            expandOnHover={sidebarConfig.expandOnHover}
            defaultExpanded={sidebarConfig.defaultExpanded}
          >
            <Page />
          </SidebarLayout>
        ) : (
          <Page />
        )}
        <GoogleAnalytics />
      </Providers>
    </div>
  );
}

export default App;
