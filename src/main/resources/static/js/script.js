const baseUrl = 'http://127.0.0.1:8080/api';
const container = document.querySelector('.container');

const pageElm = {
    home() {
        const page = document.createElement('a')
        page.href = '#';
        page.innerText = 'kembali';
    
        page.addEventListener('click',() => {
            container.innerHTML = '';
            productList();
        });
    
        container.appendChild(page);
    },
    insert() {
        const page = document.createElement('a')
        page.href = '#insert';
        page.innerText = 'Tambah data';
    
        page.addEventListener('click',() => {
            container.innerHTML = '';
            productInsertForm();
        });
    
        container.appendChild(page);
    },
};

const deleteData = async (id) => {
    const isConfirm = confirm('Are you sure?');

    if (isConfirm) {
        const response = await fetch(baseUrl + `/${id}`, {
            method: 'delete'
        });
        const status = await response.status;

        if (status == 200) {
            alert('data berhasil di hapus');
            container.innerHTML = '';
            productList();
        }
    }
}

// daftar product
async function productList() {
    container.innerHTML = '<h2>Daftar produk</h2>';
    const response = await fetch(baseUrl)
    const rows = await response.json();

    if (rows.length == 0) {
        container.innerHTML += '<h2>Tidak ada data</h2>'  
    } else {
        rows.forEach((row) => {
            const ul = document.createElement('ul');    
    
            ul.innerHTML = /* html */ `
                <li>id: ${row.id}</li>
                <li>name: ${row.name}</li>
                <li>description: ${row.description}</li>
                <li>price: ${row.price}</li>
                <li>
                    <a href="#update" onClick="productUpdateForm(${row.id})">ubah</a>
                </li>
                <li>
                    <a href="#delete" onClick="deleteData(${row.id})">hapus</a>
                </li>
            `;
    
            container.appendChild(ul);
        });
    }

    pageElm.insert();
}

async function productInsertForm() {
    container.innerHTML = /* html */ `
        <h2>Form tambah produk</h2>

        <form>
            <div class="form-group">
                <label for="product-name">name</label>
                <input type="text" id="product-name">
            </div>

            <div class="form-group">
                <label for="product-description">description</label>
                <input type="text" id="product-description">
            </div>

            <div class="form-group">
                <label for="product-price">price</label>
                <input type="number" id="product-price">
            </div>

            <div class="form-group">
                <button id="product-btn">submit</button>
            </div>
        </form>
    `;

    const insertData = async () => {
        const btn = document.querySelector('#product-btn');
        const name = document.querySelector('#product-name');
        const description = document.querySelector('#product-description');
        const price = document.querySelector('#product-price');

        btn.addEventListener('click', async (e) => {
            e.preventDefault();

            const data = {
                id: 1,
                name: name.value, 
                description: description.value, 
                price: price.value,
            };

            const response = await fetch(baseUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const status = response.status;
    
            if (status == 200) {
                alert('Berhasil menambahkan');
                window.location.href = '#';
                container.innerHTML = '';
                productList();
            }
        });
    }

    await insertData();
    pageElm.home();
}

async function productUpdateForm(id = null) {
    if (id === null) {
        alert('Mohon masukan id dengan benar!');
        window.location.href = '#';
        container.innerHTML = '';
        productList();
    } else {
        container.innerHTML = /* html */ `
            <h2>Form tambah produk</h2>

            <form>
                <div class="form-group">
                    <label for="product-id">id: ${id}</label>
                </div>

                <div class="form-group">
                    <label for="product-name">name</label>
                    <input type="text" id="product-name">
                </div>

                <div class="form-group">
                    <label for="product-description">description</label>
                    <input type="text" id="product-description">
                </div>

                <div class="form-group">
                    <label for="product-price">price</label>
                    <input type="number" id="product-price">
                </div>

                <div class="form-group">
                    <button id="product-btn">submit</button>
                </div>
            </form>
        `;

        const updateData = async () => {
            const btn = document.querySelector('#product-btn');
            const name = document.querySelector('#product-name');
            const description = document.querySelector('#product-description');
            const price = document.querySelector('#product-price');
    
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
    
                const fetchUrl = baseUrl +`/${id}`
                    +"?name="+ name.value
                    +"&description="+ description.value
                    +"&price="+ price.value;

                const response = await fetch(fetchUrl, {
                    method: 'put'
                });
                const status = response.status;
        
                if (status == 200) {
                    alert(`Produk dengan id: ${id} telah di ubah!`);
                    window.location.href = '#';
                    container.innerHTML = '';
                    productList();
                }
            });
        }

        await updateData();
        pageElm.home();
    }
}

switch (window.location.hash) {
    case '':
        productList();
        break;
    case '#':
        productList();
        break;
    case '#insert':
        productInsertForm();
        break;
    case '#update': 
        productUpdateForm(null);
        break;
    default:
        container.innerHTML = '<h1>halaman tidak ditemukan</h1>';
        break;
}
