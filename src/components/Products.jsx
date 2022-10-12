/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const P = styled.p`
  font-size: 1.3em;
  font-weight: bold;
  margin: auto;
  width: 60%;
  padding: 2.4em 0 1em;
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 1024px;
`;

const Product = styled.li`
  margin: 1em;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
`;

const Manufacturer = styled.p`
  font-weight: bold;
  margin-top: 1em;
`;

const Name = styled.p`
  margin: .4em 0;
`;

const Price = styled.p`
  font-weight: bold;
`;

const Pages = styled.ul`
  display: flex;
  justify-content: center;
  gap: .5em;
  
  button {
    margin-right: 1em;
    border: none;
    background-color: #fff;
  }
`;

export default function Products({
  navigate, productStore, pageNumbers, products,
}) {
  const handleClickPageNumber = async (e) => {
    const { value } = e.target;
    navigate(`/products?page=${value}`);
    await productStore.fetchProducts(value);
  };

  const handleclcikLink = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container>
      <P>인기선물을 한 자리에 모았어요</P>
      <ProductBox>
        <ProductList>
          {products.length === 0 ? (
            <p>상품이 존재하지 않습니다</p>
          ) : (
            products.map((product) => (
              <Product
                type="button"
                key={product.id}
                onClick={() => handleclcikLink(product.id)}
              >
                <Image src={product.image} alt="product" />
                <Manufacturer>
                  {product.manufacturer}
                </Manufacturer>
                <Name>
                  {product.name}
                </Name>
                <Price>
                  {numberFormat(product.price)}
                  원
                </Price>
              </Product>
            ))
          )}
        </ProductList>
        <Pages>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                type="button"
                value={number}
                onClick={(e) => handleClickPageNumber(e)}
              >
                {number}
              </button>
            </li>
          ))}
        </Pages>
      </ProductBox>
    </Container>
  );
}
