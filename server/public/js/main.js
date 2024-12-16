// function products() {
//     let menuItems = document.querySelectorAll('.menu-item');
//     let listProducts = document.querySelectorAll('.item-product');

//     menuItems.forEach(function(n, i) {
//         n.addEventListener('click', () => {
//             document.querySelector('.active-title-product').classList.remove('active-title-product');
//             n.classList.add('active-title-product');

//             document.querySelector('.active-list').classList.add('none-list-item');
//             document.querySelector('.active-list').classList.remove('active-list');
//             listProducts[i].classList.remove('none-list-item');
//             listProducts[i].classList.add('active-list');

//         });
//     });

// }