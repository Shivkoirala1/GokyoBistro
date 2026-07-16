import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import BackButton from "./BackButton.jsx";

// Wrap any page with <Layout>...</Layout>. Pass showBack={false} for the
// Home page (nothing to go back to) - every other page gets it by default.
// Wrap any page with <Layout>...</Layout>. Pass showBack={false} for the
// Home page (nothing to go back to). Pass showFooter={false} on pages that
// already render <BottomNav /> - a fixed bottom tab bar and this footer
// fighting for the same screen space looks broken, so only one shows.
export default function Layout({ children, showBack = true, showFooter = true }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      {showBack && (
        <div className="max-w-5xl mx-auto w-full px-4 pt-3 flex justify-end">
          <BackButton />
        </div>
      )}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
