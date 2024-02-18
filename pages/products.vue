<template>
  <div class="product-list">
    <h1>Product Catalog</h1>
    <div v-for="product in displayedProducts" :key="product.id" class="product">
      <img :src="product.image" :alt="product.name" />
      <div class="product-details">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price }}</p>
        <router-link :to="{ name: 'product-details', params: { id: product.id }}">
          View Details
        </router-link>
      </div>
    </div>
    <pagination :total="totalProducts" @pageChange="fetchProducts" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      totalProducts: 0,
      currentPage: 1,
      productsPerPage: 3 // Adjust the number of products per page as needed
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    displayedProducts() {
      const startIndex = (this.currentPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;
      return this.products.slice(startIndex, endIndex);
    }
  },
  methods: {
    async fetchProducts(page = 1) {
  try {
    const response = await this.$axios.get('/api/products', {
      params: {
        page,
        limit: this.productsPerPage
      }
    });
    this.products = response.data.products;
    this.totalProducts = response.data.total;
    this.currentPage = page; // Update current page
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

  }
};
</script>
<style scoped>
.product-list {
  padding: 20px;
}

.product {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-family: 'Roboto', sans-serif; /* Add Google Font 'Roboto' */
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product h2 {
  margin-top: 0;
}

.product-price {
  font-weight: bold;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

img {
margin-right:10px;
}

h1 {
  font-family: 'Roboto', sans-serif; /* Add Google Font 'Roboto' */
  text-align: center;
}
</style>
