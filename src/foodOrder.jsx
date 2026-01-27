import { useState } from "react";

export default function OrderFood({ guestId }) {
  const foodMenu = [
    { name: "Pasta", price: 150 },
    { name: "Pizza", price: 250 },
    { name: "Burger", price: 120 },
    { name: "Sandwich", price: 80 },
    { name: "Coffee", price: 60 },
  ];

  const [formData, setFormData] = useState({
    foodName: "",
    quantity: 1,
    pricePerUnit: "",
  });

  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = {
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    };

    if (name === "foodName") {
      const selectedFood = foodMenu.find(f => f.name === value);
      updatedForm.pricePerUnit = selectedFood ? selectedFood.price : "";
    }

    const qty = Number(updatedForm.quantity) || 0;
    const price = Number(updatedForm.pricePerUnit) || 0;
    setTotal(qty * price);

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guestId) {
      alert("Guest ID missing");
      return;
    }

    const payload = {
      foodName: formData.foodName,
      quantity: Number(formData.quantity),
      pricePerUnit: Number(formData.pricePerUnit),
      guestId,
    };

    try {
      const res = await fetch("http://localhost:5000/api/food-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Order failed");
      } else {
        alert("Order placed successfully");

        // reset form
        setFormData({
          foodName: "",
          quantity: 1,
          pricePerUnit: "",
        });
        setTotal(0);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="foodName"
        required
        value={formData.foodName}
        onChange={handleChange}
      >
        <option value="">Select Food</option>
        {foodMenu.map(food => (
          <option key={food.name} value={food.name}>
            {food.name} (₹{food.price})
          </option>
        ))}
      </select>

      <input
        type="number"
        name="quantity"
        min="1"
        required
        value={formData.quantity}
        onChange={handleChange}
      />

      <input
        type="text"
        value={`Price per unit: ₹${formData.pricePerUnit || 0}`}
        disabled
      />

      <input type="text" value={`Total: ₹${total}`} disabled />

      <button type="submit">Place Order</button>
    </form>
  );
}
