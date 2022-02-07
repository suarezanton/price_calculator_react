import styled from 'styled-components';

const StoreItemContainer = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const StyledLabel = styled.span`
  margin-right: 0.5rem;
`;

const StyledInput = styled.input`
  width: 3rem;
`;

export default function StoreItem({ name, updateCart }) {
  function handleQuantityChange({ target: { value } }) {
    const parsed = parseInt(value);
    updateCart(isNaN(parsed) ? 0 : parsed);
  }

  function handleKeyDown(event) {
    const { code } = event;
    if (code === 'Minus') {
      event.preventDefault();
    }
  }

  return (
    <StoreItemContainer>
      <StyledLabel>{name}:</StyledLabel>
      <StyledInput type="number" min={0} defaultValue={0} onChange={handleQuantityChange} onKeyDown={handleKeyDown} />
    </StoreItemContainer>
  );
}
