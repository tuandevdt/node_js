
import Navigo from "navigo";
function Header(user) {
    return `
            <header class='flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div class='container flex flex-wrap items-center justify-between gap-4 w-full'>
          <a href="/home"
              class="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2" data-navigo>
              <img src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-36' />
          </a>
  
          <div id="collapseMenu"
              class='max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
              <button id="toggleClose" class='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-black" viewBox="0 0 320.591 320.591">
                      <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                      <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                  </svg>
              </button>
  
              <ul class='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                  <li class='mb-6 hidden max-lg:block'>
                      <a href="/home" data-navigo>
                          <img src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-36' />
                      </a>
                  </li>
                  <li class='max-lg:border-b max-lg:py-3 px-3'>
                      <a href='/home' class='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]' data-navigo>Home</a>
                  </li>
                  <li class='max-lg:border-b max-lg:py-3 px-3'>
                      <a href='/products' class='hover:text-[#007bff] text-[#333] block font-semibold text-[15px]' data-navigo>Products</a>
                  </li>
                  <li class='max-lg:border-b max-lg:py-3 px-3'>
                      <a href='/' class='hover:text-[#007bff] text-[#333] block font-semibold text-[15px]' data-navigo>Feature</a>
                  </li>
                  <li class='max-lg:border-b max-lg:py-3 px-3'>
                      <a href='/orders' class='hover:text-[#007bff] text-[#333] block font-semibold text-[15px]' data-navigo>My Orders</a>
                  </li>
              </ul>
          </div>
  
          <div class='flex items-center ml-auto space-x-6'>
            <a href="/cart" class="flex items-center text-gray-700 hover:text-[#007bff]" data-navigo>
              <svg class="w-7 h-7 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4v2h14l-1.5 7H8.2L6.9 8H1V6h5.2l1.5 2h12.2l1.5-6H7zm-2 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
              <span class="font-semibold hover:text-[#007bff]">Card</span>
            </a>
            <div id="text-login">
                ${
                    user
                    ? `
                        <div class="username" id="username">
                        <button class='font-semibold text-[15px] border-none outline-none'>
                            <a href='/profile' class='text-[#007bff] hover:underline' data-navigo>${user}</a>
                        </button>
                        <div class="dropdown" id="dropdown">
                            <a href="/profile" class="dropdown-item" data-navigo>Your Profile</a>
                            <a href="/settings" class="dropdown-item" data-navigo>Setting</a>
                            <a class="dropdown-item" id="logout-button" onclick="logOut()">Logout</a>
                        </div>
                        </div>`
                    : `
                        <button class='font-semibold text-[15px] border-none outline-none'>
                        <a href='/' class='text-[#007bff] hover:underline'>Login</a>
                        </button>`
                }
            </div>
  
            <button id="toggleOpen" class='lg:hidden'>
                <svg class="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
          </div>
      </div>
  </header>
    
    `
}
export default Header;