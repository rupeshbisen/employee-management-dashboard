export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm text-gray-600">
              © {currentYear} Employee Management Dashboard. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
