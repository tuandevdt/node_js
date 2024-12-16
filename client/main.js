import "./style.css";
import Navigo from "navigo";

import axios from "axios";
import Header from "./layout/Header";
import getUser from "./layout/getUser";
import logOut from "./js/app";
import Footer from "./layout/Footer";
import homePage from "./components/homePage";
import productPage from "./components/productPage";
import detailPage from "./components/detailPage";
// import detailPage from "./pages/Client/detailPage";
import cartPage from "./components/cartPage";
import checkoutPage from "./components/checkoutPage";
import orderPage from "./components/orderPage";
import orderItemPage from "./components/orderItemPage";
import loginPage from "./pages/Auth/loginPage";
import registerPage from "./pages/Auth/registerPage";

const router = new Navigo("/");
const apiProducts = "http://localhost:4000/v1/api/products";
const apiBaseUrl = "http://localhost:4000/v1/api";
let currentProducts = [];

const showUserPage = async (component) => {
  const userInfo = await getUser();
  document.querySelector("#app").innerHTML = `${Header(
    userInfo
  )}<div class="min-h-[100vh]"> ${component}</div>${Footer()}`;
  logOut();
};
const showAuthPage = (component) => {
  document.querySelector(
    "#app"
  ).innerHTML = `<div class="bg-slate-200 min-h-[100vh]"> ${component}</div>`;
};

router
  .on("/", async () => {
    try {
      showAuthPage(loginPage());
    } catch (error) {
      console.log(error);
    }
  })
  .on("/register", async () => {
    showAuthPage(registerPage());
  })
  .on("/home", async () => {
    try {
      const results = await axios.get(apiProducts);
      const resultCategories = await axios.get(`${apiBaseUrl}/categories`);
      let categories = resultCategories.data.data;
      let products = results.data.data;
      showUserPage(homePage({ products, categories }));
    } catch (error) {
      console.error(error);
    }
  })
  .on("/products", async (params) => {
    let name = "";

    if (params.params && params.params.productname) {
      name = params.params.productname;
      console.log("name", name);
    }
    try {
      const response = await axios.get(`${apiProducts}?productname=${name}`);
      const categories = await axios.get(
        "http://localhost:4000/v1/api/categories"
      );
      let datas = response.data.data;
      currentProducts = datas;
      showUserPage(productPage(datas, categories.data.data)).then(() => {
        handleCategoryChange();
        changePrice();
        // searchProduct()
      });
    } catch (error) {
      console.error(error);
    }
  })
  .on(`/products/:id`, async (params) => {
    const id = params.data.id;
    try {
      const response = await axios.get(`${apiProducts}/${id}`);
      let datas = response.data.data;
      let categoryid = datas.categoryid;
      const category = await axios.get(
        `${apiBaseUrl}/categories/${categoryid}`
      );
      let categoryName = category.data.data.name;

      const productsByCategory = await axios.get(
        `${apiBaseUrl}/products/categories/${categoryid}`
      );
      let resultProducts = productsByCategory.data.data;

      showUserPage(detailPage(datas, categoryName, resultProducts)).then(() => {
        addCart();
        showComment(id);
        createComment();
      });
    } catch (error) {
      console.error(error);
    }
  })
  .on("/cart", async () => {
    try {
      const carts = await getCart();
      showUserPage(cartPage(carts));
      updateCart();
      deleteCart();
    } catch (error) {
      console.error(error);
    }
  })
  .on("/checkout", async () => {
    const carts = await getCart();
    showUserPage(checkoutPage(carts)).then(() => {
      // checkOutList(carts)
      checkout(carts);
    });
  })
  .on("/orders", async () => {
    try {
      let orders = await getOrders();
      showUserPage(orderPage(orders));
      updateStatusOrder()
    } catch (error) {
      console.error(error);
    }
  })
  .on("/orders/:id", async (params) => {
    try {
      const id = params.data.id;
      let orders = await getOrderItem(id);
      console.log(orders);

      showUserPage(orderItemPage(orders));
    } catch (error) {
      console.error(error);
    }
  });

router.resolve();

