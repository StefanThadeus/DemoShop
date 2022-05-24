class ProductCategoriesController {
    constructor() {
        this.productsService = new ProductCategoriesService();
    }

    // loads dashboard view and get data by making server request on the given request url for data
    getView(dataRequestPath) {
        // get view data by making making a request via dashboardService to url provided in dataRequestPath variable
        let viewData = this.productsService.makeRequest('GET', dataRequestPath);
        // 'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        viewData.then(data => {
            // view data received, change view
            this.changeView(JSON.parse(data));
        });
    }

    // changes view by appending all the necessary html
    changeView(data) {
        // call for the view to render
        let contentAreaSelector = 'viewContent';
        let productsView = new ProductsCategoriesView();
        productsView.renderView(contentAreaSelector, data);
    }

    // get child category list from backend
    getChildCategoryList(parentElementId) {
        let treeViewArea = document.getElementById('tree-view-area');
        // if tree view area is disabled, do nothing
        if (treeViewArea.getAttribute('data-enabled') === 'false') {
            return;
        }

        let id = parentElementId.substring(parentElementId.indexOf('-') + 1);

        // make a JSON request in order to send data to the backend via JSON
        let viewData = this.productsService.makeJSONRequest('api/product-subcategories', {parentId: id});
        //'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        viewData.then(data => {
            // view data received, change view
            let listItems = JSON.parse(data);

            // if clicked element not expanded yet, expand it (marked with class attribute 'data-expandable')
            if (document.getElementById(parentElementId).getAttribute('data-expandable') === 'true') {
                document.getElementById(parentElementId).innerHTML = '&#9698&nbsp;';
                document.getElementById(parentElementId).setAttribute('data-expandable', 'false');
                document.getElementById(parentElementId).setAttribute('data-expanded', 'true');

                // make sublist
                let sublist = document.createElement('ul');
                sublist.setAttribute('id', 'sublist-' + id)

                // fill list
                for (let index = 0; index < listItems.length; index++) {
                    let categoryListItem = document.createElement('li');

                    if (listItems[index]['hasChildren'] === true) {

                        let subSpan = document.createElement('span');
                        subSpan.setAttribute('id', 'expand-' + listItems[index]['id']);
                        subSpan.classList.add('selectable');
                        subSpan.setAttribute('data-expandable', 'true');
                        subSpan.innerHTML = '&#9654&nbsp;';
                        subSpan.addEventListener("click", this.expandTreeItem.bind(this));

                        let subSpanTwo = document.createElement('span');
                        subSpanTwo.setAttribute('id', 'select-' + listItems[index]['id']);
                        subSpanTwo.classList.add('selectable');
                        subSpanTwo.innerHTML = listItems[index]['title'];
                        subSpanTwo.addEventListener("click", this.selectTreeItem.bind(this));

                        categoryListItem.appendChild(subSpan);
                        categoryListItem.appendChild(subSpanTwo);

                    } else {

                        let subSpan = document.createElement('span');
                        subSpan.setAttribute('id', 'select-' + listItems[index]['id']);
                        subSpan.classList.add('selectable');
                        subSpan.innerText = listItems[index]['title'];
                        subSpan.addEventListener("click", this.selectTreeItem.bind(this));

                        categoryListItem.appendChild(subSpan);
                    }

                    // append list item to sublist
                    sublist.appendChild(categoryListItem);
                    //document.getElementById("select-" + listItems[index]['id']).addEventListener("click", this.selectTreeItem);
                }

                // append sublist to its parent
                document.getElementById('select-' + id).after(sublist);

            } else {
                // clicked element already expanded, delete it's sublist and change the arrow icon
                document.getElementById(parentElementId).innerHTML = '&#9654&nbsp;';
                document.getElementById(parentElementId).removeAttribute('data-expanded');
                document.getElementById(parentElementId).setAttribute('data-expandable', 'true');

                let sublist = document.getElementById('sublist-' + id);
                while (sublist.firstChild) {
                    sublist.removeChild(sublist.lastChild);
                }
            }
        });
    }

    // get list of all categories and their subcategories
    getCategoriesList(selected) {
        // make a JSON request in order to send data to the backend via JSON
        let categoryData = this.productsService.makeRequest('GET', 'api/get-all-categories');
        //'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        categoryData.then(data => {
            // view data received, change view
            let listItems = JSON.parse(data);

            let parentInput = document.getElementById('category-management-parent-select');

            for (let i = 0; i < listItems.length; i++) {
                let item = listItems[i];

                let option = document.createElement('option');
                option.setAttribute('data-category-id', item['id']);
                option.value = item['id'];
                option.innerHTML = item['title'];
                parentInput.appendChild(option);
                this.fillSelectList(item['subcategories'], 1, parentInput);

                // add empty divider between root categories for increased readability
                if (i + 1 < listItems.length) {
                    let optionGroup = document.createElement('optgroup');
                    optionGroup.label = '';
                    parentInput.appendChild(optionGroup);
                }
            }

            // make active selection option which was active before calling this method
            if (selected) {
                parentInput.value = selected;
            }
        });
    }

    // recursively fill the select html element with subcategories
    fillSelectList(categories, depth, selectInput) {

        for (let i = 0; i < categories.length; i++) {
            let item = categories[i];

            let option = document.createElement('option');
            option.setAttribute('data-category-id', item['id']);
            option.value = item['id'];

            let j = 1;
            //let dashes = '─';
            let dashes = '&nbsp;&nbsp;';
            while (j++ < depth) {
                dashes += dashes;
            }

            option.innerHTML = dashes + ' • ' + item['title'];

            selectInput.appendChild(option);
            this.fillSelectList(item['subcategories'], depth + 1, selectInput);
        }
    }

    // adds a category to the database
    addCategory(categoryTitle, categoryCode, categoryDescription, categoryParentId = '0') {
        // make a JSON request in order to send data to the backend via JSON
        let viewData = this.productsService.makeJSONRequest('api/add-category',
            {
                title: categoryTitle,
                parentId: categoryParentId,
                code: categoryCode,
                description: categoryDescription
            });

        //'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        viewData.then(data => {
            data = JSON.parse(data);

            if (data['operationSuccess']) {
                // draw the default view again, which will also show the updated category tree view
                this.getView('api/product-categories');
            } else {
                alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
            }
        });
    }

    // deletes a category from the database
    deleteCategory(id) {
        // make a JSON request in order to send data to the backend via JSON
        let viewData = this.productsService.makeJSONRequest('api/delete-category', {deleteId: id});
        //'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        viewData.then(data => {
            data = JSON.parse(data);

            if (data['operationSuccess']) {
                alert('Category deleted!');
                this.getView('api/product-categories');
            } else {
                alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
            }
        });
    }

    // event function which gathers further subcategories
    expandTreeItem(event) {
        this.getChildCategoryList(event.target.id);
    }

    // event function which highlights the selected element and reads data from the database
    selectTreeItem(event) {
        let treeViewArea = document.getElementById('tree-view-area');
        // if tree view area is disabled, do nothing
        if (treeViewArea.getAttribute('data-enabled') === 'false') {
            return;
        }

        // disable highlight of previous item
        if (document.getElementsByClassName('selected')[0] != null) {
            document.getElementsByClassName('selected')[0].classList.remove('font-color-green', 'selected');
        }

        // get id of the selected item
        let id = event.target.id.substring(event.target.id.indexOf('-') + 1);

        // highlight clicked item
        document.getElementById('select-' + id).classList.add('font-color-green', 'selected');

        // make a JSON request in order to send data to the backend via JSON
        let viewData = this.productsService.makeJSONRequest('api/category-data', {categoryId: id});
        //'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        viewData.then(data => {

            data = JSON.parse(data);

            // update category title
            document.getElementById('category-management-title-input').value = data['title'];

            // update category parent title
            if (data['parent']) {
                document.getElementById('category-management-parent-input').innerText = data['parent'];
                document.getElementById('category-management-parent-input').setAttribute('data-id', data['parentId']);
            } else {
                document.getElementById('category-management-parent-input').innerText = 'No parent';
                document.getElementById('category-management-parent-input').setAttribute('data-id', 'no-parent');
            }

            // update category code
            document.getElementById('category-management-code-input').value = data['code'];

            // update category description
            document.getElementById('category-management-description-input').value = data['description'];

        });
    }

    updateCategory(id, categoryTitle, categoryCode, categoryDescription, categoryParentId) {

        // make a JSON request in order to send data to the backend via JSON
        let viewData = this.productsService.makeJSONRequest('api/update-category',
            {
                id: id,
                title: categoryTitle,
                parentId: categoryParentId,
                code: categoryCode,
                description: categoryDescription
            });

        //'then' waits for the ajax call to finish and the 'viewData' promise to receive its value, and executes the code inside after
        viewData.then(data => {
            data = JSON.parse(data);

            if (data['operationSuccess']) {
                // draw the default view again, which will also show the updated category tree view
                this.getView('api/product-categories');
            } else {
                alert('Error: ' + data['errorCode'] + '\n' + data['errorMessage']);
            }
        });
    }
}