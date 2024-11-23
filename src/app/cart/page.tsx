"use client";
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import CartItem from "@/components/ui/CartItem";
import Summary from "@/components/ui/Summary";
import { SessionProvider, useSession } from "next-auth/react";

interface CartItemData {
  id: string; // Changed to string for consistency with MongoDB ObjectId
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
}

function App() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart items from API only if the user is authenticated
  useEffect(() => {
    const fetchCartItems = async () => {
      if (status === "loading") return; // Wait until session is loaded
      if (!session?.user?.id) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/user/${session.user.id}/cart`);
        if (!res.ok) throw new Error("Failed to fetch cart items");
        const data = await res.json();

        // Transform the response data and add a 'selected' property for each item
        const items: CartItemData[] = data.items.map((item: any) => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selected: false, // Default to not selected
        }));
        setCartItems(items);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [session, status]);

  // Toggle item selection
  const handleToggleSelect = (id: string, selected: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected } : item
      )
    );
  };

  // Delete an item from the cart
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete cart item");
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete item from cart.");
    }
  };

  // Update item quantity
  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) throw new Error("Failed to update item quantity");
      const updatedItem = await res.json();
      
      // Ensure the updated item contains all necessary fields
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update item quantity.");
    }
  };
  

  // Filter selected items for the Summary component
  const selectedItems = cartItems.filter((item) => item.selected);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="main-content p-8 flex-1">
          <div className="cart-list-container">
            <h2 className="cart-title">Your Cart</h2>
            {loading && <p>Loading cart...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <div className="cart-container">
                <div className="cart-items">
                  <div className="cart-header">
                    <span>Product Name</span>
                    <span>Price per pcs</span>
                    <span>Qty</span>
                    <span>Total Price</span>
                  </div>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(item.id, newQuantity)
                      }
                      onToggleSelect={(selected: boolean) =>
                        handleToggleSelect(item.id, selected)
                      }
                      onDelete={() => handleDelete(item.id)}
                    />
                  ))}
                </div>
                <Summary cartItems={selectedItems} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


export default function Page(){
  return (
  <SessionProvider>
      <App></App>
  </SessionProvider>
  )
};
