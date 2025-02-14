'use client';

import { useCart } from "@/app/context/CartContext";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={() => window.location.href = '/cart'}
        className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 relative"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
}