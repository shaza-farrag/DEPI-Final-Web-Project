import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";


const labelMap = {
  ecommerce: "E-Commerce",
  products: "Products",
  add: "Add Product",
  edit: "Edit Product",
  orders: "Orders",
  customers: "Customers",
  settings: "Settings",
};

function formatLabel(segment) {
  if (labelMap[segment]) return labelMap[segment];
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumb() {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label: formatLabel(segment), href };
  });

  return (
    <nav aria-label="Breadcrumb" className=" px-4 py-3">
      <ol className="flex items-center gap-2 text-[18px]">
        <li className="flex items-center">
          <Link
            to="/"
            className="text-gray-500 hover:text-slate-200 transition-colors"
            aria-label="Home"
          >
            <Home size={16} />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-600" />
              {isLast ? (
                <span className="text-gray-400 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}