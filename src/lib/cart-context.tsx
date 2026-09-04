"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Money, Product, ProductVariant } from "./types";
import {
  createCart,
  addLinesToCart,
  updateCartLines,
  removeCartLines,
  getCart,
  type ShopifyCart,
} from "./shopify";

function toCartLines(cart: ShopifyCart, fallbackImage: string): CartLine[] {
  return cart.lines.map((line) => ({
    lineId: line.id,
    productHandle: line.merchandise.product.handle,
    productTitle: line.merchandise.product.title,
    variantId: line.merchandise.id,
    variantTitle: line.merchandise.title,
    price: line.merchandise.price,
    quantity: line.quantity,
    image: line.merchandise.image?.url ?? fallbackImage,
  }));
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: Money;
  isOpen: boolean;
  checkoutUrl?: string;
  shopifyCartId?: string;
  open: () => void;
  close: () => void;
  add: (product: Product, variant: ProductVariant, quantity?: number) => void;
  remove: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  goToCheckout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "caelia_cart_v1";

function toMoney(amount: number, currencyCode: Money["currencyCode"]): Money {
  return {
    amount: amount.toFixed(2),
    currencyCode,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shopifyCartId, setShopifyCartId] = useState<string | undefined>();
  const [checkoutUrl, setCheckoutUrl] = useState<string | undefined>();
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Shopify cart on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = window.localStorage.getItem("caelia_shopify_cart_id");
        let cartId = raw ? JSON.parse(raw) : null;

        // Verify stored cart ID exists in Shopify and hydrate lines from it
        let existing: ShopifyCart | null = null;
        if (cartId) {
          existing = await getCart(cartId);
          if (!existing) cartId = null;
        }

        // Create new cart if needed
        if (!cartId) {
          const newCart = await createCart();
          cartId = newCart.id;
          setCheckoutUrl(newCart.checkoutUrl);
          window.localStorage.setItem(
            "caelia_shopify_cart_id",
            JSON.stringify(cartId),
          );
        } else if (existing) {
          setCheckoutUrl(existing.checkoutUrl);
          setLines(toCartLines(existing, ""));
        }

        setShopifyCartId(cartId);
      } catch (err) {
        console.error("[v0] Failed to initialize Shopify cart:", err);
      }
      setHydrated(true);
    })();
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback(
    async (product: Product, variant: ProductVariant, quantity = 1) => {
      if (!shopifyCartId || !hydrated) return;
      
      setIsLoading(true);
      try {
        const updated = await addLinesToCart(shopifyCartId, [
          { merchandiseId: variant.id, quantity },
        ]);
        setCheckoutUrl(updated.checkoutUrl);
        setLines(toCartLines(updated, product.images[0]?.src ?? ""));
      } catch (err) {
        console.error("[v0] Failed to add to cart:", err);
      } finally {
        setIsLoading(false);
        setIsOpen(true);
      }
    },
    [shopifyCartId, hydrated],
  );

  const remove = useCallback(
    async (lineId: string) => {
      if (!shopifyCartId) return;
      // Optimistic update
      setLines((current) => current.filter((l) => l.lineId !== lineId));
      try {
        const updated = await removeCartLines(shopifyCartId, [lineId]);
        setCheckoutUrl(updated.checkoutUrl);
        setLines(toCartLines(updated, ""));
      } catch (err) {
        console.error("[v0] Failed to remove cart line:", err);
      }
    },
    [shopifyCartId],
  );

  const setQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!shopifyCartId) return;
      if (quantity <= 0) {
        await remove(lineId);
        return;
      }
      // Optimistic update
      setLines((current) =>
        current.map((l) => (l.lineId === lineId ? { ...l, quantity } : l)),
      );
      try {
        const updated = await updateCartLines(shopifyCartId, [{ id: lineId, quantity }]);
        setCheckoutUrl(updated.checkoutUrl);
        setLines(toCartLines(updated, ""));
      } catch (err) {
        console.error("[v0] Failed to update cart line quantity:", err);
      }
    },
    [shopifyCartId, remove],
  );

  const clear = useCallback(async () => {
    if (!shopifyCartId || lines.length === 0) {
      setLines([]);
      return;
    }
    try {
      const updated = await removeCartLines(shopifyCartId, lines.map((l) => l.lineId));
      setCheckoutUrl(updated.checkoutUrl);
      setLines(toCartLines(updated, ""));
    } catch (err) {
      console.error("[v0] Failed to clear cart:", err);
    }
  }, [shopifyCartId, lines]);

  const goToCheckout = useCallback(() => {
    if (!checkoutUrl) {
      console.warn("[v0] No checkout URL available");
      return;
    }
    // Handle iframe context (v0 preview vs deployed)
    if (window.self !== window.top) {
      window.open(checkoutUrl, "_blank");
    } else {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(() => {
    const amount = lines.reduce(
      (sum, l) => sum + Number(l.price.amount) * l.quantity,
      0,
    );
    const currencyCode = lines[0]?.price.currencyCode ?? "EUR";
    return toMoney(amount, currencyCode);
  }, [lines]);

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    isOpen,
    checkoutUrl,
    shopifyCartId,
    open,
    close,
    add,
    remove,
    setQuantity,
    clear,
    goToCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
