
function confirmDelete(id) {
    document.querySelector('.form-delete').classList.remove('none-active')
    document.querySelector('#id-update').value = id;
    document.querySelector('.none').addEventListener('click', () => {
        document.querySelector('.form-delete').classList.add('none-active')
    })
    document.querySelector('#confirmDelete').setAttribute('href', `/admin/products/delete/${id}`);
}
function confirmDeleteCategory(id) {
    document.querySelector('.form-delete').classList.remove('none-active')
    document.querySelector('#id-update').value = id;
    document.querySelector('.none').addEventListener('click', () => {
        document.querySelector('.form-delete').classList.add('none-active')
    })
    document.querySelector('#confirmDelete').setAttribute('href', `/admin/categories/delete/${id}`);
}

function updateUser(id) {
    document.querySelector('.form-update').classList.remove('none-active')
    document.querySelector('#id-user-update').value = id;

    document.querySelector('#form-submit-update').addEventListener('submit', (e) => {
        e.preventDefault();
        let status = document.querySelector("#status-update").value;
        console.log(status);

        e.target.action = `/admin/users/update/${id}`;
            
        e.target.submit();
        
    })
    document.querySelector('.none-update').addEventListener("click", () => {
        document.querySelector('.form-update').classList.add('none-active')
    })

}
function updateOrder(id, status) {    
    console.log(status.length);


    document.querySelector('.form-update-order').classList.remove('none-active')
    document.querySelector('#id-order-update').value = id;

    const statusSelect = document.querySelector("#status-update");
    statusSelect.value = status; // Đặt giá trị của select

    // Gọi hàm để disable các option dựa trên status
    disableOptionsBasedOnStatus(statusSelect);

    document.querySelector('#form-submit-update').addEventListener('submit', (e) => {
        e.preventDefault();
        let status = document.querySelector("#status-update").value;
        console.log(status);

        e.target.action = `/admin/orders/update/${id}?status=${encodeURIComponent(status)}`;        
            
        e.target.submit();
        
    })
    document.querySelector('.none-update').addEventListener("click", () => {
        document.querySelector('.form-update-order').classList.add('none-active')
    })

}

function disableOptionsBasedOnStatus(selectElement) {
    const options = selectElement.options; // Lấy tất cả các option
    const currentIndex = selectElement.selectedIndex; // Lấy index của option hiện tại

    // Disable các option có index nhỏ hơn currentIndex
    for (let i = 0; i < options.length; i++) {
        if (i < currentIndex) {
            options[i].disabled = true; // Disable option
        } else {
            options[i].disabled = false; // Enable lại các option còn lại
        }
    }
}

function deleteReview(id) {
    
    document.querySelector('.form-delete').classList.remove('none-active')
    document.querySelector('#id-update').value = id;
    document.querySelector('.none').addEventListener('click', () => {
        document.querySelector('.form-delete').classList.add('none-active')
    })
    document.querySelector('#confirmDelete').setAttribute('href', `/admin/reviews/delete/${id}`);
}


