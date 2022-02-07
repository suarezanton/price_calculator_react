import styled from 'styled-components';

const ReceiptContainer = styled.div`
  font-family: monospace;
  font-size: 16px;
  margin-top: 2rem;
`;

const TableTh = styled.th`
  width: 8rem;
  text-align: ${(props) => (props.number ? 'right' : 'left')};
`;

const TableTd = styled.td`
  text-align: ${(props) => (props.number ? 'right' : 'left')};
`;

const Summary = styled.div`
  margin-top: 1rem;
`;

function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function Receipt({ cart }) {
  function getCartRow(entry) {
    const [key, cartItem] = entry;
    const {
      item: { name },
      quantity,
      price,
    } = cartItem;

    if (quantity) {
      return (
        <tr key={key}>
          <TableTd>{name}</TableTd>
          <TableTd number>{quantity}</TableTd>
          <TableTd number>{formatMoney(price)}</TableTd>
        </tr>
      );
    }
    return null;
  }

  function getPrice() {
    return Object.values(cart).reduce((acc, { price }) => (acc += price), 0);
  }

  function getSavings() {
    return Object.values(cart).reduce((acc, { savings }) => (acc += savings), 0);
  }

  return (
    <ReceiptContainer>
      <table>
        <thead>
          <tr>
            <TableTh>Item</TableTh>
            <TableTh number>Quantity</TableTh>
            <TableTh number>Price</TableTh>
          </tr>
        </thead>
        <tbody>{Object.entries(cart).map(getCartRow)}</tbody>
      </table>
      <Summary>
        <div>Total price: {formatMoney(getPrice())}</div>
        <div>You saved: {formatMoney(getSavings())}</div>
      </Summary>
    </ReceiptContainer>
  );
}
