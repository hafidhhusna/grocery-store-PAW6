"use client";
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import CartItem from "@/components/ui/CartItem";
import Summary from "@/components/ui/Summary";
import { SessionProvider, useSession } from "next-auth/react";

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
  isCheckout: boolean; // New property to indicate checkout status
}

function App() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart items from API only if the user is authenticated
  useEffect(() => {
    const fetchCartItems = async () => {
      console.log(session?.user);
      if (status === "loading") return; // Wait until session is loaded
      if (!session?.user?.id) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }
    
      try {
        const res = await fetch(`/api/user/${session.user.id}/cart`);
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch cart items");
        const data = await res.json();
    
        // Transform the response data and filter out checked-out items
        const items: CartItemData[] = data.items
          .map((item: any) => ({
            id: item.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            selected: false, // Default to not selected
            isCheckout: item.isCheckout || false, // Assume backend includes this flag
          }))
          .filter((item) => !(item.quantity == 0)); // Filter out items that are checked out
    
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

  const handleConfirm = async () => {
    try {
      if (!selectedItems.length) {
        alert("Please select items to checkout.");
        return;
      }

      console.log(JSON.stringify({ items: selectedItems.map(item => ({ cartItemId: item.id }))}))
  
      const res = await fetch(`/api/user/${session?.user?.id}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selectedItems.map(item => ({ cartItemId: item.id })) }),
      });
  
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to create order.");
      }
  
      const { order } = await res.json();
      alert("Order created successfully!");
      console.log("Order:", order);
  
      // Optional: Clear the cart or refresh state
      setCartItems((prevItems) => prevItems.filter(item => !item.selected));
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to complete the order. Please try again.");
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
  <span></span> {/* Kolom kosong untuk checkbox */}
  <span>Image</span>
  <span>Product Name</span>
  <span>Price per pcs</span>
  <span>Qty</span>
  <span>Total Price</span>
  <span></span> {/* Kolom kosong untuk trash */}
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
                <Summary cartItems={selectedItems} onConfirm={handleConfirm}/>
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
