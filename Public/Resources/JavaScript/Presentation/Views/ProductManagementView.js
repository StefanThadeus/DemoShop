class ProductManagementView {
    static imageChanged = false;

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
        headerTableData.setAttribute('colspan', '2');

        let headerTitle = document.createElement('div');
        headerTitle.setAttribute('id', 'header-title');
        headerTitle.setAttribute('data-context', viewData['context']);
        headerTitle.classList.add('heading-large');
        headerTitle.style.fontSize = '3.5rem';
        headerTitle.appendChild(document.createTextNode(viewData['context']));

        let headerSubtitle = document.createElement('div');
        headerSubtitle.classList.add('heading-small', 'font-color-green', 'align-left');
        headerSubtitle.appendChild(document.createTextNode('Product details:'));

        headerTableData.appendChild(headerTitle);
        headerTableData.appendChild(headerSubtitle);

        contentArea.appendChild(headerTableRow).appendChild(headerTableData);
        //</editor-fold>

        let detailsRow = document.createElement('tr');

        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="Left Menu">

        let leftMenu = document.createElement('td');
        detailsRow.appendChild(leftMenu);

        let menuTable = document.createElement('table');
        menuTable.classList.add('font-simple');
        menuTable.style.marginRight = '30px';
        leftMenu.appendChild(menuTable);

        // SKU ******************************************************
        let tableRow = document.createElement('tr');
        // left side
        let tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        tableData.appendChild(document.createTextNode('SKU:'));
        tableData.classList.add('align-right');
        // right side
        tableData = document.createElement('td');
        let inputElement = document.createElement('input');
        inputElement.classList.add('form-input-area');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('placeholder', 'Product SKU');
        inputElement.setAttribute('id', 'SKU-textBox');
        if (viewData['productSKU']) {
            inputElement.setAttribute('value', viewData['productSKU']);
        }
        tableData.appendChild(inputElement);
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Title ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        tableData.appendChild(document.createTextNode('Title:'));
        tableData.classList.add('align-right');
        tableData.style.paddingTop = '10px';
        // right side
        tableData = document.createElement('td');
        inputElement = document.createElement('input');
        inputElement.classList.add('form-input-area');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('placeholder', 'Product title');
        inputElement.setAttribute('id', 'title-textBox');
        if (viewData['productTitle']) {
            inputElement.setAttribute('value', viewData['productTitle']);
        }
        tableData.appendChild(inputElement);
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Brand ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        tableData.appendChild(document.createTextNode('Brand:'));
        tableData.classList.add('align-right');
        tableData.style.paddingTop = '10px';
        // right side
        tableData = document.createElement('td');
        inputElement = document.createElement('input');
        inputElement.classList.add('form-input-area');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('placeholder', 'Product brand');
        inputElement.setAttribute('id', 'brand-textBox');
        if (viewData['productBrand']) {
            inputElement.setAttribute('value', viewData['productBrand']);
        }
        tableData.appendChild(inputElement);
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Category ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        tableData.appendChild(document.createTextNode('Category:'));
        tableData.classList.add('align-right');
        tableData.style.paddingTop = '10px';
        // right side
        tableData = document.createElement('td');
        let categoryDropdown = document.createElement('select');
        categoryDropdown.setAttribute('id', 'product-management-category-select');
        categoryDropdown.classList.add('form-input-area');
        tableData.appendChild(categoryDropdown);
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Price ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        tableData.appendChild(document.createTextNode('Price:'));
        tableData.classList.add('align-right');
        tableData.style.paddingTop = '10px';
        // right side
        tableData = document.createElement('td');
        inputElement = document.createElement('input');
        inputElement.classList.add('form-input-area');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('placeholder', 'Product price');
        inputElement.setAttribute('id', 'price-textBox');
        if (viewData['productPrice']) {
            inputElement.setAttribute('value', viewData['productPrice']);
        }
        tableData.appendChild(inputElement);
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Short description ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        tableData.appendChild(document.createTextNode('Short description:'));
        tableData.classList.add('align-right');
        tableData.style.paddingTop = '10px';
        tableData.style.verticalAlign = 'top';
        // right side
        tableData = document.createElement('td');
        let descriptionInputField = document.createElement('textarea');
        descriptionInputField.setAttribute('id', 'shortDescription-textBox');
        descriptionInputField.classList.add('form-input-area');
        descriptionInputField.style.resize = 'none';
        descriptionInputField.setAttribute('rows', '5');
        descriptionInputField.style.fontFamily = 'Arial';
        descriptionInputField.setAttribute('placeholder', 'Short product description');
        tableData.appendChild(descriptionInputField);
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Long description ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        tableData.appendChild(document.createTextNode('Long description:'));
        tableData.classList.add('align-right');
        tableData.style.paddingTop = '10px';
        tableData.style.verticalAlign = 'top';
        // right side
        tableData = document.createElement('td');
        descriptionInputField = document.createElement('textarea');
        descriptionInputField.setAttribute('id', 'longDescription-textBox');
        descriptionInputField.classList.add('form-input-area');
        descriptionInputField.style.resize = 'none';
        descriptionInputField.setAttribute('rows', '9');
        descriptionInputField.style.fontFamily = 'Arial';
        descriptionInputField.setAttribute('placeholder', 'Long product description');
        tableData.appendChild(descriptionInputField);
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Enable in shop ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        // right side
        tableData = document.createElement('td');
        let selectedCheckboxLabel = document.createElement('label');
        selectedCheckboxLabel.classList.add('checkmark-container');
        let selectedCheckbox = document.createElement('input');
        selectedCheckbox.setAttribute('type', 'checkbox');
        selectedCheckbox.setAttribute('name', 'checkmark');
        selectedCheckbox.setAttribute('id', 'enabled-checkBox');
        selectedCheckboxLabel.appendChild(selectedCheckbox);
        let checkboxSpan = document.createElement('span');
        checkboxSpan.setAttribute('class', 'checkmark');
        selectedCheckboxLabel.appendChild(checkboxSpan);
        tableData.appendChild(selectedCheckboxLabel);
        let labelText = document.createTextNode('Enabled in shop');
        selectedCheckboxLabel.appendChild(labelText);
        selectedCheckboxLabel.style.paddingTop = '4px';
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        // Featured ******************************************************
        tableRow = document.createElement('tr');
        // left side
        tableData = document.createElement('td');
        tableRow.appendChild(tableData);
        // right side
        tableData = document.createElement('td');
        selectedCheckboxLabel = document.createElement('label');
        selectedCheckboxLabel.classList.add('checkmark-container');
        selectedCheckbox = document.createElement('input');
        selectedCheckbox.setAttribute('type', 'checkbox');
        selectedCheckbox.setAttribute('name', 'checkmark');
        selectedCheckbox.setAttribute('id', 'featured-checkBox');
        selectedCheckboxLabel.appendChild(selectedCheckbox);
        checkboxSpan = document.createElement('span');
        checkboxSpan.setAttribute('class', 'checkmark');
        selectedCheckboxLabel.appendChild(checkboxSpan);
        tableData.appendChild(selectedCheckboxLabel);
        labelText = document.createTextNode('Featured');
        selectedCheckboxLabel.appendChild(labelText);
        selectedCheckboxLabel.style.paddingTop = '4px';
        tableData.style.paddingTop = '10px';
        tableRow.appendChild(tableData);
        menuTable.append(tableRow);

        //</editor-fold>

        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="Right Picture">

        let rightPictureMenu = document.createElement('td');
        rightPictureMenu.style.verticalAlign = 'top';

        let menuPictureTable = document.createElement('table');
        menuPictureTable.classList.add('font-simple');
        rightPictureMenu.appendChild(menuPictureTable);

        // image section
        tableRow = document.createElement('tr');
        tableRow.style.verticalAlign = 'top';
        tableData = document.createElement('td');
        let imageLabel = document.createTextNode('Image:');
        tableData.appendChild(imageLabel);
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        let imageDiv = document.createElement('div');
        imageDiv.classList.add('table-area');
        imageDiv.style.padding = '0';
        imageDiv.style.width = '400px';
        imageDiv.style.height = '300px';
        tableData.appendChild(imageDiv);
        tableRow.appendChild(tableData);
        menuPictureTable.append(tableRow);

        let imageInput = document.createElement('img');
        imageInput.setAttribute('id', 'image');
        imageInput.style.width = '400px';
        imageInput.style.height = '300px';
        imageInput.style.borderRadius = '20px';
        imageInput.setAttribute('src', 'http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif');
        imageDiv.appendChild(imageInput);

        tableRow = document.createElement('tr');
        tableData = document.createElement('td');
        tableData.setAttribute('colspan', '2');
        tableData.appendChild(document.createElement('br'));
        tableData.classList.add('align-right');
        let inputFileLabel = document.createElement('label');
        inputFileLabel.setAttribute('for', 'picture-upload');
        inputFileLabel.setAttribute('class', 'button-special button-special-product-list');
        inputFileLabel.style.marginTop = '20px';
        inputFileLabel.style.fontFamily = 'sans-serif';
        inputFileLabel.innerText = '⬆️  Upload image';
        let inputFileButton = document.createElement('input');
        inputFileButton.setAttribute('id', 'picture-upload');
        inputFileButton.style.marginTop = '10px';
        inputFileButton.setAttribute('type', 'file');

        // event listener for change on loaded image
        inputFileButton.addEventListener("change", function () {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const uploaded_image = reader.result;
                imageInput.style.backgroundImage = `url(${uploaded_image})`;
                document.getElementById('image').src = uploaded_image;
            });
            reader.readAsDataURL(this.files[0]);
            ProductManagementView.imageChanged = true;
        });


        tableData.appendChild(inputFileLabel);
        tableData.appendChild(inputFileButton);
        tableRow.appendChild(tableData);
        menuPictureTable.append(tableRow);

        // save button
        tableRow = document.createElement('tr');
        tableData = document.createElement('td');
        tableData.setAttribute('colspan', '2');
        tableData.classList.add('align-right');
        let button = document.createElement('input');
        button.setAttribute('class', 'button-special button-special-blue button-special-product-list');
        button.setAttribute('type', 'submit');
        button.setAttribute('value', '✔️  Save Product');
        button.setAttribute('name', 'product-save-button');
        button.style.marginTop = '185px';
        button.style.width = '100%';
        button.addEventListener('click', ProductManagementView.saveProduct);

        tableRow.appendChild(tableData);
        tableData.appendChild(button);
        menuPictureTable.append(tableRow);

        // cancel button
        tableRow = document.createElement('tr');
        tableData = document.createElement('td');
        tableData.setAttribute('colspan', '2');
        tableData.classList.add('align-right');
        button = document.createElement('input');
        button.setAttribute('class', 'button-special button-special-gray button-special-product-list');
        button.setAttribute('type', 'submit');
        button.setAttribute('value', '🚫️  Cancel');
        button.setAttribute('name', 'product-cancel-button');
        button.style.marginTop = '20';
        button.style.width = '100%';
        button.addEventListener('click', ProductManagementView.cancel);

        tableRow.appendChild(tableData);
        tableData.appendChild(button);
        menuPictureTable.append(tableRow);

        detailsRow.appendChild(rightPictureMenu);
        rightPictureMenu.appendChild(menuPictureTable);

        //</editor-fold>


        contentArea.appendChild(detailsRow);
    }

    static saveProduct() {
        let sku = document.getElementById('SKU-textBox').value;
        let title = document.getElementById('title-textBox').value;
        let brand = document.getElementById('brand-textBox').value;
        let price = document.getElementById('price-textBox').value;
        let shortDescription = document.getElementById('shortDescription-textBox').value;
        let longDescription = document.getElementById('longDescription-textBox').value
        let enabled = document.getElementById('enabled-checkBox').checked;
        let featured = document.getElementById('featured-checkBox').checked;

        let categoryInput = document.getElementById('product-management-category-select');
        let category = categoryInput.options[categoryInput.selectedIndex].getAttribute('data-category-id');

        let imageSource = document.getElementById('image').src;
        let imageLoaded = false;
        // check if image is default image
        if (imageSource !== 'http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif') {
            imageLoaded = true;
        } else {
            imageSource = '';
        }

        // if image is loaded, prepare variable to check its dimensions
        const imgDimensions = new Image();
        if (imageLoaded) {
            imgDimensions.src = imageSource;
        }

        if (sku === '' || title === '' || brand === '' || price === '' || shortDescription === '' || longDescription === '') {
            alert('Text fields cannot be left empty!');
        } else if (imageLoaded && ((imgDimensions.width / imgDimensions.height < 1.333 || imgDimensions.width / imgDimensions.height > 1.778) || imgDimensions.width < 600)) {
            alert('Image aspect ratio must be between 4:3 and 16:9, with minimal image width being 600px.');
        } else if (isNaN(price)) {
            alert('Price in unacceptable format!');
        } else {
            let controller = new ProductsController();
            let context = document.getElementById('header-title').getAttribute('data-context');
            if (context === 'Create product') {
                controller.saveProduct('add', null, sku, title, brand, category, price, shortDescription, longDescription, enabled, featured, imageSource, ProductManagementView.imageChanged);
            } else {
                let id = document.getElementById('header-title').getAttribute('data-product-id');
                controller.saveProduct('update', id, sku, title, brand, category, price, shortDescription, longDescription, enabled, featured, imageSource, ProductManagementView.imageChanged);
            }
        }
    }

    static cancel() {
        window.location.href = '#products';
    }
}