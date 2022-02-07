import { useState } from 'react';
import styled from 'styled-components';
import { STORE_INVENTORY } from '../inventory';
import Receipt from './Receipt';
import StoreItem from './StoreItem';

const CheckoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const StoreItems = styled.div`
  display: flex;
  border: 1px solid #333333;
  background: #f8f8f8;
  padding: 1rem;
`;

function getPrice(item, quantity) {
  const { unitPriceCents, saleQuantity, salePriceCents } = item;
  if (saleQuantity) {
    return Math.floor(quantity / saleQuantity) * salePriceCents + (quantity % saleQuantity) * unitPriceCents;
  }
  return quantity * unitPriceCents;
}

function getSavings(item, quantity) {
  const { unitPriceCents } = item;
  return quantity * unitPriceCents - getPrice(item, quantity);
}

export default function Checkout() {
  const [cart, setCart] = useState({});

  function getCartItem({ id: itemId, quantity }) {
    const item = STORE_INVENTORY.find(({ id }) => id === itemId);
    if (item) {
      return {
        item,
        quantity,
        price: getPrice(item, quantity),
        savings: getSavings(item, quantity),
      };
    }
    return null;
  }

  function updateCart({ id, quantity }) {
    const cartItem = getCartItem({ id, quantity });
    if (cartItem) {
      setCart((prev) => ({ ...prev, [id]: cartItem }));
    }
  }

  return (
    <CheckoutContainer>
      <StoreItems>
        {STORE_INVENTORY.map((storeItem) => (
          <StoreItem
            key={storeItem.id}
            updateCart={(quantity) => updateCart({ id: storeItem.id, quantity })}
            {...storeItem}
          />
        ))}
      </StoreItems>
      <Receipt cart={cart} />
    </CheckoutContainer>
  );
}
