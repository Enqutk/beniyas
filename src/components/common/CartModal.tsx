import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const CartModal: React.FC = () => {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    openContactModal
  } = useApp();

  if (!showCartModal) return null;

  const totalETB = cartItems.reduce(
    (sum, item) => sum + item.listing.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-end animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0"
        onClick={() => setShowCartModal(false)}
      />

      {/* Slide-over Drawer / Modal Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="text-base font-extrabold text-gray-900">
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setShowCartModal(false)}
            className="p-1 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900">Your bag is empty</h3>
                <p className="text-xs text-gray-500">
                  Explore items and add them to your shopping bag.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCartModal(false);
                  setActiveView('none');
                }}
                className="px-5 py-2.5 btn-primary text-xs font-bold rounded-full shadow-md"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex gap-3 relative group"
                >
                  <img
                    src={item.listing.images[0]}
                    alt={item.listing.title}
                    className="w-16 h-20 object-cover rounded-lg bg-gray-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-gray-900 truncate leading-snug">
                          {item.listing.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 p-0.5 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                        <span className="bg-white border border-gray-200 px-1.5 py-0.2 rounded-xs font-semibold">
                          Size: {item.size}
                        </span>
                        <span className="bg-white border border-gray-200 px-1.5 py-0.2 rounded-xs font-semibold">
                          Color: {item.color}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-brand">
                        {(item.listing.price * item.quantity).toLocaleString()} ETB
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-black text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right">
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-600 font-semibold"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{totalETB.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Local Express Shipping</span>
                <span className="font-bold text-emerald-600">FREE (Addis)</span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 border-t border-gray-100 pt-2">
                <span>Total</span>
                <span className="text-brand">{totalETB.toLocaleString()} ETB</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-center gap-2 text-[11px] text-emerald-800">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Doorstep delivery & quality check before payment</span>
            </div>

            <button
              onClick={() => {
                setShowCartModal(false);
                if (cartItems.length > 0) {
                  const { listing } = cartItems[0];
                  openContactModal(listing.sellerName, listing.sellerPhone, listing.sellerAvatar);
                }
              }}
              className="w-full py-3.5 btn-primary font-black text-xs rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <span>Contact Seller to Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
