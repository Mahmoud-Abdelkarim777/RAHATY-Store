import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SearchOverlay({ onClose }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchValue.trim()) {
      setProducts([]);
      return;
    }
    console.log("Search Value:", searchValue);
    setLoading(true);

    axios
      .get(`https://dummyjson.com/products/search?q=${searchValue}&limit=6`)
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchValue]);
  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="bg-white min-h-screen">
        {/* Search Header */}
        <div className="border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="flex-1 relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                <input
                  type="text"
                  placeholder="Search products..."
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full bg-slate-100 rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-slate-100 transition"
              >
                <i className="fa-solid fa-xmark text-xl text-slate-600"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Search Content */}
        <div className="container mx-auto px-4 ">

          {/* Products */}
          <section className="mt-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Products</h2>

              {!loading && searchValue && (
                <span className="text-sm text-slate-500">
                  {products.length} results
                </span>
              )}
            </div>

            {loading ? (
              <p className="text-slate-500">Searching...</p>
            ) : products.length === 0 ? (
              <p className="text-slate-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      onClose();
                    }}
                    className="text-left border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition bg-white"
                  >
                    <div className="h-32 bg-slate-100">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">
                        {product.title}
                      </h3>

                      <p className="text-sm font-bold text-red-500 mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
