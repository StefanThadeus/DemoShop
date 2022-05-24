class ProductsController {
    constructor() {
        this.productsService = new ProductsService();
        this.numberOfProductsPerPage = 4;
    }

    // loads dashboard view and get data by making server request on the given request url for data
    getView(dataRequestPath, titleSortOption = 'down', brandSortOption = 'down', categorySortOption = 'down', shortDescSortOption = 'down', priceSortOption = 'down', filterOptions = [], page = 1) {

        //check for query parameters first, and override with what is found
        let rawUrl = window.location.href;
        // remove pound sign as it doesn't work with it
        rawUrl = rawUrl.replace('#', '');
        let url = new URL(rawUrl);
        const params = new URLSearchParams(url.search);

        // title sort
        if (params.has('titleSort')) {
            titleSortOption = params.get('titleSort');
            ProductsView.titleSort = titleSortOption;
        }
        // brand sort
        if (params.has('brandSort')) {
            brandSortOption = params.get('brandSort');
            ProductsView.brandSort = brandSortOption;
        }
        // category sort
        if (params.has('categorySort')) {
            categorySortOption = params.get('categorySort');
            ProductsView.categorySort = categorySortOption;
        }
        // short description sort
        if (params.has('shortDescSort')) {
            shortDescSortOption = params.get('shortDescSort');
            ProductsView.shortDescriptionSort = shortDescSortOption;
        }
        // price sort
        if (params.has('priceSort')) {
            priceSortOption = params.get('priceSort');
            ProductsView.priceSort = priceSortOption;
        }
        // page number
        if (params.has('page')) {
            page = parseInt(params.get('page'));
        }
        // title filter
        if (params.has('titleFilter')) {
            filterOptions['title'] = params.get('titleFilter');
            ProductsView.titleFilter = filterOptions['title'];
        }
        // sku filter
        if (params.has('skuFilter')) {
            filterOptions['sku'] = params.get('skuFilter');
            ProductsView.skuFilter = filterOptions['sku'];
        }
        // brand filters
        if (params.has('brandFilter')) {
            filterOptions['brands'] = params.getAll('brandFilter');
            ProductsView.brandFilters = filterOptions['brands'];
        }
        // category filters
        if (params.has('categoryFilter')) {
            filterOptions['categories'] = params.getAll('categoryFilter');
            ProductsView.categoryFilters = filterOptions['categories'];
        }

        // convert array filterOptions to json format
        let jsonFilterOptions = Object.assign({}, filterOptions);

        // make a JSON request in order to send data to the backend via JSON
        let viewData = this.productsService.makeJSONRequest(dataRequestPath,
            {
                numberOfProducts: this.numberOfProductsPerPage,
                pageNumber: page,
                titleSort: titleSortOption,
                brandSort: brandSortOption,
                categorySort: categorySortOption,
                shortDescriptionSort: shortDescSortOption,
                priceSort: priceSortOption,
                filters: jsonFilterOptions
            });

        // 'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        viewData.then(data => {
            data = JSON.parse(data);
            if (data['operationSuccess']) {
                // view data received, change view
                this.changeView(data);
            } else {
                alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
            }
        });
    }

    // renders product create view on page
    getProductCreateView(dataRequestPath) {

        // make a JSON request in order to send data to the backend via JSON
        let categoryData = this.productsService.makeRequest('GET', dataRequestPath);
        categoryData.then(data => {
            let listItems = JSON.parse(data);

            // call for the view to render
            let contentAreaSelector = 'viewContent';

            let viewData = [];
            viewData['context'] = 'Create product';
            let productsView = new ProductManagementView();
            productsView.renderView(contentAreaSelector, viewData);

            // fill category list
            let categoryInput = document.getElementById('product-management-category-select');

            let controller = new ProductCategoriesController();

            for (let i = 0; i < listItems.length; i++) {
                let item = listItems[i];

                let option = document.createElement('option');
                option.setAttribute('data-category-id', item['id']);
                option.value = item['id'];
                option.innerHTML = item['title'];
                categoryInput.appendChild(option);
                controller.fillSelectList(item['subcategories'], 1, categoryInput);

                // add empty divider between root categories for increased readability
                if (i + 1 < listItems.length) {
                    let optionGroup = document.createElement('optgroup');
                    optionGroup.label = '';
                    categoryInput.appendChild(optionGroup);
                }
            }
        });
    }

    // render product edit view on page
    getProductEditView(dataRequestPath) {
        // window rendered, fill contents with the product data which is being edited
        let productSKU = window.location.href;
        let lastSlashIndex = productSKU.lastIndexOf('/');
        productSKU = productSKU.substring(lastSlashIndex + 1);

        // make a JSON request in order to send data to the backend via JSON
        let categoryData = this.productsService.makeRequest('GET', dataRequestPath);

        // make a JSON request in order to send data to the backend via JSON
        let productData = this.productsService.makeJSONRequest('api/product-by-sku', {
            sku: productSKU
        });

        categoryData.then(data => {
            let listItems = JSON.parse(data);

            // call for the view to render
            let contentAreaSelector = 'viewContent';

            let viewData = [];
            viewData['context'] = 'Edit product';
            let productsView = new ProductManagementView();
            productsView.renderView(contentAreaSelector, viewData);

            // fill category list
            let categoryInput = document.getElementById('product-management-category-select');

            let controller = new ProductCategoriesController();

            for (let i = 0; i < listItems.length; i++) {
                let item = listItems[i];

                let option = document.createElement('option');
                option.setAttribute('data-category-id', item['id']);
                option.value = item['id'];
                option.innerHTML = item['title'];
                categoryInput.appendChild(option);
                controller.fillSelectList(item['subcategories'], 1, categoryInput);

                // add empty divider between root categories for increased readability
                if (i + 1 < listItems.length) {
                    let optionGroup = document.createElement('optgroup');
                    optionGroup.label = '';
                    categoryInput.appendChild(optionGroup);
                }
            }

            // update view with product data
            productData.then(data => {
                data = JSON.parse(data);

                if (data['operationSuccess']) {

                    // update view
                    let element = document.getElementById('header-title');
                    element.setAttribute('data-product-id', data['product']['id']);

                    element = document.getElementById('SKU-textBox');
                    element.value = data['product']['sku'];

                    element = document.getElementById('title-textBox');
                    element.value = data['product']['title'];

                    element = document.getElementById('brand-textBox');
                    element.value = data['product']['brand'];

                    element = document.getElementById('price-textBox');
                    element.value = data['product']['price'];

                    element = document.getElementById('shortDescription-textBox');
                    element.value = data['product']['shortDescription'];

                    element = document.getElementById('longDescription-textBox');
                    element.value = data['product']['description'];

                    element = document.getElementById('enabled-checkBox');
                    if (data['product']['enabled']) {
                        element.setAttribute('checked', true);
                    }

                    element = document.getElementById('featured-checkBox');
                    if (data['product']['featured']) {
                        element.setAttribute('checked', true);
                    }

                    // update category parent title
                    element = document.getElementById('product-management-category-select');
                    element.value = data['product']['categoryId'];

                    // set image
                    element = document.getElementById('image');
                    if (data['image']) {
                        element.setAttribute('src', data['image']);
                    }
                } else {
                    alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
                }
            })
        });
    }

    // changes view by appending all the necessary html
    changeView(data) {

        // check if filters options already loaded
        if (ProductsView.allBrandFilterOptions.length === 0 && ProductsView.allCategoryFilterOptions.length === 0) {
            // needs to get list of all brands and categories for the filters
            // make a JSON request in order to send data to the backend via JSON
            let filterData = this.productsService.makeRequest('GET', 'api/filter-options');
            filterData.then(filterData => {
                let filterOptions = JSON.parse(filterData);

                // call for the view to render
                let contentAreaSelector = 'viewContent';
                let productsView = new ProductsView();
                productsView.renderView(contentAreaSelector, data);

                // fill filters list
                this.fillFiltersList(filterOptions['brandList'], filterOptions['categoryList']);

                // save fetched filter options
                ProductsView.allBrandFilterOptions = filterOptions['brandList'];
                ProductsView.allCategoryFilterOptions = filterOptions['categoryList'];
            });
        } else {
            // filters already loaded, fill the list
            let contentAreaSelector = 'viewContent';
            let productsView = new ProductsView();
            productsView.renderView(contentAreaSelector, data);

            // fill filters list
            this.fillFiltersList(ProductsView.allBrandFilterOptions, ProductsView.allCategoryFilterOptions);
        }
    }

    // fill filters list
    fillFiltersList(allBrandFilterOptions, allCategoryFilterOptions) {
        let multiSelectList = document.getElementById('multiselect-list-brand');
        for (let i = 0; i < allBrandFilterOptions.length; i++) {
            let listItemLabel = document.createElement('label');
            listItemLabel.classList.add('multiselect-list-item');
            listItemLabel.style.cursor = 'pointer';
            multiSelectList.appendChild(listItemLabel);
            let listItemCheckbox = document.createElement('input');
            listItemCheckbox.setAttribute('type', 'checkbox');
            listItemCheckbox.setAttribute('name', 'checkmark-brand');
            listItemCheckbox.setAttribute('data-brand-name', allBrandFilterOptions[i]);
            listItemLabel.appendChild(listItemCheckbox);
            listItemLabel.appendChild(document.createTextNode(' ' + allBrandFilterOptions[i]));

            // set it checked if it is
            let brandFilters = ProductsView.brandFilters;
            for (let j = 0; j < brandFilters.length; j++) {
                if (brandFilters[j] === allBrandFilterOptions[i]) {
                    listItemCheckbox.setAttribute('checked', 'true');
                }
            }
        }

        multiSelectList = document.getElementById('multiselect-list-category');
        for (let i = 0; i < allCategoryFilterOptions.length; i++) {
            let listItemLabel = document.createElement('label');
            listItemLabel.classList.add('multiselect-list-item');
            listItemLabel.style.cursor = 'pointer';
            multiSelectList.appendChild(listItemLabel);
            let listItemCheckbox = document.createElement('input');
            listItemCheckbox.setAttribute('type', 'checkbox');
            listItemCheckbox.setAttribute('name', 'checkmark-category');
            listItemCheckbox.setAttribute('data-category-id', allCategoryFilterOptions[i]['id']);
            listItemLabel.appendChild(listItemCheckbox);
            listItemLabel.appendChild(document.createTextNode(' ' + allCategoryFilterOptions[i]['title']));

            // set it checked if it is
            let categoryFilters = ProductsView.categoryFilters;
            for (let j = 0; j < categoryFilters.length; j++) {
                if (parseInt(categoryFilters[j]) === allCategoryFilterOptions[i]['id']) {
                    listItemCheckbox.setAttribute('checked', 'true');
                }
            }
        }
    }

    // fetches page with set parameters, runs every time parameter is updated, adds/updates parameters to url
    getPage(pageNumberToFetch, titleSortOption = 'down', brandSortOption = 'down', categorySortOption = 'down', shortDescSortOption = 'down', priceSortOption = 'down', filterOptions = []) {

        let baseUrl = window.location.href;
        if (baseUrl.includes('?')) {
            baseUrl = window.location.href.substring(0, window.location.href.indexOf('?'));
        }

        let queryParameters = '?'

        // title sort
        if (titleSortOption !== 'down') {
            if (queryParameters === '?') {
                queryParameters += 'titleSort=' + titleSortOption;
            } else {
                queryParameters += '&titleSort=' + titleSortOption;
            }
        }
        // brand sort
        if (brandSortOption !== 'down') {
            if (queryParameters === '?') {
                queryParameters += 'brandSort=' + brandSortOption;
            } else {
                queryParameters += '&brandSort=' + brandSortOption;
            }
        }
        // category sort
        if (categorySortOption !== 'down') {
            if (queryParameters === '?') {
                queryParameters += 'categorySort=' + categorySortOption;
            } else {
                queryParameters += '&categorySort=' + categorySortOption;
            }
        }
        // short description sort
        if (shortDescSortOption !== 'down') {
            if (queryParameters === '?') {
                queryParameters += 'shortDescSort=' + shortDescSortOption;
            } else {
                queryParameters += '&shortDescSort=' + shortDescSortOption;
            }
        }
        // price sort
        if (priceSortOption !== 'down') {
            if (queryParameters === '?') {
                queryParameters += 'priceSort=' + priceSortOption;
            } else {
                queryParameters += '&priceSort=' + priceSortOption;
            }
        }
        // page number
        if (pageNumberToFetch !== 1) {
            if (queryParameters === '?') {
                queryParameters += 'page=' + pageNumberToFetch;
            } else {
                queryParameters += '&page=' + pageNumberToFetch;
            }
        }
        // title filter
        if (filterOptions['title'] !== '') {
            if (queryParameters === '?') {
                queryParameters += 'titleFilter=' + filterOptions['title'];
            } else {
                queryParameters += '&titleFilter=' + filterOptions['title'];
            }
        }
        // sku filter
        if (filterOptions['sku'] !== '') {
            if (queryParameters === '?') {
                queryParameters += 'skuFilter=' + filterOptions['sku'];
            } else {
                queryParameters += '&skuFilter=' + filterOptions['sku'];
            }
        }
        // brand filters
        if (filterOptions['brands'].length !== 0) {
            for (let i = 0; i < filterOptions['brands'].length; i++) {
                if (queryParameters === '?'){
                    queryParameters += 'brandFilter=' + filterOptions['brands'][i];
                } else {
                    queryParameters += '&brandFilter=' + filterOptions['brands'][i];
                }
            }
        }
        // category filters
        if (filterOptions['categories'].length !== 0) {
            for (let i = 0; i < filterOptions['categories'].length; i++) {
                if (queryParameters === '?'){
                    queryParameters += 'categoryFilter=' + filterOptions['categories'][i];
                } else {
                    queryParameters += '&categoryFilter=' + filterOptions['categories'][i];
                }
            }
        }

        let newUrl = baseUrl;
        if (queryParameters !== '?') {
            newUrl += queryParameters;
        }
        window.location.href = newUrl;
    }

    // updates product enabled attribute in the database
    changeProductEnabledStatus(productIds, status) {
        // make a JSON request in order to send data to the backend via JSON
        let data = this.productsService.makeJSONRequest('api/product-change-enabled-status', {
            productIds: productIds,
            setEnabledStatus: status
        });
        data.then(data => {
            data = JSON.parse(data);
            if (data['operationSuccess']) {


            } else {
                alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
            }
        });
    }

    // delete product with the given id
    deleteProduct(productIds) {
        // make a JSON request in order to send data to the backend via JSON
        let data = this.productsService.makeJSONRequest('api/delete-product', {productIds: productIds});
        data.then(data => {
            data = JSON.parse(data);
            if (data['operationSuccess']) {

                // update view
                let totalPageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[1]);
                let currentPageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[0]);
                let tableRows = document.getElementById("product-list-table").rows.length;
                // if there are only two rows in the table, fetch a previous page, else fetch current page again
                // one of the counted table rows is always the header, so we check for 2 rows, the 1 other row being the
                // product which was just deleted
                if (tableRows === 2 && totalPageNumber > 1 && currentPageNumber > 1) {
                    this.getPage(currentPageNumber - 1);
                } else {
                    this.getPage(currentPageNumber);
                }
            } else {
                alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
            }
        });
    }

    // saves product to the database
    saveProduct(operation, id, sku, title, brand, category, price, shortDescription, longDescription, enabled, featured, imageSource, imageChanged) {

        let requestPath = '';
        if (operation === 'add') {
            requestPath = 'api/add-product';
        } else if (operation === 'update') {
            requestPath = 'api/update-product';
        } else {
            alert('Unrecognized product operation!');
            return;
        }

        // make a JSON request in order to send data to the backend via JSON
        let viewData = this.productsService.makeJSONRequest(requestPath,
            {
                productId: id,
                productSKU: sku,
                productTitle: title,
                productBrand: brand,
                productCategory: category,
                productPrice: price,
                productShortDescription: shortDescription,
                productDescription: longDescription,
                productEnabled: enabled,
                productFeatured: featured,
                productImageSource: imageSource,
                productImageChanged: imageChanged
            });

        viewData.then(data => {
            data = JSON.parse(data);

            if (data['operationSuccess']) {
                // when successful, return to products page
                window.location.href = "#products";
            } else {
                alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
            }
        });
    }
}