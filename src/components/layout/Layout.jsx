import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, pageTitle }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header pageTitle={pageTitle} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
