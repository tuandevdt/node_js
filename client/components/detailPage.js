import formatCurrency from "../js/formatMoney";

function detailPage(product, categoryName, resultProducts) {
    return `
        <div class="bg-gray-100">
          <div class="container mx-auto px-4 py-8">
            <form id="form-add-cart" action="/cart" method="POST" class="flex flex-wrap -mx-4">
              <!-- Product Images -->
              <div class="w-full md:w-1/2 px-4 mb-8">
                <img src="http://localhost:4000/${product.image}" alt="${product.name}"
                    class="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage">
              </div>

              <div class="w-full md:w-1/2 px-4">
                <h2 class="text-3xl font-bold mb-2">${product.name}</h2>
                <p class="text-gray-600 mb-4">SKU: ${categoryName}</p>
                <div class="mb-4">
                  <span class="text-2xl font-bold mr-2">${formatCurrency(product.price)}</span>
                  <span class="text-gray-500 line-through">$399.99</span>
                </div>
                
                <div class="flex items-center mb-4">
                  <!-- Star Ratings -->
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-yellow-500">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-yellow-500">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-yellow-500">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-yellow-500">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-yellow-500">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-2 text-gray-600">4.5 (120 reviews)</span>
                </div>

                <p class="text-gray-700 mb-6">${product.description}</p>

                <input type="hidden" name="product_id" value="${product.id}">
                <input type="hidden" name="quantity" value="1"> <!-- Input ẩn cho số lượng, mặc định là 1 -->

                <div class="flex space-x-4 mb-6">
                  <button type="submit" class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">...</svg>
                    Add to Cart
                  </button>
                  <button type="button" class="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">...</svg>
                    Wishlist
                  </button>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-2">Key Features:</h3>
                  <ul class="list-disc list-inside text-gray-700">
                    <li>Industry-leading noise cancellation</li>
                    <li>30-hour battery life</li>
                    <li>Touch sensor controls</li>
                    <li>Speak-to-chat technology</li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- sản phẩm tương tự -->
        <div class="container mx-auto mt-10">
            <h2 class="text-2xl font-bold mb-4">Sản phẩm tương tự</h2>
            <div class="overflow-auto">
                <div class="flex space-x-4 p-2">
                    ${resultProducts.map((item) => 
                        `
                        <div class="product-item border rounded-lg shadow-lg p-4 text-center w-48 flex-shrink-0 transition-transform duration-300 transform bg-white hover:shadow-xl">
                            <a href="/products/${item.id}">
                                <img src="http://localhost:4000/${item.image}" alt="${item.name}" class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110">
                            </a>
                            <div class="p-4">
                                <h3 class="text-lg font-semibold mb-2 line-clamp-1">${item.name}</h3>
                                <p class="text-gray-700 font-medium mb-2">
                                    ${formatCurrency(item.price)} 
                                    <span class="text-red-500 line-through">$180</span> 
                                    <span class="text-green-600">(45% Off)</span>
                                </p>
                            </div>
                            <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Xem chi tiết</button>
                        </div>
                        `
                    ).join('')}
                </div>
            </div>
        </div>

       <!-- Phần Bình Luận -->
        <div class="container mx-auto mt-10">
            <h2 class="text-2xl font-bold mb-4">Bình luận về sản phẩm</h2>
            
            <form id="comment-form" action="products/${product.id}" class="mb-6">
                <input type="hidden" name="product_id" value="${product.id}"> <!-- ID sản phẩm -->
                
                <!-- Phần chọn sao -->
                <div class="flex items-center mb-2">
                    <span class="text-lg mr-2">Đánh giá:</span>
                    <div id="star-rating" class="flex cursor-pointer">
                        ${[1, 2, 3, 4, 5].map(star => `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star w-6 h-6 text-gray-400 hover:text-yellow-500" data-value="${star}">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                            </svg>
                        `).join('')}
                    </div>
                </div>

                <textarea name="comment" rows="4" placeholder="Nhập bình luận của bạn..." class="w-full p-2 border rounded-md"></textarea>
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Gửi bình luận</button>
            </form>

            <div id="comments-list">
                <!-- Bình luận sẽ được hiển thị ở đây -->
            </div>
            <div id="form-edit-cmt" style="display:none"></div>
        </div>
    `
}
export default detailPage;