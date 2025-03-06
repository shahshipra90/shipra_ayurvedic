// pages/orders/edit/[id].tsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../features/orderSlice";
import { RootState } from "../../store";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const EditOrderPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  
  // Find the order to edit
  const order = orders.find((order) => order.id === id);

  // Initialize state
  const [consumerName, setConsumerName] = useState(order?.consumerName || "");
  const [products, setProducts] = useState(order?.products || []);

  // Handle changes to the product information
  const handleChangeProduct = (index: number, field: string, value: any) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  // Handle saving the updated order
  const handleSave = () => {
    if (!order) return;
    const updatedOrder = { ...order, consumerName, products };
    dispatch(updateOrder(updatedOrder));  // Update order in Redux
    router.push("/orders");  // Redirect to orders page
  };

  // Add a new product to the products list
  const handleAddProduct = () => {
    setProducts([
      ...products,
      { id: uuidv4(), name: "", quantity: 1, price: 0 },
    ]);
  };

  // Render the page when the order is found, else display loading
  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit Order</h1>
      <input
        type="text"
        value={consumerName}
        onChange={(e) => setConsumerName(e.target.value)}
        placeholder="Consumer Name"
        className="border p-2 w-full mb-2"
      />
      <h2 className="text-xl font-semibold mt-4">Products</h2>
      {products.map((product, index) => (
        <div key={index} className="border p-2 my-2">
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleChangeProduct(index, "name", e.target.value)}
            className="border p-1 mr-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) => handleChangeProduct(index, "quantity", Number(e.target.value))}
            className="border p-1 mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => handleChangeProduct(index, "price", Number(e.target.value))}
            className="border p-1"
          />
        </div>
      ))}
      <button className="bg-gray-500 text-white px-2 py-1 rounded my-2" onClick={handleAddProduct}>
        + Add Another Product
      </button>
      <br />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditOrderPage;
