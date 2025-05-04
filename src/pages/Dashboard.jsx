import { useEffect, useState } from "react";

function Dashboard() {
  useEffect(() => {
    fetchProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [newProduct, setNewProduct] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/getProducts",
        {
          headers: { Authorization: token },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        setMessage(data.message || "Failed to fetch products.");
      }
    } catch (error) {
      setMessage("Error loading products.");
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/addProducts",
        {
          headers: { Authorization: token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ name: newProduct }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProducts([...products, data.product]);
        setNewProduct("");
        fetchProducts();
      } else {
        setMessage(data.message || "Failed to add product.");
        setNewProduct("");
      }
    } catch {
      setMessage("Failed to add products.");
    }
  };

  const deleteAllProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/deleteALLProducts",
        {
          headers: { Authorization: token },
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProducts([]);
        setMessage("All products deleted successfully.");
      } else {
        setMessage(data.message || "Failed to delete products.");
      }
    } catch {
      setMessage("Failed to delete all products.");
    }
  };

  const deleteProduct = async (name) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/deleteProduct",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ name }),
        }
      );
      const data = response.json();
      if (response.ok) {
        setProducts(products.filter((product) => product.name !== name));
        setMessage(data.message || "Product deleted successfully.");
      } else {
        setMessage(data.message || "Failed to delete product.");
      }
    } catch {
      setMessage("Failed to delete products.");
    }
  };

  const editProduct = async (name) => {
    try {
      const response = await fetch({
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        method: "PUT",
        body: JSON.stringify({ oldName: name, newName: editedName }),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.id === editingProductId
              ? { ...product, name: editedName }
              : product
          )
        );
        setEditedName("");
        setEditingProductId(null);
        setMessage(data.message || "Product edited successfully.");
      } else {
        setMessage(data.message || "Failed to edit product.");
      }
    } catch {
      setMessage("Failed to edit products.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="pt-8 pb-4 mb-4 text-center text-5xl font-semibold text-slate-700">
        Welcome to your dashboard!
      </div>
      {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
      <div className="flex mb-4 items-center text-center">
        <input
          type="text"
          placeholder="Enter product name"
          className="flex-grow border border-gray-300 px-2 py-1 rounded mr-2"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={addProduct}
        >
          Add Product
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded ml-2"
          onClick={deleteAllProducts}
        >
          Delete All Products
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-t border-gray-200">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{product.name}</td>
                <td className="p-3 text-center">
                  <button
                    className="text-yellow-600 rounded px-8 py-2"
                    onClick={editProduct(product.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600  rounded px-10 py-2 ml-2"
                    onClick={() => deleteProduct(product.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