function handleCategoryChange() {
  document
    .getElementById("category-select")
    .addEventListener("change", (event) => {
      const selectedCategoryId = event.target.value;
      showProductsByCategory(selectedCategoryId);
    });
}
async function showProductsByCategory(categoryid) {
  console.log(`Hiển thị sản phẩm cho danh mục ID: ${categoryid}`);
  // Gọi API hoặc lọc sản phẩm để cập nhật danh sách sản phẩm
  const response = await axios.get(
    `http://localhost:4000/v1/api/products/categories/${categoryid}`
  );
  console.log(`response`, response);
  currentProducts = response.data.data;
  updateProductList(currentProducts);
}

function changePrice() {
  const priceSelect = document.getElementById("price-select"); // Sử dụng id để lấy đúng thẻ

  priceSelect.addEventListener("change", handlePriceChange);
}
function handlePriceChange(event) {
  const selectedPriceOrder = event.target.value;
  let sortedProducts;

  if (selectedPriceOrder === "low-to-high") {
    sortedProducts = [...currentProducts].sort((a, b) => a.price - b.price);
  } else if (selectedPriceOrder === "high-to-low") {
    sortedProducts = [...currentProducts].sort((a, b) => b.price - a.price);
  }
  updateProductList(sortedProducts);
}
function updateProductList(products) {
  const productListElement = document.getElementById("product-list");
  productListElement.innerHTML = products
    .map(
      (item) => `
      <div class="img-products-list border rounded-lg overflow-hidden shadow-lg">
            <a href="/products/${item.id}">
              <img src="http://localhost:4000/${item.image}" alt="${item.name}" class="w-full h-64 object-cover transition-transform duration-300 hover:scale-105">
            </a>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">${item.name}</h3>
              <p class="text-gray-700 font-medium mb-2">
                $${item.price} 
                <span class="text-red-500 line-through">$180</span> 
                <span class="text-green-600">(45% Off)</span>
              </p>
              <div class="flex items-center mt-2">
                <span class="text-yellow-500">★★★★★</span>
              </div>
            </div>
          </div>
    `
    )
    .join("");
  handleCategoryChange();
  changePrice(productListElement);
}

