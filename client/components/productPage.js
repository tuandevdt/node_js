import formatCurrency from "../js/formatMoney";

function card(item) {
  return `
         <div class="img-products-list border rounded-lg overflow-hidden shadow-lg">
            <a href="/products/${item.id}">
              <img src="http://localhost:4000/${item.image}" alt="${item.name}" class="w-full h-64 object-cover transition-transform duration-300 hover:scale-105">
            </a>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">${item.name}</h3>
              <p class="text-gray-700 font-medium mb-2">
                ${formatCurrency(item.price)} 
                <span class="text-red-500 line-through">48,950,000 đ</span> 
                <span class="text-green-600">(45% Off)</span>
              </p>
              <div class="flex items-center mt-2">
                <span class="text-yellow-500">★★★★★</span>
              </div>
            </div>
          </div>
      `;
}
function productPage(datas, categories) {
  let listData = datas.map((item) => card(item)).join("");

  // Tạo HTML cho phần chọn danh mục
  const categorySelectHTML = categories
    .map(
      (item) => `
      <option value="${item.id}">${item.name}</option>
  `
    )
    .join("");
  return `
      <div class="container mx-auto p-6">
        <h1 class="text-4xl font-bold mb-8 text-center">Featured Products</h1>

        <div class="flex justify-between mb-4">
          <!-- Lọc theo danh mục -->
          <select id="category-select" class="border rounded-md p-2">
            ${categorySelectHTML}
          </select>
          <form id="form-search" method="GET" class="flex items-center">
            <input type="text" id="productname" name="productname" placeholder="Search product..." class="border rounded-md px-4 py-2 mr-2" />
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
          </form>
          <!-- Lọc theo giá -->
          <select id="price-select" class="border rounded-md p-2">
            <option value="low-to-high">Giá: Thấp đến Cao</option>
            <option value="high-to-low">Giá: Cao đến Thấp</option>
          </select>
        </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="product-list">
        ${listData}
        
      </div>
  </div>

    `;
}

export default productPage;
