export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} AutoCommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
