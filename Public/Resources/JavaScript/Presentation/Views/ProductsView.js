class ProductsView {
    // all sorting is in descending order at start
    static titleSort = 'down';
    static brandSort = 'down';
    static categorySort = 'down';
    static shortDescriptionSort = 'down';
    static priceSort = 'down';

    // for event listeners to not take effect, but just do the animation
    static batchAction = false;

    // brand and category filters are empty at start
    static brandFilters = [];
    static categoryFilters = [];

    // title and sku filter inputs
    static titleFilter = '';
    static skuFilter = '';

    // lists of all brand and category options are empty at start
    static allBrandFilterOptions = [];
    static allCategoryFilterOptions = [];

    constructor() {
    }

    renderView(contentAreaSelectorID, viewData) {

        // set active element in side menu
        document.getElementById('nav-menu-dashboard').classList.remove('font-color-green', 'sidenav-item-selected');
        document.getElementById('nav-menu-products').classList.add('font-color-green', 'sidenav-item-selected');
        document.getElementById('nav-menu-product-categories').classList.remove('font-color-green', 'sidenav-item-selected');

        // set a variable to represent the content area for ease of use
        let contentArea = document.getElementById(contentAreaSelectorID);

        // empty previous content from the area
        contentArea.innerHTML = '';

        // adjust container height
        contentArea.classList.remove('background-container-categories');
        contentArea.classList.add('background-container-products');

        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="header section">

        let headerTableRow = document.createElement('tr');
        let headerTableData = document.createElement('td');

        let headerTitle = document.createElement('div');
        headerTitle.classList.add('heading-large');
        headerTitle.style.fontSize = '3.5rem';
        headerTitle.appendChild(document.createTextNode('Products'));

        headerTableData.appendChild(headerTitle);

        contentArea.appendChild(headerTableRow).appendChild(headerTableData);
        //</editor-fold>

        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="management buttons">

        let managementButtonsTableRow = document.createElement('tr');
        let managementButtonsTableData = document.createElement('td');

        let newProductButton = document.createElement('input');
        newProductButton.setAttribute('id', 'add-product-button');
        newProductButton.setAttribute('class', 'button-special button-special-functional');
        newProductButton.setAttribute('type', 'submit');
        newProductButton.setAttribute('value', '➕  Add New Product');
        newProductButton.addEventListener('click', ProductsView.createProduct);
        newProductButton.style.cssFloat = 'left';
        newProductButton.style.marginTop = '15px';

        let deleteSelectedButton = document.createElement('input');
        deleteSelectedButton.setAttribute('id', 'delete-selected-button');
        deleteSelectedButton.setAttribute('class', 'button-special button-special-red button-special-functional');
        deleteSelectedButton.setAttribute('type', 'submit');
        deleteSelectedButton.setAttribute('value', '✖️  Delete Selected');
        deleteSelectedButton.style.cssFloat = 'left';
        deleteSelectedButton.style.marginTop = '15px';
        deleteSelectedButton.style.marginLeft = '10px';
        deleteSelectedButton.addEventListener('click', ProductsView.deleteSelected);

        let enableSelectedButton = document.createElement('input');
        enableSelectedButton.setAttribute('id', 'enable-selected-button');
        enableSelectedButton.setAttribute('class', 'button-special button-special-functional');
        enableSelectedButton.setAttribute('type', 'submit');
        enableSelectedButton.setAttribute('value', '✔️ Enable Selected');
        enableSelectedButton.style.cssFloat = 'left';
        enableSelectedButton.style.marginTop = '15px';
        enableSelectedButton.style.marginLeft = '10px';
        enableSelectedButton.addEventListener('click', ProductsView.enableSelected);

        let disableSelectedButton = document.createElement('input');
        disableSelectedButton.setAttribute('id', 'enable-selected-button');
        disableSelectedButton.setAttribute('class', 'button-special button-special-gray button-special-functional');
        disableSelectedButton.setAttribute('type', 'submit');
        disableSelectedButton.setAttribute('value', '🚫  Disable Selected');
        disableSelectedButton.style.cssFloat = 'left';
        disableSelectedButton.style.marginTop = '15px';
        disableSelectedButton.style.marginLeft = '10px';
        disableSelectedButton.addEventListener('click', ProductsView.disableSelected);

        let clearSelectionButton = document.createElement('input');
        clearSelectionButton.setAttribute('id', 'clear-selection-button');
        clearSelectionButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
        clearSelectionButton.setAttribute('type', 'submit');
        clearSelectionButton.setAttribute('value', '🔲  Clear Selection');
        clearSelectionButton.style.cssFloat = 'right';
        clearSelectionButton.style.marginTop = '15px';
        clearSelectionButton.style.marginLeft = '175px';
        clearSelectionButton.addEventListener('click', ProductsView.clearSelection);

        // append all buttons
        managementButtonsTableData.appendChild(newProductButton);
        managementButtonsTableData.appendChild(deleteSelectedButton);
        managementButtonsTableData.appendChild(enableSelectedButton);
        managementButtonsTableData.appendChild(disableSelectedButton);
        managementButtonsTableData.appendChild(clearSelectionButton);
        // add row
        contentArea.appendChild(managementButtonsTableRow).appendChild(managementButtonsTableData);


        // filter section
        let filterTableRow = document.createElement('tr');
        let filterTableData = document.createElement('td');

        //brand list
        let multiSelect = document.createElement('div');
        multiSelect.classList.add('multi-selector');
        multiSelect.style.display = 'inline-block'
        multiSelect.style.float = 'left';
        multiSelect.style.cursor = 'pointer';
        multiSelect.style.marginTop = '17px';
        multiSelect.style.marginBottom = '20px';

        let multiSelectHeader = document.createElement('div');
        multiSelectHeader.classList.add('select-field');
        multiSelectHeader.style.padding = '13px 0.3rem'
        multiSelectHeader.addEventListener('click', () => {
            document.querySelector('.multiselect-list-brand').classList.toggle('show');
            document.querySelector('.down-arrow-brand').classList.toggle('rotate180');
        })
        multiSelectHeader.innerHTML = 'FILTER BY BRAND &nbsp;';
        let multiSelectArrow = document.createElement('span');
        multiSelectArrow.classList.add('down-arrow', 'down-arrow-brand');
        multiSelectArrow.innerHTML = '&blacktriangledown;';
        multiSelectHeader.appendChild(multiSelectArrow);
        multiSelect.appendChild(multiSelectHeader);

        // list section
        let multiSelectList = document.createElement('div');
        multiSelectList.setAttribute('id', 'multiselect-list-brand');
        multiSelectList.classList.add('multiselect-list', 'multiselect', 'multiselect-list-brand');
        multiSelectList.classList.add('font-simple');
        multiSelectList.style.overflowY = 'scroll';
        multiSelectList.style.height = '500px';
        multiSelectList.style.letterSpacing = '0';
        multiSelectList.style.fontSize = '18px';
        multiSelectList.style.position = 'relative';
        multiSelectList.style.zIndex = '1';
        multiSelect.appendChild(multiSelectList);

        filterTableData.appendChild(multiSelect);

        //category list
        multiSelect = document.createElement('div');
        multiSelect.classList.add('multi-selector');
        multiSelect.style.display = 'inline-block'
        multiSelect.style.float = 'left';
        multiSelect.style.marginLeft = '20px';
        multiSelect.style.cursor = 'pointer';
        multiSelect.style.marginTop = '17px';
        multiSelect.style.marginBottom = '20px';

        multiSelectHeader = document.createElement('div');
        multiSelectHeader.classList.add('select-field');
        multiSelectHeader.style.padding = '13px 0.3rem'
        multiSelectHeader.addEventListener('click', () => {
            document.querySelector('.multiselect-list-category').classList.toggle('show');
            document.querySelector('.down-arrow-category').classList.toggle('rotate180');
        })
        multiSelectHeader.innerHTML = 'FILTER BY CATEGORY &nbsp;';
        multiSelectArrow = document.createElement('span');
        multiSelectArrow.classList.add('down-arrow', 'down-arrow-category');
        multiSelectArrow.innerHTML = '&blacktriangledown;';
        multiSelectHeader.appendChild(multiSelectArrow);
        multiSelect.appendChild(multiSelectHeader);

        // list section
        multiSelectList = document.createElement('div');
        multiSelectList.setAttribute('id', 'multiselect-list-category');
        multiSelectList.classList.add('multiselect-list', 'multiselect', 'multiselect-list-category');
        multiSelectList.style.overflowY = 'scroll';
        multiSelectList.style.height = '500px';
        multiSelectList.classList.add('font-simple');
        multiSelectList.style.letterSpacing = '0';
        multiSelectList.style.fontSize = '18px';
        multiSelectList.style.position = 'relative';
        multiSelectList.style.zIndex = '1';
        multiSelect.appendChild(multiSelectList);

        filterTableData.appendChild(multiSelect);

        // filter by title input
        let inputElement = document.createElement('div');
        inputElement.classList.add('full-input');
        inputElement.style.fontFamily = 'sans-serif';
        inputElement.style.textAlign = 'left';
        inputElement.style.float = 'left';
        inputElement.style.marginLeft = '20px';
        inputElement.style.marginTop = '15px';
        filterTableData.appendChild(inputElement);
        let inputLabel = document.createElement('label');
        inputLabel.classList.add('input-label');
        inputLabel.innerText = 'Filter by title';
        inputElement.appendChild(inputLabel);
        let inputHidden = document.createElement('input');
        inputHidden.classList.add('inset-input', 'inset-input-title');
        inputHidden.setAttribute('type', 'text');
        inputHidden.setAttribute('id', 'filter-title');
        inputHidden.value = ProductsView.titleFilter;
        inputElement.appendChild(inputHidden);

        // filter by sku input
        inputElement = document.createElement('div');
        inputElement.classList.add('full-input');
        inputElement.style.fontFamily = 'sans-serif';
        inputElement.style.textAlign = 'left';
        inputElement.style.float = 'left';
        inputElement.style.marginLeft = '10px';
        inputElement.style.marginTop = '15px';
        filterTableData.appendChild(inputElement);
        inputLabel = document.createElement('label');
        inputLabel.classList.add('input-label');
        inputLabel.innerText = 'Filter by SKU';
        inputElement.appendChild(inputLabel);
        inputHidden = document.createElement('input');
        inputHidden.setAttribute('id', 'filter-sku');
        inputHidden.classList.add('inset-input', 'inset-input-sku');
        inputHidden.setAttribute('type', 'text');
        inputHidden.value = ProductsView.skuFilter;
        inputElement.appendChild(inputHidden);


        // filter button
        let filterButton = document.createElement('input');
        filterButton.setAttribute('id', 'filter-button');
        filterButton.setAttribute('class', 'button-special button-special-functional');
        filterButton.setAttribute('type', 'submit');
        filterButton.setAttribute('value', '🔍  Apply Filters');
        filterButton.style.marginTop = '20px';
        filterButton.style.width = '209px';
        filterButton.style.display = 'inline-block';
        filterButton.style.float = 'right';
        filterButton.addEventListener('click', ProductsView.applyFilters);
        filterTableData.appendChild(filterButton);
        // add row
        contentArea.appendChild(filterTableRow).appendChild(filterTableData);


        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="product table">
        let productTableRow = document.createElement('tr');
        let productTableData = document.createElement('td');

        let tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-area', 'font-simple');
        tableWrapper.style.zIndex = '0';
        tableWrapper.style.position = 'relative';
        tableWrapper.style.marginTop = '20px';
        tableWrapper.style.minHeight = '385px';
        productTableData.appendChild(tableWrapper);

        // table which will be inside this row
        let productListTable = document.createElement('table');
        productListTable.setAttribute('id', 'product-list-table');
        productListTable.classList.add('product-list', 'align-left');
        productListTable.style.width = '100%';
        tableWrapper.appendChild(productListTable);

        let productListTableRow = document.createElement('tr');
        productListTable.appendChild(productListTableRow);

        //<editor-fold desc="head row">
        // head row
        let productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'Selected';
        productListTableRow.appendChild(productListTableHead);

        // Title
        productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'Title &nbsp;&nbsp;';
        let sortSpan = document.createElement('span');
        if (ProductsView.titleSort === 'down') {
            sortSpan.innerText = '⬇️';
        } else {
            sortSpan.innerText = '⬆️';
        }
        sortSpan.setAttribute('id', 'title-sort');
        sortSpan.style.cursor = 'pointer';
        sortSpan.addEventListener('click', ProductsView.titleSortFunction)
        productListTableHead.appendChild(sortSpan);
        productListTableRow.appendChild(productListTableHead);

        productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'SKU';
        productListTableRow.appendChild(productListTableHead);

        productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'Brand &nbsp;&nbsp;';
        sortSpan = document.createElement('span');
        if (ProductsView.brandSort === 'down') {
            sortSpan.innerText = '⬇️';
        } else {
            sortSpan.innerText = '⬆️';
        }
        sortSpan.setAttribute('id', 'brand-sort');
        sortSpan.style.cursor = 'pointer';
        sortSpan.addEventListener('click', ProductsView.brandSortFunction)
        productListTableHead.appendChild(sortSpan);
        productListTableRow.appendChild(productListTableHead);

        productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'Category &nbsp;&nbsp;';
        sortSpan = document.createElement('span');
        if (ProductsView.categorySort === 'down') {
            sortSpan.innerText = '⬇️';
        } else {
            sortSpan.innerText = '⬆️';
        }
        sortSpan.setAttribute('id', 'category-sort');
        sortSpan.style.cursor = 'pointer';
        sortSpan.addEventListener('click', ProductsView.categorySortFunction)
        productListTableHead.appendChild(sortSpan);
        productListTableRow.appendChild(productListTableHead);

        productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'Short description &nbsp;&nbsp;';
        sortSpan = document.createElement('span');
        if (ProductsView.shortDescriptionSort === 'down') {
            sortSpan.innerText = '⬇️';
        } else {
            sortSpan.innerText = '⬆️';
        }
        sortSpan.setAttribute('id', 'short-description-sort');
        sortSpan.style.cursor = 'pointer';
        sortSpan.addEventListener('click', ProductsView.shortDescriptionSortFunction)
        productListTableHead.appendChild(sortSpan);
        productListTableRow.appendChild(productListTableHead);

        productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'Price &nbsp;&nbsp;';
        sortSpan = document.createElement('span');
        if (ProductsView.priceSort === 'down') {
            sortSpan.innerText = '⬇️';
        } else {
            sortSpan.innerText = '⬆️';
        }
        sortSpan.setAttribute('id', 'price-sort');
        sortSpan.style.cursor = 'pointer';
        sortSpan.addEventListener('click', ProductsView.priceSortFunction)
        productListTableHead.appendChild(sortSpan);
        productListTableRow.appendChild(productListTableHead);

        productListTableHead = document.createElement('th');
        productListTableHead.innerHTML = 'Enable';
        productListTableRow.appendChild(productListTableHead);

        productListTableRow.classList.add('head-border-bottom');
        //</editor-fold>

        // product list rows
        for (let i = 0; i < viewData['productList'].length; i++) {

            let productListProductRow = document.createElement('tr');
            productListProductRow.classList.add('table-area-row', 'table-row-highlight');
            productListProductRow.style.padding = '20 0px';
            productListTable.appendChild(productListProductRow);

            // selected
            let productListProductData = document.createElement('td');
            productListProductData.classList.add('align-center');
            let selectedCheckboxLabel = document.createElement('label');
            selectedCheckboxLabel.classList.add('checkmark-container');
            let selectedCheckbox = document.createElement('input');
            selectedCheckbox.setAttribute('type', 'checkbox');
            selectedCheckbox.setAttribute('name', 'checkmark');
            selectedCheckbox.setAttribute('data-product-id', viewData['productList'][i]['id']);
            selectedCheckboxLabel.appendChild(selectedCheckbox);
            let checkboxSpan = document.createElement('span');
            checkboxSpan.setAttribute('class', 'checkmark');
            checkboxSpan.style.margin = '-6 25px';
            selectedCheckboxLabel.appendChild(checkboxSpan);
            productListProductData.appendChild(selectedCheckboxLabel);
            productListProductRow.appendChild(productListProductData);

            // title
            productListProductData = document.createElement('td');
            productListProductData.setAttribute('id', 'product-title-id-' + viewData['productList'][i]['id']);
            productListProductData.innerText = viewData['productList'][i]['title'];
            productListProductRow.appendChild(productListProductData);

            // SKU
            productListProductData = document.createElement('td');
            productListProductData.setAttribute('id', 'sku-id-' + viewData['productList'][i]['id']);
            productListProductData.innerText = viewData['productList'][i]['sku'];
            productListProductRow.appendChild(productListProductData);

            // Brand
            productListProductData = document.createElement('td');
            productListProductData.innerText = viewData['productList'][i]['brand'];
            productListProductRow.appendChild(productListProductData);

            // Category
            productListProductData = document.createElement('td');
            productListProductData.innerText = viewData['productList'][i]['category'];
            productListProductRow.appendChild(productListProductData);

            // Short description
            productListProductData = document.createElement('td');
            productListProductData.innerText = viewData['productList'][i]['shortDescription'];
            productListProductRow.appendChild(productListProductData);

            // Price
            productListProductData = document.createElement('td');
            productListProductData.innerText = viewData['productList'][i]['price'] + '$';
            productListProductRow.appendChild(productListProductData);

            // enable
            productListProductData = document.createElement('td');
            productListProductData.classList.add('align-center');
            selectedCheckboxLabel = document.createElement('label');
            selectedCheckboxLabel.classList.add('switch-container');
            selectedCheckbox = document.createElement('input');
            selectedCheckbox.setAttribute('type', 'checkbox');
            selectedCheckbox.setAttribute('name', 'enable-switch');
            selectedCheckbox.setAttribute('data-product-id', viewData['productList'][i]['id']);
            selectedCheckbox.addEventListener('change', ProductsView.enableProduct);
            if (viewData['productList'][i]['enabled']) {
                selectedCheckbox.setAttribute('checked', 'checked');
            }
            selectedCheckboxLabel.appendChild(selectedCheckbox);
            checkboxSpan = document.createElement('span');
            checkboxSpan.setAttribute('class', 'slider');

            selectedCheckboxLabel.appendChild(checkboxSpan);
            productListProductData.appendChild(selectedCheckboxLabel);
            productListProductRow.appendChild(productListProductData);


            // edit button
            let button = document.createElement('input');
            button.setAttribute('class', 'button-special button-special-blue button-special-product-list');
            button.setAttribute('type', 'submit');
            button.setAttribute('value', '✏️  Edit');
            button.setAttribute('data-product-id', viewData['productList'][i]['id']);
            button.addEventListener('click', ProductsView.editProduct);

            productListProductData = document.createElement('td');
            productListProductData.classList.add('align-center');
            productListProductData.appendChild(button);
            productListProductRow.appendChild(productListProductData);

            // delete button
            button = document.createElement('input');
            button.setAttribute('class', 'button-special button-special-red button-special-product-list');
            button.setAttribute('type', 'submit');
            button.setAttribute('value', '🗑️ Delete');
            button.setAttribute('name', 'product-delete-button');
            button.setAttribute('data-product-id', viewData['productList'][i]['id']);
            button.addEventListener('click', ProductsView.deleteProduct);

            productListProductData = document.createElement('td');
            productListProductData.classList.add('align-center');
            productListProductData.appendChild(button);
            productListProductRow.appendChild(productListProductData);
        }


        contentArea.appendChild(productTableRow).appendChild(productTableData);
        //</editor-fold>


        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="scroll buttons">
        let scrollButtonsTableRow = document.createElement('tr');
        let scrollButtonsTableData = document.createElement('td');

        let farLeftButton = document.createElement('input');
        farLeftButton.setAttribute('id', 'far-left-button');
        farLeftButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
        farLeftButton.setAttribute('type', 'submit');
        farLeftButton.setAttribute('value', '<<');
        farLeftButton.style.marginTop = '30px';
        farLeftButton.addEventListener('click', ProductsView.firstPage);

        let leftButton = document.createElement('input');
        leftButton.setAttribute('id', 'far-left-button');
        leftButton.setAttribute('class', 'button-special button-special-functional');
        leftButton.setAttribute('type', 'submit');
        leftButton.setAttribute('value', ' < ');
        leftButton.style.marginTop = '30px';
        leftButton.style.marginLeft = '10px';
        leftButton.addEventListener('click', ProductsView.previousPage);

        let farRightButton = document.createElement('input');
        farRightButton.setAttribute('id', 'far-left-button');
        farRightButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
        farRightButton.setAttribute('type', 'submit');
        farRightButton.setAttribute('value', '>>');
        farRightButton.style.marginTop = '30px';
        farRightButton.style.marginLeft = '10px';
        farRightButton.addEventListener('click', ProductsView.lastPage);

        let rightButton = document.createElement('input');
        rightButton.setAttribute('id', 'far-left-button');
        rightButton.setAttribute('class', 'button-special button-special-functional');
        rightButton.setAttribute('type', 'submit');
        rightButton.setAttribute('value', ' > ');
        rightButton.style.marginTop = '30px';
        rightButton.style.marginLeft = '10px';
        rightButton.addEventListener('click', ProductsView.nextPage);

        let pageNumberDiv = document.createElement('span');
        pageNumberDiv.setAttribute('id', 'page-number');
        pageNumberDiv.classList.add('table-area-row', 'font-simple');
        pageNumberDiv.style.marginLeft = '10px';
        pageNumberDiv.style.marginTop = '30px';
        pageNumberDiv.style.padding = '20px 30px';
        pageNumberDiv.innerHTML = viewData['currentPage'] + '/' + viewData['amountOfPages'];

        // append all elements
        scrollButtonsTableData.appendChild(farLeftButton);
        scrollButtonsTableData.appendChild(leftButton);
        scrollButtonsTableData.appendChild(pageNumberDiv);
        scrollButtonsTableData.appendChild(rightButton);
        scrollButtonsTableData.appendChild(farRightButton);

        // add row
        contentArea.appendChild(scrollButtonsTableRow).appendChild(scrollButtonsTableData);

        //</editor-fold>
    }

    // static event listeners
    static applyFilters() {
        let filters = ProductsView.getFilters();

        let controller = new ProductsController();
        controller.getPage(1, ProductsView.titleSort, ProductsView.brandSort, ProductsView.categorySort, ProductsView.shortDescriptionSort, ProductsView.priceSort, filters);
    }

    static nextPage() {
        let filters = ProductsView.getFilters();
        let pageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[0]);
        let totalPageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[1]);

        if (pageNumber < totalPageNumber) {
            let controller = new ProductsController();
            controller.getPage(pageNumber + 1, ProductsView.titleSort, ProductsView.brandSort, ProductsView.categorySort, ProductsView.shortDescriptionSort, ProductsView.priceSort, filters);
        }
    }

    static previousPage() {
        let filters = ProductsView.getFilters();
        let pageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[0]);

        if (pageNumber > 1) {
            let controller = new ProductsController();
            controller.getPage(pageNumber - 1, ProductsView.titleSort, ProductsView.brandSort, ProductsView.categorySort, ProductsView.shortDescriptionSort, ProductsView.priceSort, filters);
        }
    }

    static firstPage() {
        let filters = ProductsView.getFilters();
        let pageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[0]);

        if (pageNumber !== 1) {
            let controller = new ProductsController();
            controller.getPage(1, ProductsView.titleSort, ProductsView.brandSort, ProductsView.categorySort, ProductsView.shortDescriptionSort, ProductsView.priceSort, filters);
        }
    }

    static lastPage() {
        let filters = ProductsView.getFilters();
        let pageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[0]);
        let totalPageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[1]);

        if (pageNumber !== totalPageNumber) {
            let controller = new ProductsController();
            controller.getPage(totalPageNumber, ProductsView.titleSort, ProductsView.brandSort, ProductsView.categorySort, ProductsView.shortDescriptionSort, ProductsView.priceSort, filters);
        }
    }

    static reloadCurrentPage() {
        let filters = ProductsView.getFilters();
        let pageNumber = parseInt(document.getElementById('page-number').innerText.split('/')[0]);
        let controller = new ProductsController();
        controller.getPage(pageNumber, ProductsView.titleSort, ProductsView.brandSort, ProductsView.categorySort, ProductsView.shortDescriptionSort, ProductsView.priceSort, filters);
    }

    static enableSelected() {
        let allCheckboxes = document.getElementsByName('checkmark');
        let allSwitches = document.getElementsByName('enable-switch');

        let batchEnableList = [];
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                let productId = allCheckboxes[i].getAttribute('data-product-id');
                batchEnableList.push(productId);

                // disable event listeners for checkboxes from taking effect, just do the enabling animation
                ProductsView.batchAction = true;
                for (let j = 0; j < allSwitches.length; j++) {
                    if (allSwitches[j].getAttribute('data-product-id') === productId && allSwitches[j].checked === false) {
                        allSwitches[j].click();
                    }
                }
                ProductsView.batchAction = false;
            }
        }

        let controller = new ProductsController();
        controller.changeProductEnabledStatus(batchEnableList, true);
    }

    static disableSelected() {
        let allCheckboxes = document.getElementsByName('checkmark');
        let allSwitches = document.getElementsByName('enable-switch');

        let batchDisableList = [];
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                let productId = allCheckboxes[i].getAttribute('data-product-id');
                batchDisableList.push(productId);

                // disable event listeners for checkboxes from taking effect, just do the disabling animation
                ProductsView.batchAction = true;
                for (let j = 0; j < allSwitches.length; j++) {
                    if (allSwitches[j].getAttribute('data-product-id') === productId && allSwitches[j].checked === true) {
                        allSwitches[j].click();
                    }
                }
                ProductsView.batchAction = false;
            }
        }

        let controller = new ProductsController();
        controller.changeProductEnabledStatus(batchDisableList, false);
    }

    static deleteSelected() {
        let allCheckboxes = document.getElementsByName('checkmark');

        let batchDeleteList = [];
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                let productId = allCheckboxes[i].getAttribute('data-product-id');
                batchDeleteList.push(productId);
            }
        }

        if (confirm("Are you sure you want to delete selected products?")) {
            let controller = new ProductsController();
            controller.deleteProduct(batchDeleteList);
        }
    }

    static deleteProduct(event) {
        let productId = event.target.getAttribute('data-product-id');
        let productTitle = document.getElementById('product-title-id-' + productId).innerText;
        if (confirm("Are you sure you want to delete product \'" + productTitle + '\'?')) {
            let controller = new ProductsController();
            controller.deleteProduct(productId);
        }
    }

    static editProduct(event) {
        let productId = event.target.getAttribute('data-product-id');
        let productSKU = document.getElementById('sku-id-' + productId).innerText;
        location.href = '#products/' + productSKU;
    }

    static enableProduct(event) {
        if (ProductsView.batchAction === false){
            let productId = event.target.getAttribute('data-product-id');
            // at this moment, checkbox is already set to the value that needs to be passed to database
            let setStatus = event.target.checked;

            let controller = new ProductsController();
            controller.changeProductEnabledStatus(productId, setStatus);
        }
    }

    static clearSelection() {
        let allCheckboxes = document.getElementsByName('checkmark');
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                allCheckboxes[i].checked = false;
            }
        }

        ProductsView.titleSort = 'down';
        ProductsView.brandSort = 'down';
        ProductsView.categorySort = 'down';
        ProductsView.shortDescriptionSort = 'down';
        ProductsView.priceSort = 'down';
        ProductsView.brandFilters = [];
        ProductsView.categoryFilters = [];
        ProductsView.titleFilter = '';
        ProductsView.skuFilter = '';

        let baseUrl = window.location.href;
        if (baseUrl.includes('?')) {
            baseUrl = window.location.href.substring(0, window.location.href.indexOf('?'));
        }
        window.location.href = baseUrl;
    }

    static createProduct() {
        location.href = '#products/create';
    }

    static titleSortFunction() {
        let arrowElement = document.getElementById('title-sort');

        if (ProductsView.titleSort === 'down') {
            arrowElement.innerText = '⬆️';
            ProductsView.titleSort = 'up';
            ProductsView.reloadCurrentPage();
        } else {
            arrowElement.innerText = '⬇️';
            ProductsView.titleSort = 'down';
            ProductsView.reloadCurrentPage();
        }
    }

    static brandSortFunction() {
        let arrowElement = document.getElementById('brand-sort');

        if (ProductsView.brandSort === 'down') {
            arrowElement.innerText = '⬆️';
            ProductsView.brandSort = 'up';
            ProductsView.reloadCurrentPage();
        } else {
            arrowElement.innerText = '⬇️';
            ProductsView.brandSort = 'down';
            ProductsView.reloadCurrentPage();
        }
    }

    static categorySortFunction() {
        let arrowElement = document.getElementById('category-sort');

        if (ProductsView.categorySort === 'down') {
            arrowElement.innerText = '⬆️';
            ProductsView.categorySort = 'up';
            ProductsView.reloadCurrentPage();
        } else {
            arrowElement.innerText = '⬇️';
            ProductsView.categorySort = 'down';
            ProductsView.reloadCurrentPage();
        }
    }

    static shortDescriptionSortFunction() {
        let arrowElement = document.getElementById('short-description-sort');

        if (ProductsView.shortDescriptionSort === 'down') {
            arrowElement.innerText = '⬆️';
            ProductsView.shortDescriptionSort = 'up';
            ProductsView.reloadCurrentPage();
        } else {
            arrowElement.innerText = '⬇️';
            ProductsView.shortDescriptionSort = 'down';
            ProductsView.reloadCurrentPage();
        }
    }

    static priceSortFunction() {
        let arrowElement = document.getElementById('price-sort');

        if (ProductsView.priceSort === 'down') {
            arrowElement.innerText = '⬆️';
            ProductsView.priceSort = 'up';
            ProductsView.reloadCurrentPage();
        } else {
            arrowElement.innerText = '⬇️';
            ProductsView.priceSort = 'down';
            ProductsView.reloadCurrentPage();
        }
    }

    static getFilters() {
        let filters = [];
        filters['title'] = document.getElementById('filter-title').value;
        filters['sku'] = document.getElementById('filter-sku').value;

        // get all selected checkboxes for brand
        let allCheckboxesBrand = document.getElementsByName('checkmark-brand');
        filters['brands'] = [];
        for (let i = 0; i < allCheckboxesBrand.length; i++) {
            if (allCheckboxesBrand[i].checked === true) {
                filters['brands'].push(allCheckboxesBrand[i].getAttribute('data-brand-name'));
            }
        }

        // get all selected checkboxes for brand
        let allCheckboxesCategory = document.getElementsByName('checkmark-category');
        filters['categories'] = [];
        for (let i = 0; i < allCheckboxesCategory.length; i++) {
            if (allCheckboxesCategory[i].checked === true) {
                filters['categories'].push(allCheckboxesCategory[i].getAttribute('data-category-id'));
            }
        }

        // save parameters to be active on page reload
        ProductsView.titleFilter = filters['title'];
        ProductsView.skuFilter = filters['sku'];
        ProductsView.brandFilters = filters['brands'];
        ProductsView.categoryFilters = filters['categories'];

        return filters;
    }
}