async function getCart() {
  const user_id = await getUserId()
  try {
    const response = await axios.get(`${apiBaseUrl}/cart`, {
      params: { user_id },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
async function addCart() {
  const btnAddCart = document.querySelector("#form-add-cart");

  btnAddCart.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user_id = await getUserId()

    try {
      const product_id = document.querySelector(
        "input[name='product_id']"
      ).value;
      const quantity = document.querySelector("input[name='quantity']").value;

      const dataCart = { product_id, quantity, user_id };

      await axios.post(`${apiBaseUrl}/cart`, dataCart);
      alert("Add Cart successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(
        "Error add cart: " +
          (error.response?.data?.message || "Unknown error occurred")
      );
    }
  });
}

async function updateCart() {
  try {
    const carts = await getCart();

    carts.forEach((item) => {
      const id = item.id;

      document
        .querySelector(`#decrement-button-${id}`)
        .addEventListener("click", async (e) => {
          let valueInput = parseInt(
            document.querySelector(`#counter-input-${id}`).value
          );

          if (valueInput > 1) {
            valueInput -= 1;
            document.querySelector(`#counter-input-${id}`).value = valueInput;
            try {
              await axios.patch(`${apiBaseUrl}/cart/update/${id}`, {
                quantity: valueInput,
              });
              const updatedCarts = await getCart();
              showUserPage(cartPage(updatedCarts));
              updateCart();
            } catch (error) {
              console.error("Lỗi cập nhật:", error);
              alert(
                "Error Update cartGiỏ hàng: " +
                  (error.response?.data?.message || "Unknown error occurred")
              );
            }
          }
        });

      document
        .querySelector(`#increment-button-${id}`)
        .addEventListener("click", async (e) => {
          let valueInput = parseInt(
            document.querySelector(`#counter-input-${id}`).value
          );

          valueInput += 1;
          document.querySelector(`#counter-input-${id}`).value = valueInput;
          try {
            await axios.patch(`${apiBaseUrl}/cart/update/${id}`, {
              quantity: valueInput,
            });
            const updatedCarts = await getCart();
            showUserPage(cartPage(updatedCarts));
            updateCart();
          } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert(
              "Error Update cartGiỏ hàng: " +
                (error.response?.data?.message || "Unknown error occurred")
            );
          }
        });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    alert(
      "Error Update cart: " +
        (error.response?.data?.message || "Unknown error occurred")
    );
  }
}

async function deleteCart() {
  try {
    const carts = await getCart(); // Lấy lại giỏ hàng sau khi render

    carts.map((item) => {
      const id = item.id;
      document
        .querySelector(`#delete-cart-${id}`)
        .addEventListener("click", async () => {
          await axios.delete(`${apiBaseUrl}/cart/delete/${id}`);
          const updatedCarts = await getCart();
          showUserPage(cartPage(updatedCarts));
          updateCart();
          deleteCart();
        });
    });
  } catch (error) {
    console.error("Error delete user:", error);
    alert(
      "Error delete cart: " +
        (error.response?.data?.message || "Unknown error occurred")
    );
  }
}
async function formEditCmt() {
  let buttons = document.querySelectorAll(".editComment");

  buttons.forEach((button) => {
    button.addEventListener("click", async function () {
      const commentId = this.getAttribute("data-id");
      const response = await axios.get(`${apiBaseUrl}/reviews/${commentId}`);
      const data = response.data.data;
      let selectedRating = data.rating;
      document.querySelector("#form-edit-cmt").style.display = "block";
      document.querySelector("#form-edit-cmt").innerHTML = `
            <form id="edit-form-cmt" action="products/${data.id}" class="mb-6">
                <input type="hidden" name="id" value="${data.id}"> 
                <input type="hidden" name="product_id" value="${
                  data.product_id
                }"> 
                <h2>Cập nhật bình luận</h2>
                <!-- Phần chọn sao -->
                <div class="flex items-center mb-2">
                    <span class="text-lg mr-2">Đánh giá:</span>
                    <div id="star-rating-update" class="flex cursor-pointer">
                        ${[1, 2, 3, 4, 5]
                          .map(
                            (star) => `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star w-6 h-6 ${
                              star <= data.rating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            } hover:text-yellow-500" data-value="${star}">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                            </svg>
                        `
                          )
                          .join("")}
                    </div>
                </div>

                <input type="text" name="comment" placeholder="Nhập bình luận của bạn..." class="w-full p-2 border rounded-md" value="${
                  data.text
                }">                
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Cập nhật</button>
                <button type="button" id="close-btn-edit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Hủy</button>
            </form>
          `;
      handleUpdateComment(selectedRating);

      document
        .querySelector("#close-btn-edit")
        .addEventListener("click", () => {
          document.querySelector("#form-edit-cmt").style.display = "none";
        });
    });
  });
}
async function showComment(id) {
  const product_id = id;
  if (product_id) {
    try {
      const response = await axios.get(`${apiBaseUrl}/reviews`, {
        params: { product_id },
      });
      const user_id = await getUserId();
      const comments = response.data.data;

      comments.map((comment) => {
        const commentsList = document.getElementById("comments-list");
        const commentElement = document.createElement("div");
        commentElement.className = "border p-4 mb-2 rounded-md bg-gray-50";

        const editButton =
          comment.user_id == user_id
            ? `<button class="editComment" data-id="${comment.id}">Edit</button>`
            : "";

        commentElement.innerHTML = `
          <strong>${comment.id}. ${comment.username}</strong>
          <p>${comment.text} - <small><i>Được đánh giá</i></small>: 
            <span class="text-yellow-500">${comment.rating} ★</span> 
            ${editButton}
          </p>`;

        commentsList.prepend(commentElement);
        formEditCmt();
      });
    } catch (error) {
      console.error("Lỗi khi lấy bình luận:", error);
    }
  } else {
    console.log("not productid");
  }
}

async function handleUpdateComment(selectedRating) {
  document
    .getElementById("star-rating-update")
    .addEventListener("click", (e) => {
      // Xác định phần tử được nhấp
      const target = e.target.closest(".star");

      // Kiểm tra xem có phải là sao không
      if (target) {
        const value = target.dataset.value; // Lấy giá trị từ data-value

        // Kiểm tra xem giá trị có phải là số không
        if (!isNaN(value)) {
          selectedRating = parseInt(value);
          const stars = document.querySelectorAll("#star-rating-update .star");

          stars.forEach((star) => {
            // Cập nhật màu sắc cho các sao đã chọn
            if (parseInt(star.dataset.value) <= selectedRating) {
              star.classList.add("text-yellow-500");
              star.classList.remove("text-gray-400");
            } else {
              star.classList.remove("text-yellow-500");
              star.classList.add("text-gray-400");
            }
          });
        } else {
          console.error("Giá trị không hợp lệ:", value);
        }
        console.log(`rating: ${selectedRating}`);
      }
    });

  document
    .querySelector("#edit-form-cmt")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Bạn chưa đăng nhập");
        return "";
      }
      const resToken = await axios.get(
        "http://localhost:4000/v1/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user_id = resToken.data.id;

      const formData = new FormData(e.target);
      const commentData = {
        id: formData.get("id"),
        product_id: formData.get("product_id"),
        text: formData.get("comment"),
        rating: selectedRating,
        user_id,
      };

      try {
        console.log(`id: ${commentData.id}`);
        await axios.patch(
          `${apiBaseUrl}/reviews/update/${commentData.id}`,
          commentData
        ); // Gửi bình luận đến server

        const product_id = commentData.product_id;

        e.target.reset(); // Reset form
        selectedRating = 0; // Đặt lại đánh giá đã chọn
        const stars = document.querySelectorAll("#star-rating-update .star");
        stars.forEach((star) => {
          star.classList.remove("text-yellow-500");
          star.classList.add("text-gray-400");
        });
        document.querySelector("#form-edit-cmt").style.display = "none";
        console.log(`productid`, product_id);
        // Xóa các bình luận hiện có
        const commentsList = document.getElementById("comments-list");
        commentsList.innerHTML = "";
        showComment(product_id);
      } catch (error) {
        console.error("Lỗi update bình luận:", error);
        alert("Có lỗi xảy ra khi update bình luận.");
      }
    });
}
async function createComment() {
  let selectedRating = 0;

  document.getElementById("star-rating").addEventListener("click", (e) => {
    // Xác định phần tử được nhấp
    const target = e.target.closest(".star");

    // Kiểm tra xem có phải là sao không
    if (target) {
      const value = target.dataset.value; // Lấy giá trị từ data-value

      if (!isNaN(value)) {
        selectedRating = parseInt(value);
        const stars = document.querySelectorAll("#star-rating .star");

        stars.forEach((star) => {
          // Cập nhật màu sắc cho các sao đã chọn
          if (parseInt(star.dataset.value) <= selectedRating) {
            star.classList.add("text-yellow-500");
            star.classList.remove("text-gray-400");
          } else {
            star.classList.remove("text-yellow-500");
            star.classList.add("text-gray-400");
          }
        });
      } else {
        console.error("Giá trị không hợp lệ:", value);
      }
      console.log(`rating: ${selectedRating}`);
    }
  });

  document
    .getElementById("comment-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!selectedRating) {
        e.preventDefault();
        alert('Vui lòng chọn đánh giá trước khi gửi bình luận!'); 
        return;
    }
      const user_id = await getUserId();

      const formData = new FormData(e.target);
      const commentData = {
        product_id: formData.get("product_id"),
        text: formData.get("comment"),
        rating: selectedRating,
        user_id,
      };

      try {
        await axios.post(
          `${apiBaseUrl}/reviews/create`,
          commentData
        ); 

        e.target.reset();
        selectedRating = 0; 
        const stars = document.querySelectorAll("#star-rating .star");
        stars.forEach((star) => {
          star.classList.remove("text-yellow-500");
          star.classList.add("text-gray-400");
        });

        const commentsList = document.getElementById("comments-list");
        commentsList.innerHTML = "";
        showComment(commentData.product_id);
      } catch (error) {
        console.error("Lỗi gửi bình luận:", error);
        alert("Có lỗi xảy ra khi gửi bình luận.");
      }
    });
}
async function checkout(carts) {
  document
    .querySelector("#form-checkout")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullname = document.querySelector("#your_name").value;
      const city = document.querySelector("#your_city").value;
      const district = document.querySelector("#your_district").value;
      const ward = document.querySelector("#your_ward").value;
      let phone = document.querySelector("#phone-input").value; // Khai báo phone ở đây
      const street = document.querySelector("#your_street").value;
      const selectedPaymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      );
      const selectedDeliveryMethod = document.querySelector(
        'input[name="delivery-method"]:checked'
      );
      const total = document.querySelector("#total").value;

      console.log(street, ward, district, city);
      console.log(fullname);
      phone = "0" + phone;
      console.log(phone);
      console.log(selectedPaymentMethod.id);
      console.log(selectedDeliveryMethod.id);
      console.log(total);

      const is_primary = 1;
      const user_id = await getUserId();
      const dataAddress = {
        user_id,
        fullname,
        phone,
        street,
        ward,
        district,
        city,
        is_primary,
      };

      try {
        const addAddress = await axios.post(
          `${apiBaseUrl}/addresses/create`,
          dataAddress
        );
        console.log("resAddress", addAddress);
        const address_id = addAddress.data.data.id;
        console.log("address_id", address_id);

        const status = "Chờ xác nhận";
        const dataOrder = { user_id, address_id, status, total };
        const addOrder = await axios.post(
          `${apiBaseUrl}/orders/create`,
          dataOrder
        );
        console.log("resOrder", addOrder);
        const order_id = addOrder.data.data.id;

        console.log("order_id", order_id);

        await Promise.all(
          carts.map(async (cart) => {
            const product_id = cart.product.id;
            const quantity = cart.quantity;
            let price = cart.product.price;

            console.log(
              "product_id, quantity, price",
              product_id,
              quantity,
              price
            );
            console.log("order_id", order_id);
            price = parseFloat(price);
            price = price.toFixed(0);
            const dataOrderItem = { order_id, product_id, quantity, price };
            const addOrderItem = await axios.post(
              `${apiBaseUrl}/orderitem/create`,
              dataOrderItem
            );
            console.log("resOrderItem", addOrderItem);
            alert("Đặt hàng thành công.")
            window.location.href = "http://localhost:5173/orders";
          })
        );
      } catch (error) {
        console.error("Error in checkout process:", error);
      }
    });
}

