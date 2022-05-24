class ProductsCategoriesView {
    constructor() {
    }

    // event function for root categories being clicked, make a method call to controller
    selectTreeItem(event) {
        let treeViewArea = document.getElementById('tree-view-area');
        // if tree view area is disabled, do nothing
        if (treeViewArea.getAttribute('data-enabled') === 'false') {
            return;
        }

        let controller = new ProductCategoriesController();
        controller.selectTreeItem(event);
    }

    // event function for root categories being expanded, make a method call to controller
    expandTreeItem(event) {
        let treeViewArea = document.getElementById('tree-view-area');
        // if tree view area is disabled, do nothing
        if (treeViewArea.getAttribute('data-enabled') === 'false') {
            return;
        }

        let controller = new ProductCategoriesController();
        controller.getChildCategoryList(event.target.id);
    }

    // event function for adding root category button being clicked
    addRootCategory() {
        // disable tree view area
        let treeViewArea = document.getElementById('tree-view-area');
        treeViewArea.style.opacity = '50%';
        treeViewArea.setAttribute('data-enabled', 'false');

        // disable highlight of tree view item
        if (document.getElementsByClassName('selected')[0] != null) {
            document.getElementsByClassName('selected')[0].classList.remove('font-color-green', 'selected');
        }

        // change context label
        let contextLabel = document.getElementById('context-menu-label');
        contextLabel.innerText = 'Create root category:';

        // disable 'add root category' and 'add subcategory' buttons
        let disableAddRootButton = document.getElementById('add-root-category-button');
        disableAddRootButton.style.opacity = '50%';
        disableAddRootButton.classList.add('noHoverEffect');
        disableAddRootButton.setAttribute('data-enabled', 'false');
        let disableAddSubButton = document.getElementById('add-subcategory-button');
        disableAddSubButton.style.opacity = '50%';
        disableAddSubButton.classList.add('noHoverEffect');
        disableAddSubButton.setAttribute('data-enabled', 'false');

        // clear all input values and make them writable
        let titleInput = document.getElementById('category-management-title-input');
        titleInput.value = '';
        titleInput.removeAttribute('readonly');

        let codeInput = document.getElementById('category-management-code-input');
        codeInput.value = '';
        codeInput.removeAttribute('readonly');

        let descriptionInput = document.getElementById('category-management-description-input');
        descriptionInput.value = '';
        descriptionInput.removeAttribute('readonly');

        let parentInput = document.getElementById('category-management-parent-input');
        parentInput.innerText = 'No parent';

        // remove 'delete' and 'edit' buttons
        let removeButton = document.getElementById('delete-button');
        removeButton.remove();
        removeButton = document.getElementById('edit-button');
        removeButton.remove();

        // add 'cancel' and 'save' buttons
        let buttonArea = document.getElementById('context-button-menu');

        let cancelButton = document.createElement('input');
        cancelButton.setAttribute('class', 'button-special button-special-gray button-special-functional');
        cancelButton.setAttribute('type', 'button');
        cancelButton.setAttribute('value', '🚫  Cancel');
        cancelButton.style.cssFloat = 'left';
        cancelButton.style.marginTop = '25px';
        cancelButton.addEventListener('click', function () {
            treeViewArea.style.opacity = '100%';
            treeViewArea.removeAttribute('data-enabled');

            disableAddRootButton.style.opacity = '100%';
            disableAddRootButton.classList.remove('noHoverEffect');

            disableAddSubButton.style.opacity = '100%';
            disableAddSubButton.classList.remove('noHoverEffect');

            cancelButton.remove();
            saveButton.remove();

            // change back the context label
            contextLabel.innerText = 'Selected category:';

            // clear all inputs
            titleInput.value = '';
            titleInput.setAttribute('readonly', 'true');
            codeInput.value = '';
            codeInput.setAttribute('readonly', 'true');
            descriptionInput.value = '';
            descriptionInput.setAttribute('readonly', 'true');
            parentInput.innerText = 'Parent category title';

            // add back the 'delete' and 'edit' buttons
            let deleteButton = document.createElement('input');
            deleteButton.setAttribute('id', 'delete-button');
            deleteButton.setAttribute('class', 'button-special button-special-red button-special-functional');
            deleteButton.setAttribute('type', 'submit');
            deleteButton.setAttribute('value', '✖️  Delete');
            deleteButton.style.cssFloat = 'left';
            deleteButton.style.marginTop = '25px';

            let editButton = document.createElement('input');
            editButton.setAttribute('id', 'edit-button');
            editButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
            editButton.setAttribute('type', 'submit');
            editButton.setAttribute('value', '✏️  Edit');
            editButton.style.cssFloat = 'right';
            editButton.style.marginTop = '25px';

            deleteButton.addEventListener('click', ProductsCategoriesView.deleteCategory);
            editButton.addEventListener('click', ProductsCategoriesView.editCategory);
            buttonArea.appendChild(deleteButton);
            buttonArea.appendChild(editButton);
        });

        let saveButton = document.createElement('input');
        saveButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
        saveButton.setAttribute('type', 'button');
        saveButton.setAttribute('value', '✔️  Save Category');
        saveButton.style.cssFloat = 'right';
        saveButton.style.marginTop = '25px';
        saveButton.addEventListener('click', function () {
            let categoryTitle = titleInput.value;
            let categoryParent = parentInput.innerText;
            let categoryCode = codeInput.value;
            let categoryDescription = descriptionInput.value;

            // check if all inputs are filled, if not, abort execution
            if (categoryTitle.length === 0 || categoryParent.length === 0 || categoryCode.length === 0 || categoryDescription.length === 0) {
                alert('All input fields must be full in order to create category!');
                return;
            }

            // call method to add new category
            let controller = new ProductCategoriesController();
            controller.addCategory(categoryTitle, categoryCode, categoryDescription);
        });

        buttonArea.appendChild(cancelButton);
        buttonArea.appendChild(saveButton);
    }

    // event function for adding root category button being clicked
    addSubCategory() {

        // disable tree view area
        let treeViewArea = document.getElementById('tree-view-area');
        treeViewArea.style.opacity = '50%';
        treeViewArea.setAttribute('data-enabled', 'false');

        // disable highlight of tree view item
        if (document.getElementsByClassName('selected')[0] != null) {
            document.getElementsByClassName('selected')[0].classList.remove('font-color-green', 'selected');
        }

        // change context label
        let contextLabel = document.getElementById('context-menu-label');
        contextLabel.innerText = 'Create subcategory:';

        // disable 'add root category' and 'add subcategory' buttons
        let disableAddRootButton = document.getElementById('add-root-category-button');
        disableAddRootButton.style.opacity = '50%';
        disableAddRootButton.classList.add('noHoverEffect');
        disableAddRootButton.setAttribute('data-enabled', 'false');
        let disableAddSubButton = document.getElementById('add-subcategory-button');
        disableAddSubButton.style.opacity = '50%';
        disableAddSubButton.classList.add('noHoverEffect');
        disableAddSubButton.setAttribute('data-enabled', 'false');

        // clear all input values and make them writable
        let titleInput = document.getElementById('category-management-title-input');
        titleInput.value = '';
        titleInput.removeAttribute('readonly');

        let codeInput = document.getElementById('category-management-code-input');
        codeInput.value = '';
        codeInput.removeAttribute('readonly');

        let descriptionInput = document.getElementById('category-management-description-input');
        descriptionInput.value = '';
        descriptionInput.removeAttribute('readonly');

        // get parent list and add it into the select
        let parentInput = document.getElementById('category-management-parent-select');
        parentInput.disabled = false;
        parentInput.innerHTML = '';
        // get data for the parent list and fill the select element
        let controller = new ProductCategoriesController();
        controller.getCategoriesList();

        // remove 'delete' and 'edit' buttons
        let removeButton = document.getElementById('delete-button');
        removeButton.remove();
        removeButton = document.getElementById('edit-button');
        removeButton.remove();

        // add 'cancel' and 'save' buttons
        let buttonArea = document.getElementById('context-button-menu');

        let cancelButton = document.createElement('input');
        cancelButton.setAttribute('class', 'button-special button-special-gray button-special-functional');
        cancelButton.setAttribute('type', 'button');
        cancelButton.setAttribute('value', '🚫  Cancel');
        cancelButton.style.cssFloat = 'left';
        cancelButton.style.marginTop = '25px';
        cancelButton.addEventListener('click', function () {
            treeViewArea.style.opacity = '100%';
            treeViewArea.removeAttribute('data-enabled');

            disableAddRootButton.style.opacity = '100%';
            disableAddRootButton.classList.remove('noHoverEffect');

            disableAddSubButton.style.opacity = '100%';
            disableAddSubButton.classList.remove('noHoverEffect');

            cancelButton.remove();
            saveButton.remove();

            // change back the context label
            contextLabel.innerText = 'Selected category:';

            // clear all inputs
            titleInput.value = '';
            titleInput.setAttribute('readonly', 'true');
            codeInput.value = '';
            codeInput.setAttribute('readonly', 'true');
            descriptionInput.value = '';
            descriptionInput.setAttribute('readonly', 'true');
            // reset select parent list
            let parentInput = document.getElementById('category-management-parent-select');
            parentInput.innerHTML = '';
            parentInput.disabled = true;
            let selectOption = document.createElement('option');
            selectOption.setAttribute('id', 'category-management-parent-input');
            selectOption.innerText = 'Parent category title';
            parentInput.appendChild(selectOption);

            // add back the 'delete' and 'edit' buttons
            let deleteButton = document.createElement('input');
            deleteButton.setAttribute('id', 'delete-button');
            deleteButton.setAttribute('class', 'button-special button-special-red button-special-functional');
            deleteButton.setAttribute('type', 'submit');
            deleteButton.setAttribute('value', '✖️  Delete');
            deleteButton.style.cssFloat = 'left';
            deleteButton.style.marginTop = '25px';

            let editButton = document.createElement('input');
            editButton.setAttribute('id', 'edit-button');
            editButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
            editButton.setAttribute('type', 'submit');
            editButton.setAttribute('value', '✏️  Edit');
            editButton.style.cssFloat = 'right';
            editButton.style.marginTop = '25px';

            deleteButton.addEventListener('click', ProductsCategoriesView.deleteCategory);
            editButton.addEventListener('click', ProductsCategoriesView.editCategory);
            buttonArea.appendChild(deleteButton);
            buttonArea.appendChild(editButton);
        });

        let saveButton = document.createElement('input');
        saveButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
        saveButton.setAttribute('type', 'button');
        saveButton.setAttribute('value', '✔️  Save Category');
        saveButton.style.cssFloat = 'right';
        saveButton.style.marginTop = '25px';
        saveButton.addEventListener('click', function () {
            let categoryTitle = titleInput.value;
            let categoryParent = parentInput.options[parentInput.selectedIndex].getAttribute('data-category-id');
            let categoryCode = codeInput.value;
            let categoryDescription = descriptionInput.value;

            // check if all inputs are filled, if not, abort execution
            if (categoryTitle.length === 0 || categoryParent.length === 0 || categoryCode.length === 0 || categoryDescription.length === 0) {
                alert('All input fields must be full in order to create category!');
                return;
            }

            // call method to add new category
            let controller = new ProductCategoriesController();
            controller.addCategory(categoryTitle, categoryCode, categoryDescription, categoryParent);
        });

        buttonArea.appendChild(cancelButton);
        buttonArea.appendChild(saveButton);
    }

    // deletes the category which is highlighted, by fetching its id from the element id attribute
    static deleteCategory() {
        // check if category is selected
        if (document.getElementsByClassName('selected')[0] == null) {
            alert('You must select a category first!');
            return;
        }

        let selectedId = document.getElementsByClassName('selected')[0].getAttribute('id');

        // isolate id number from the rest of the string
        let isolatedId = selectedId.substring(selectedId.indexOf('-') + 1);

        if (confirm('Are you sure you want to delete this category from the database? All related subcategories will also be deleted!')) {
            let controller = new ProductCategoriesController();
            controller.deleteCategory(isolatedId);
        }
    }

    static editCategory() {

        // check if category is selected
        if (document.getElementsByClassName('selected')[0] == null) {
            alert('You must select a category first!');
            return;
        }

        // disable tree view area
        let treeViewArea = document.getElementById('tree-view-area');
        treeViewArea.style.opacity = '50%';
        treeViewArea.setAttribute('data-enabled', 'false');

        // change context label
        let contextLabel = document.getElementById('context-menu-label');
        contextLabel.innerText = 'Edit selected category:';

        // disable 'add root category' and 'add subcategory' buttons
        let disableAddRootButton = document.getElementById('add-root-category-button');
        disableAddRootButton.style.opacity = '50%';
        disableAddRootButton.classList.add('noHoverEffect');
        disableAddRootButton.setAttribute('data-enabled', 'false');
        let disableAddSubButton = document.getElementById('add-subcategory-button');
        disableAddSubButton.style.opacity = '50%';
        disableAddSubButton.classList.add('noHoverEffect');
        disableAddSubButton.setAttribute('data-enabled', 'false');

        // clear all input values and make them writable
        let titleInput = document.getElementById('category-management-title-input');
        titleInput.removeAttribute('readonly');

        let codeInput = document.getElementById('category-management-code-input');
        codeInput.removeAttribute('readonly');

        let descriptionInput = document.getElementById('category-management-description-input');
        descriptionInput.removeAttribute('readonly');

        // get parent list and add it into the select
        let parentInput = document.getElementById('category-management-parent-select');
        // save what was selected
        let selected = document.getElementById('category-management-parent-input').getAttribute('data-id');
        parentInput.disabled = false;
        parentInput.innerHTML = '';
        // get data for the parent list and fill the select element
        let controller = new ProductCategoriesController();
        controller.getCategoriesList(selected);

        // add the 'no parent' option
        let option = document.createElement('option');
        option.setAttribute('data-category-id', 'no-parent');
        option.value = 'no-parent';
        option.innerHTML = 'No parent';
        parentInput.appendChild(option);
        let optionGroup = document.createElement('optgroup');
        optionGroup.label = '';
        parentInput.appendChild(optionGroup);

        // remove 'delete' and 'edit' buttons
        let removeButton = document.getElementById('delete-button');
        removeButton.remove();
        removeButton = document.getElementById('edit-button');
        removeButton.remove();

        // add 'cancel' and 'save' buttons
        let buttonArea = document.getElementById('context-button-menu');

        let cancelButton = document.createElement('input');
        cancelButton.setAttribute('class', 'button-special button-special-gray button-special-functional');
        cancelButton.setAttribute('type', 'button');
        cancelButton.setAttribute('value', '🚫  Cancel');
        cancelButton.style.cssFloat = 'left';
        cancelButton.style.marginTop = '25px';
        cancelButton.addEventListener('click', function () {
            treeViewArea.style.opacity = '100%';
            treeViewArea.removeAttribute('data-enabled');

            disableAddRootButton.style.opacity = '100%';
            disableAddRootButton.classList.remove('noHoverEffect');

            disableAddSubButton.style.opacity = '100%';
            disableAddSubButton.classList.remove('noHoverEffect');

            cancelButton.remove();
            saveButton.remove();

            // change back the context label
            contextLabel.innerText = 'Selected category:';

            // clear all inputs
            titleInput.value = '';
            titleInput.setAttribute('readonly', 'true');
            codeInput.value = '';
            codeInput.setAttribute('readonly', 'true');
            descriptionInput.value = '';
            descriptionInput.setAttribute('readonly', 'true');
            // reset select parent list
            let parentInput = document.getElementById('category-management-parent-select');
            parentInput.innerHTML = '';
            parentInput.disabled = true;
            let selectOption = document.createElement('option');
            selectOption.setAttribute('id', 'category-management-parent-input');
            selectOption.innerText = 'Parent category title';
            parentInput.appendChild(selectOption);

            // add back the 'delete' and 'edit' buttons
            let deleteButton = document.createElement('input');
            deleteButton.setAttribute('id', 'delete-button');
            deleteButton.setAttribute('class', 'button-special button-special-red button-special-functional');
            deleteButton.setAttribute('type', 'submit');
            deleteButton.setAttribute('value', '✖️  Delete');
            deleteButton.style.cssFloat = 'left';
            deleteButton.style.marginTop = '25px';

            let editButton = document.createElement('input');
            editButton.setAttribute('id', 'edit-button');
            editButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
            editButton.setAttribute('type', 'submit');
            editButton.setAttribute('value', '✏️  Edit');
            editButton.style.cssFloat = 'right';
            editButton.style.marginTop = '25px';

            deleteButton.addEventListener('click', ProductsCategoriesView.deleteCategory);
            editButton.addEventListener('click', ProductsCategoriesView.editCategory);
            buttonArea.appendChild(deleteButton);
            buttonArea.appendChild(editButton);

            // disable highlight of previous item
            if (document.getElementsByClassName('selected')[0] != null) {
                document.getElementsByClassName('selected')[0].classList.remove('font-color-green', 'selected');
            }
        });

        let saveButton = document.createElement('input');
        saveButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
        saveButton.setAttribute('type', 'button');
        saveButton.setAttribute('value', '️✔️  Save Changes');
        saveButton.style.cssFloat = 'right';
        saveButton.style.marginTop = '25px';
        saveButton.addEventListener('click', function () {
            let categoryTitle = titleInput.value;
            let categoryParent = parentInput.options[parentInput.selectedIndex].getAttribute('data-category-id');
            let categoryCode = codeInput.value;
            let categoryDescription = descriptionInput.value;
            let idElement = document.getElementsByClassName('selected')[0].getAttribute('id');
            let id = idElement.substring(idElement.indexOf('-') + 1);

            // check if all inputs are filled, if not, abort execution
            if (categoryTitle.length === 0 || categoryParent.length === 0 || categoryCode.length === 0 || categoryDescription.length === 0) {
                alert('All input fields must be full in order to apply changes!');
                return;
            }

            if (categoryParent === 'no-parent') {
                categoryParent = null;
            }

            // call method to add new category
            let controller = new ProductCategoriesController();
            controller.updateCategory(id, categoryTitle, categoryCode, categoryDescription, categoryParent);
        });

        buttonArea.appendChild(cancelButton);
        buttonArea.appendChild(saveButton);
    }

    renderView(contentAreaSelectorID, viewData) {
        // set active element in side menu
        document.getElementById('nav-menu-dashboard').classList.remove('font-color-green', 'sidenav-item-selected');
        document.getElementById('nav-menu-products').classList.remove('font-color-green', 'sidenav-item-selected');
        document.getElementById('nav-menu-product-categories').classList.add('font-color-green', 'sidenav-item-selected');

        // set a variable to represent the content area for ease of use
        let contentArea = document.getElementById(contentAreaSelectorID);

        // empty previous content from the area
        contentArea.innerHTML = '';

        // adjust container height
        contentArea.classList.add('background-container-categories');
        contentArea.classList.remove('background-container-products');

        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="header section">

        let bigHeaderTableRow = document.createElement('tr');
        let bigHeaderTableData = document.createElement('td');
        bigHeaderTableData.setAttribute('colspan', '2');

        let headerTitle = document.createElement('div');
        headerTitle.classList.add('heading-large');
        headerTitle.style.fontSize = '3.5rem';
        headerTitle.appendChild(document.createTextNode('Product Categories'));

        bigHeaderTableData.appendChild(headerTitle);
        contentArea.appendChild(bigHeaderTableRow).appendChild(bigHeaderTableData);

        let headerTableRow = document.createElement('tr');
        let headerTableDataLeft = document.createElement('td');
        let headerTableDataRight = document.createElement('td');
        headerTableDataRight.classList.add('table-cell-padding');

        let headerSubtitleLeft = document.createElement('div');
        headerSubtitleLeft.classList.add('heading-small', 'font-color-green', 'align-left');
        headerSubtitleLeft.appendChild(document.createTextNode('Categories:'));

        let headerSubtitleRight = document.createElement('div');
        headerSubtitleRight.classList.add('heading-small', 'font-color-green', 'align-left');
        headerSubtitleRight.appendChild(document.createTextNode('Selected category:'));
        headerSubtitleRight.setAttribute('id', 'context-menu-label');

        //headerTableDataLeft.appendChild(headerTitle);
        headerTableDataLeft.appendChild(headerSubtitleLeft);

        headerTableDataRight.appendChild(headerSubtitleRight);

        contentArea.appendChild(headerTableRow).appendChild(headerTableDataLeft);
        contentArea.appendChild(headerTableRow).appendChild(headerTableDataRight);
        //</editor-fold>

        // tree view
        //<editor-fold desc="tree-view">
        let treeView = "<ul id=\"TreeView\">";
        // fill list
        for (let index = 0; index < viewData.length; index++) {
            let categoryListItem = '';

            if (viewData[index]['hasChildren'] === true) {
                categoryListItem += '<li><span class="selectable" data-expandable="true" id="expand-' + viewData[index]['id'] + '" >&#9654&nbsp;</span><span class="selectable" id="select-' + viewData[index]['id'] + '">' + viewData[index]['title'] + '</span></li>';
            } else {
                categoryListItem += '<li><span class="selectable" id="select-' + viewData[index]['id'] + '">' + viewData[index]['title'] + '</span></li>';
            }

            treeView += categoryListItem;
        }
        treeView += "</ul>";


        let productsTableRow = document.createElement('tr');
        let productsTableData = document.createElement('td');

        let sectionContainer = document.createElement('div');
        sectionContainer.classList.add('table-area', 'font-simple');
        sectionContainer.setAttribute('id', 'tree-view-area');
        productsTableData.appendChild(sectionContainer);

        sectionContainer.innerHTML += "<div class='scrollable align-left'>" + treeView + "</div>";

        contentArea.appendChild(productsTableRow).appendChild(productsTableData);

        // add event listeners for click in order to expand list or activate category editing
        for (let index = 0; index < viewData.length; index++) {
            document.getElementById('select-' + viewData[index]['id']).addEventListener("click", this.selectTreeItem);
            if (document.getElementById('expand-' + viewData[index]['id'])) {
                document.getElementById('expand-' + viewData[index]['id']).addEventListener("click", this.expandTreeItem);
            }
        }
        //</editor-fold>

        // category management
        //<editor-fold desc="category management">
        let categoryManagementTableData = document.createElement('td');
        categoryManagementTableData.classList.add('table-cell-padding');

        let managementSectionContainer = document.createElement('div');
        managementSectionContainer.setAttribute('id', 'management-section-container');
        managementSectionContainer.classList.add('table-area', 'font-simple');
        managementSectionContainer.style.height = '370px';
        managementSectionContainer.style.width = '400px';

        let managementTable = document.createElement('table');
        managementTable.setAttribute('id', 'selected-category-menu');
        managementTable.style.width = '100%';

        // title row
        let titleTableRow = document.createElement('tr');
        // title data
        let titleTableDataLeft = document.createElement('td');
        let titleTableDataRight = document.createElement('td');
        titleTableDataLeft.classList.add('align-left', 'cell-padding-vertical');
        titleTableDataRight.classList.add('align-right', 'cell-padding-vertical');

        titleTableDataLeft.innerHTML = 'Title:';

        let titleInputField = document.createElement('input');
        titleInputField.classList.add('form-input-area');
        titleInputField.setAttribute('id', 'category-management-title-input');
        titleInputField.setAttribute('type', 'text');
        titleInputField.setAttribute('readonly', 'true');
        titleInputField.setAttribute('placeholder', 'Category title');
        titleTableDataRight.appendChild(titleInputField);


        // parent category row
        let parentCategoryTableRow = document.createElement('tr');
        // parent category data
        let parentCategoryTableDataLeft = document.createElement('td');
        let parentCategoryTableDataRight = document.createElement('td');
        parentCategoryTableDataLeft.classList.add('align-left', 'cell-padding-vertical');
        parentCategoryTableDataRight.classList.add('align-right', 'cell-padding-vertical');

        parentCategoryTableDataLeft.innerHTML = 'Parent category:';

        let parentCategoryDropdown = document.createElement('select');
        parentCategoryDropdown.setAttribute('id', 'category-management-parent-select');
        parentCategoryDropdown.classList.add('form-input-area');
        parentCategoryDropdown.disabled = true;
        let selectOption = document.createElement('option');
        selectOption.text = "Parent category title";
        selectOption.setAttribute('id', 'category-management-parent-input');
        parentCategoryDropdown.appendChild(selectOption);
        parentCategoryTableDataRight.appendChild(parentCategoryDropdown);

        // category code row
        let categoryCodeTableRow = document.createElement('tr');
        // category code data
        let categoryCodeTableDataLeft = document.createElement('td');
        let categoryCodeTableDataRight = document.createElement('td');
        categoryCodeTableDataLeft.classList.add('align-left', 'cell-padding-vertical');
        categoryCodeTableDataRight.classList.add('align-right', 'cell-padding-vertical');

        categoryCodeTableDataLeft.innerHTML = 'Category code:';

        let categoryCodeInputField = document.createElement('input');
        categoryCodeInputField.setAttribute('id', 'category-management-code-input');
        categoryCodeInputField.classList.add('form-input-area');
        categoryCodeInputField.setAttribute('type', 'text');
        categoryCodeInputField.setAttribute('readonly', 'true');
        categoryCodeInputField.setAttribute('placeholder', 'Category code');
        categoryCodeTableDataRight.appendChild(categoryCodeInputField);


        // category description row
        let categoryDescriptionTableRow = document.createElement('tr');
        // category description data
        let categoryDescriptionTableDataLeft = document.createElement('td');
        let categoryDescriptionTableDataRight = document.createElement('td');
        categoryDescriptionTableDataLeft.classList.add('align-left', 'cell-padding-vertical');
        categoryDescriptionTableDataRight.classList.add('align-right', 'cell-padding-vertical');

        categoryDescriptionTableDataLeft.innerHTML = 'Description:';
        categoryDescriptionTableDataLeft.style.verticalAlign = 'top';

        let categoryDescriptionInputField = document.createElement('textarea');
        categoryDescriptionInputField.setAttribute('id', 'category-management-description-input');
        categoryDescriptionInputField.classList.add('form-input-area');
        categoryDescriptionInputField.style.resize = 'none';
        categoryDescriptionInputField.setAttribute('rows', '11');
        categoryDescriptionInputField.style.fontFamily = 'Arial';
        categoryDescriptionInputField.setAttribute('readonly', 'true');
        categoryDescriptionInputField.setAttribute('placeholder', 'Category description');
        categoryDescriptionTableDataRight.appendChild(categoryDescriptionInputField);


        // add data cells to rows
        titleTableRow.appendChild(titleTableDataLeft);
        titleTableRow.appendChild(titleTableDataRight);

        parentCategoryTableRow.appendChild(parentCategoryTableDataLeft);
        parentCategoryTableRow.appendChild(parentCategoryTableDataRight);

        categoryCodeTableRow.appendChild(categoryCodeTableDataLeft);
        categoryCodeTableRow.appendChild(categoryCodeTableDataRight);

        categoryDescriptionTableRow.appendChild(categoryDescriptionTableDataLeft);
        categoryDescriptionTableRow.appendChild(categoryDescriptionTableDataRight);

        // add rows to table
        managementTable.appendChild(titleTableRow);
        managementTable.appendChild(parentCategoryTableRow);
        managementTable.appendChild(categoryCodeTableRow);
        managementTable.appendChild(categoryDescriptionTableRow);

        // add table to view
        managementSectionContainer.appendChild(managementTable);


        categoryManagementTableData.appendChild(managementSectionContainer);


        contentArea.appendChild(productsTableRow).appendChild(categoryManagementTableData);
        //</editor-fold>
        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="buttons row">
        let buttonsRow = document.createElement('tr');
        let categoriesButtonsData = document.createElement('td');

        let rootCategoryButton = document.createElement('input');
        rootCategoryButton.setAttribute('id', 'add-root-category-button');
        rootCategoryButton.setAttribute('class', 'button-special button-special-functional');
        rootCategoryButton.setAttribute('type', 'submit');
        rootCategoryButton.setAttribute('value', '➕  Add Root Category');
        rootCategoryButton.style.cssFloat = 'left';
        rootCategoryButton.style.marginTop = '25px';
        rootCategoryButton.addEventListener('click', this.addRootCategory);

        let subcategoryButton = document.createElement('input');
        subcategoryButton.setAttribute('id', 'add-subcategory-button');
        subcategoryButton.setAttribute('class', 'button-special button-special-functional');
        subcategoryButton.setAttribute('type', 'submit');
        subcategoryButton.setAttribute('value', '➕  Add Subcategory');
        subcategoryButton.style.cssFloat = 'right';
        subcategoryButton.style.marginTop = '25px';
        subcategoryButton.addEventListener('click', this.addSubCategory);

        categoriesButtonsData.appendChild(rootCategoryButton);
        categoriesButtonsData.appendChild(subcategoryButton);

        // right side menu buttons
        let sideMenuButtonsData = document.createElement('td');
        sideMenuButtonsData.setAttribute('id', 'context-button-menu');
        sideMenuButtonsData.classList.add('table-cell-padding');

        let deleteButton = document.createElement('input');
        deleteButton.setAttribute('id', 'delete-button');
        deleteButton.setAttribute('class', 'button-special button-special-red button-special-functional');
        deleteButton.setAttribute('type', 'submit');
        deleteButton.setAttribute('value', '✖️  Delete');
        deleteButton.style.cssFloat = 'left';
        deleteButton.style.marginTop = '25px';

        let editButton = document.createElement('input');
        editButton.setAttribute('id', 'edit-button');
        editButton.setAttribute('class', 'button-special button-special-blue button-special-functional');
        editButton.setAttribute('type', 'submit');
        editButton.setAttribute('value', '✏️  Edit');
        editButton.style.cssFloat = 'right';
        editButton.style.marginTop = '25px';

        deleteButton.addEventListener('click', ProductsCategoriesView.deleteCategory)
        editButton.addEventListener('click', ProductsCategoriesView.editCategory)
        sideMenuButtonsData.appendChild(deleteButton);
        sideMenuButtonsData.appendChild(editButton);

        contentArea.appendChild(buttonsRow).appendChild(categoriesButtonsData);
        contentArea.appendChild(buttonsRow).appendChild(sideMenuButtonsData);
        //</editor-fold>
    }
}