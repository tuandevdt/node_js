
function homePage({ products, categories }) {
  let slider = `
<div class="slider-contai">
                    <div id="slider-main" class="slider">       
                        <div class="img-slider">
                            <img src="https://gshock.casio.com/content/experience-fragments/casio/en/feature/timepiece/watch/g-shock/mt_g/mtg_b2000/features02/us/_jcr_content/root/container_963753939/teaser.casiocoreimg.jpeg/1659473003966/mtg-b2000-tile-img-2-1600x900.jpeg" alt="">
                            <div class="bground-slider"></div>
                            <div class="content-slider">
                                <h1  id="content-sd" >G-Shock VIỆT NAM</h1>
                                <span>Chuyên phân phối đồng hồ Casio Mỹ/Nhật chính hãng giá cạnh tranh nhất</span>
                                <button><a href="">MUA NGAY</a></button>
                            </div>
                        </div>
                        <div class="img-slider">
                            <video preload playsinline muted autoplay loop width="1349px" height="760px">
                                <source src="https://www.g-store.vn/wp-content/uploads/2023/07/MUDMASTER-GWG-2000-CASIO-G-SHOCK.mp4">
                            </video>
                        </div>
                        <div class="img-slider">
                            <img src="http://donghotuandt.vnn.mn/userfiles/img/604453/banner01.jpg" alt="">
                            <div class="bground-slider"></div>
                            <div class="content-slider">
                                <h1>G-Shock VIỆT NAM</h1>
                                <span>Chuyên phân phối đồng hồ Casio Mỹ/Nhật chính hãng giá cạnh tranh nhất</span>
                                <button><a href="">MUA NGAY</a></button>
                            </div>
                            
                        </div> 
                        <div class="img-slider">
                            <img src="http://donghotuandt.vnn.mn/userfiles/img/604453/banner02.jpg" alt="">
                            <div class="bground-slider"></div>
                            <div class="content-slider">
                                <h1>G-Shock VIỆT NAM</h1>
                                <span>Chuyên phân phối đồng hồ Casio Mỹ/Nhật chính hãng giá cạnh tranh nhất</span>
                                <button><a href="">MUA NGAY</a></button>
                            </div>
                        </div>
                    </div>

                    <div class="btn-slider">
                        <div id="left1" class="left-slider">
                        <i class='bx bx-chevron-left' onclick="prevFunction()"></i>
                        </div>
                        <div id="right1" class="right-slider">
                        <i class='bx bx-chevron-right' onclick="nextFunction()"></i>
                        </div>
                    </div> 
                </div>
    `;
  let categoriesPage = `
        <div class="flex justify-center items-center">
        <div class="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
            <div class="flex flex-col jusitfy-center items-center space-y-10">
                <div class="flex flex-col justify-center items-center ">
                    <h1 class="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 dark:text-white">Shop By Category</h1>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
                    ${categories
                      .map(
                        (item) => `
                    <a href="#title${item.id}">
                        <div class="relative group flex justify-center items-center h-full w-full">
                            <img class="object-center object-cover h-full w-full" src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png" alt="girl-image" />
                            <button class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">${item.name}</button>
                            <div class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
                        </div>
                    </a>
                    `
                      )
                      .join("")}
                    
                </div>
                <div class="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
                    <img class="object-center object-cover h-full w-full hidden md:block" src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png" alt="girl-image" />
                    <img class="object-center object-cover h-full w-full sm:hidden" src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png" alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2" />
                    <button class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Accessories</button>
                    <div class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
                </div>
            </div>
        </div>
    </div>
    
    `;

    let productsPage = `
        ${categories.map(category => {
            const items = products.filter(product => product.categoryid == category.id);

            return `
                <h2 class="text-center font-bold text-3xl mb-4 uppercase" id="title${category.id}">${category.name}</h2>
                <div class="relative container mx-auto">
                    <div class="overflow-hidden gap-x-4" id="slider${category.id}">
                        ${items.map((item) => `
                        <div class="image-pro-height img-products${category.id} min-w-[21vw] max-w-[21vw] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="/products/${item.id}">
                                <img class="rounded-t-lg" src="http://localhost:4000/${item.image}" alt="" />
                            </a>
                            <div class="p-5">
                                <a href="/products/${item.id}">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">${item.description}</p>
                                <a href="/products/${item.id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    View More
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        `).join('')}
                    </div> 

                    <button id="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2" onclick="prevProducts${category.id}()">
                        &#10094;
                    </button>
                    <button id="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2" onclick="nextProducts${category.id}()">
                        &#10095;
                    </button>
                </div>

            `
        }).join('')}
        
    `

  const listData = slider + categoriesPage + productsPage;


  return listData;
}



export default homePage;