async function getOrders() {

  try {
    const user_id = await getUserId()
    console.log('userid orders', user_id);
    
    const response = await axios.get(`${apiBaseUrl}/orders`, {
      params: { user_id },
    });
    console.log("data orders", response);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
async function updateStatusOrder() {
  try {
    const user_id = await getUserId()
    const response = await axios.get(`${apiBaseUrl}/orders`, {
      params: { user_id },
    });
    let orders = response.data.data;
    
    orders.map((item) => {
      const id = item.id;
      document
        .querySelector(`#cancel-order-${id}`)
        .addEventListener("click", async () => {
          if(item.status == 'Chờ xác nhận') {
            const status = 'Đã hủy đơn'            
            await axios.patch(`${apiBaseUrl}/orders/update/${id}`, {status});
            alert('Hủy đơn thành công.')
            let orders = await getOrders();
            showUserPage(orderPage(orders));
          } else {
            alert("Đơn hàng đang được xử lý hoặc đã được hủy!")
          }
          
        });
    });
  } catch (error) {
    console.error(error);
  }}

async function getOrderItem(id) {
  try {
    const response = await axios.get(`${apiBaseUrl}/orders/${id}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserId() {
  const token = localStorage.getItem("accessToken");
  try {
    if (!token) {
      alert("Bạn chưa đăng nhập");
      window.location.href = "http://localhost:5173/home";
      return "";
    }

    const resToken = await axios.get("http://localhost:4000/v1/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user_id = resToken.data.id;
    console.log("user_id after get userid", user_id);
    return user_id;
  } catch (e) {
    console.log(e);
  }
}

