import { GoogleAnalytics } from "@/components/shared";
import { Providers } from "@/providers";
import Page from "@/app/page";

function App() {
  return (
    <div className="antialiased">
      <Providers>
        <Page />
        <GoogleAnalytics />
      </Providers>
    </div>
  );
}

export default App;
