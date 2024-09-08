let products = [
  { id: 1, name: 'Produto 1', price: 100, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Produto 2', price: 150, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Produto 3', price: 200, image: 'https://via.placeholder.com/150' }
];

let cart = [];
let currentUser = null;

// Renderizar Produtos
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px;">
      <h3>${product.name}</h3>
      <p>Preço: R$${product.price}</p>
      <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Adicionar Produto Dinamicamente
function addProduct(name, price, image) {
  const newProduct = {
    id: products.length + 1, // ID baseado no tamanho da lista atual
    name: name,
    price: parseFloat(price),
    image: image
  };

  products.push(newProduct);
  renderProducts(); // Atualiza a lista de produtos
}

// Lidar com o Formulário de Adição de Produto
document.getElementById('add-product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const image = document.getElementById('product-image').value;

  if (name && price && image) {
    addProduct(name, price, image); // Adiciona o produto à lista com imagem
    document.getElementById('add-product-form').reset(); // Limpa o formulário
  } else {
    alert('Por favor, preencha todos os campos!');
  }
});

// Renderizar Carrinho
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Carrinho vazio</p>';
    return;
  }

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Quantidade: ${item.quantity}</p>
      <p>Preço: R$${item.price * item.quantity}</p>
    `;
    cartItems.appendChild(cartItemDiv);
  });
}

// Adicionar ao Carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

renderProducts();
