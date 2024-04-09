import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const[products,setProduct] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      //console.log(data);
      setProduct(data)
    
  }
      
    fetchProducts()

  }, [])
  
  //DELETE PRODUCTS

 const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
      });
      console.log(response)
      if (response.ok) {
        console.log('Product deleted');
        setProduct(products.filter(product => product.id !== productId));
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '10px' }}>
              <h2 style={{ marginTop: '0', fontSize: '18px' }}>{product.title}</h2>
              <p style={{ marginBottom: '0', fontSize: '16px' }}>${product.price}</p>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
