import axios from "axios";

function detailPage(id) {
    document.addEventListener("DOMContentLoaded", async () => {
      console.log('a');
      const showDetail = async () => {
        const formDetail = document.getElementById("formDetail");
        console.log('formDetail', formDetail);
        
        const response = await axios.get(`http://localhost:4000/v1/api/products/${id}`);      
        
        const product = response.data.data;

        console.log('product', product);
      }
      await showDetail(id);
    //   let categoryid = product.categoryid;
    //   const category = await axios.get(
    //     `http://localhost:4000/v1/api/categories/${categoryid}`
    //   );
    //   let categoryName = category.data.data.name;

    //   const productsByCategory = await axios.get(
    //     `${apiBaseUrl}/products/categories/${categoryid}`
    //   );
    //   let resultProducts = productsByCategory.data.data;
      
    })
      return `
          <div class="bg-gray-100">
            <div id="formDetail" class="container mx-auto px-4 py-8">
              
            </div>
          </div>
  
          <!-- sản phẩm tương tự -->
          <div class="container mx-auto mt-10">
              <h2 class="text-2xl font-bold mb-4">Sản phẩm tương tự</h2>
              <div class="overflow-auto">
                  <div class="flex space-x-4 p-2">
                      
                  </div>
              </div>
          </div>
  
         <!-- Phần Bình Luận -->
        
      `

  }
  export default detailPage;