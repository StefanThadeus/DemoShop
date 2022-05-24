class DashboardView {
    constructor() {
    }

    renderView(contentAreaSelectorID, viewData) {

        // set active element in side menu
        document.getElementById('nav-menu-dashboard').classList.add('font-color-green', 'sidenav-item-selected');
        document.getElementById('nav-menu-products').classList.remove('font-color-green', 'sidenav-item-selected');
        document.getElementById('nav-menu-product-categories').classList.remove('font-color-green', 'sidenav-item-selected');

        // set a variable to represent the content area for ease of use
        let contentArea = document.getElementById(contentAreaSelectorID);

        // empty previous content from the area
        contentArea.innerHTML = '';

        // adjust container height
        contentArea.classList.remove('background-container-categories');
        contentArea.classList.remove('background-container-products');

        //--------------------------------------------------------------------------------------------------------------
        //<editor-fold desc="header section">

        let headerTableRow = document.createElement('tr');
        let headerTableData = document.createElement('td');

        let headerTitle = document.createElement('div');
        headerTitle.classList.add('heading-large');
        headerTitle.appendChild(document.createTextNode('Dashboard'));


        let headerSubtitle = document.createElement('div');
        headerSubtitle.classList.add('heading-small', 'font-color-green', 'align-left');
        headerSubtitle.appendChild(document.createTextNode('Statistics:'));

        headerTableData.appendChild(headerTitle);
        headerTableData.appendChild(headerSubtitle);

        contentArea.appendChild(headerTableRow).appendChild(headerTableData);
        //</editor-fold>

        // statistics section ------------------------------------------------------------------------------------------

        // table row and cell for the statistics
        let statisticsTableRow = document.createElement('tr');
        let statisticsTableData = document.createElement('td');

        // container which will hold all the fields and labels
        let sectionContainer = document.createElement('div');
        sectionContainer.classList.add('table-area');
        statisticsTableData.appendChild(sectionContainer);

        // table inside container which has only one row and two columns, in order to better organize data
        let sectionContainerTable = document.createElement('table');
        let sectionContainerTableRow = document.createElement('tr');
        let sectionContainerTableRowDataLeft = document.createElement('td');
        let sectionContainerTableRowDataRight = document.createElement('td');
        sectionContainerTableRowDataRight.classList.add('table-cell-padding');

        sectionContainerTableRow.appendChild(sectionContainerTableRowDataLeft);
        sectionContainerTableRow.appendChild(sectionContainerTableRowDataRight);
        sectionContainerTable.appendChild(sectionContainerTableRow);

        // nested table on the left side ******************************************************************
        //<editor-fold desc="left table">
        let tableLeft = document.createElement('table');



        // Products row
        let tableLeftProductsRow = document.createElement('tr');
        tableLeftProductsRow.classList.add('input-area-padding', 'font-simple');

        // create cell for label
        let tableLeftProductsRowLabelData = document.createElement('td');
        tableLeftProductsRowLabelData.classList.add('cell-padding-vertical', 'align-right');
        tableLeftProductsRowLabelData.appendChild(document.createTextNode('Products count:'));

        // create cell for field
        let tableLeftProductsRowFieldData = document.createElement('td');
        tableLeftProductsRowFieldData.classList.add('cell-padding-vertical');

        // create field
        let numOfProductsField = document.createElement('input');
        numOfProductsField.classList.add('form-input-area', 'form-input-area-short');
        numOfProductsField.setAttribute('type', 'text');
        numOfProductsField.setAttribute('readonly', 'true');
        numOfProductsField.setAttribute('placeholder', 'Number of products');
        numOfProductsField.setAttribute('value', viewData['numOfProducts']);

        // attach field to its cell
        tableLeftProductsRowFieldData.appendChild(numOfProductsField);

        // append cells to row
        tableLeftProductsRow.appendChild(tableLeftProductsRowLabelData);
        tableLeftProductsRow.appendChild(tableLeftProductsRowFieldData);




        // Categories row
        let tableLeftCategoriesRow = document.createElement('tr');
        tableLeftCategoriesRow.classList.add('input-area-padding', 'font-simple');

        // create cell for label
        let tableLeftCategoriesRowLabelData = document.createElement('td');
        tableLeftCategoriesRowLabelData.classList.add('cell-padding-vertical', 'align-right');
        tableLeftCategoriesRowLabelData.appendChild(document.createTextNode('Categories count:'));

        // create cell for field
        let tableLeftCategoriesRowFieldData = document.createElement('td');
        tableLeftCategoriesRowFieldData.classList.add('cell-padding-vertical');

        // create field
        let numOfCategoriesField = document.createElement('input');
        numOfCategoriesField.classList.add('form-input-area', 'form-input-area-short');
        numOfCategoriesField.setAttribute('type', 'text');
        numOfCategoriesField.setAttribute('readonly', 'true');
        numOfCategoriesField.setAttribute('placeholder', 'Number of categories');
        numOfCategoriesField.setAttribute('value', viewData['numOfCategories']);

        // attach field to its cell
        tableLeftCategoriesRowFieldData.appendChild(numOfCategoriesField);

        // append cells to row
        tableLeftCategoriesRow.appendChild(tableLeftCategoriesRowLabelData);
        tableLeftCategoriesRow.appendChild(tableLeftCategoriesRowFieldData);



        // attach rows to left table
        tableLeft.appendChild(tableLeftProductsRow);
        tableLeft.appendChild(tableLeftCategoriesRow);
        //</editor-fold>


        // nested table on the right side ******************************************************************
        //<editor-fold desc="right table">
        let tableRight = document.createElement('table');



        // number of home page openings row
        let tableRightHomePageOpeningRow = document.createElement('tr');
        tableRightHomePageOpeningRow.classList.add('input-area-padding', 'font-simple');

        // create cell for label
        let tableRightHomePageOpeningRowLabelData = document.createElement('td');
        tableRightHomePageOpeningRowLabelData.classList.add('cell-padding-vertical', 'align-right');
        tableRightHomePageOpeningRowLabelData.appendChild(document.createTextNode('Home page opening count:'));

        // create cell for field
        let tableRightHomePageOpeningRowFieldData = document.createElement('td');
        tableRightHomePageOpeningRowFieldData.classList.add('cell-padding-vertical');

        // create field
        let homepageOpeningField = document.createElement('input');
        homepageOpeningField.classList.add('form-input-area');
        homepageOpeningField.setAttribute('type', 'text');
        homepageOpeningField.setAttribute('readonly', 'true');
        homepageOpeningField.setAttribute('placeholder', 'Number of products');
        homepageOpeningField.setAttribute('value', viewData['numOfHomepageOpenings']);

        // attach field to its cell
        tableRightHomePageOpeningRowFieldData.appendChild(homepageOpeningField);

        // append cells to row
        tableRightHomePageOpeningRow.appendChild(tableRightHomePageOpeningRowLabelData);
        tableRightHomePageOpeningRow.appendChild(tableRightHomePageOpeningRowFieldData);




        // Most viewed product row
        let tableRightMostViewedProductRow = document.createElement('tr');
        tableRightMostViewedProductRow.classList.add('input-area-padding', 'font-simple');

        // create cell for label
        let tableRightMostViewedProductRowLabelData = document.createElement('td');
        tableRightMostViewedProductRowLabelData.classList.add('cell-padding-vertical', 'align-right');
        tableRightMostViewedProductRowLabelData.appendChild(document.createTextNode('Most often viewed product:'));

        // create cell for field
        let tableRightMostViewedProductRowFieldData = document.createElement('td');
        tableRightMostViewedProductRowFieldData.classList.add('cell-padding-vertical');

        // create field
        let mostViewedProductField = document.createElement('input');
        mostViewedProductField.classList.add('form-input-area');
        mostViewedProductField.setAttribute('type', 'text');
        mostViewedProductField.setAttribute('readonly', 'true');
        mostViewedProductField.setAttribute('placeholder', 'Most often viewed product');
        mostViewedProductField.setAttribute('value', viewData['mostOftenViewedProduct']);

        // attach field to its cell
        tableRightMostViewedProductRowFieldData.appendChild(mostViewedProductField);

        // append cells to row
        tableRightMostViewedProductRow.appendChild(tableRightMostViewedProductRowLabelData);
        tableRightMostViewedProductRow.appendChild(tableRightMostViewedProductRowFieldData);




        // Most viewed product openings row
        let tableRightMostViewedProductOpeningsRow = document.createElement('tr');
        tableRightMostViewedProductOpeningsRow.classList.add('input-area-padding', 'font-simple');

        // create cell for label
        let tableRightMostViewedProductOpeningsRowLabelData = document.createElement('td');
        tableRightMostViewedProductOpeningsRowLabelData.classList.add('cell-padding-vertical', 'align-right');
        tableRightMostViewedProductOpeningsRowLabelData.appendChild(document.createTextNode('Number of ' + viewData['mostOftenViewedProduct'] + ' views:'));

        // create cell for field
        let tableRightMostViewedProductOpeningsRowLFieldData = document.createElement('td');
        tableRightMostViewedProductOpeningsRowLFieldData.classList.add('cell-padding-vertical');

        // create field
        let mostViewedProductOpeningsField = document.createElement('input');
        mostViewedProductOpeningsField.classList.add('form-input-area');
        mostViewedProductOpeningsField.setAttribute('type', 'text');
        mostViewedProductOpeningsField.setAttribute('readonly', 'true');
        mostViewedProductOpeningsField.setAttribute('placeholder', 'Number of views');
        mostViewedProductOpeningsField.setAttribute('value', viewData['numOfViewsOfMostViewed']);

        // attach field to its cell
        tableRightMostViewedProductOpeningsRowLFieldData.appendChild(mostViewedProductOpeningsField);

        // append cells to row
        tableRightMostViewedProductOpeningsRow.appendChild(tableRightMostViewedProductOpeningsRowLabelData);
        tableRightMostViewedProductOpeningsRow.appendChild(tableRightMostViewedProductOpeningsRowLFieldData);



        // attach rows to right table
        tableRight.appendChild(tableRightHomePageOpeningRow);
        tableRight.appendChild(tableRightMostViewedProductRow);
        tableRight.appendChild(tableRightMostViewedProductOpeningsRow);
        //</editor-fold>


        sectionContainerTableRowDataLeft.appendChild(tableLeft)
        sectionContainerTable.appendChild(sectionContainerTableRowDataLeft);

        sectionContainerTableRowDataRight.appendChild(tableRight)
        sectionContainerTable.appendChild(sectionContainerTableRowDataRight);

        sectionContainer.appendChild(sectionContainerTable);
        contentArea.appendChild(statisticsTableRow).appendChild(statisticsTableData);
        //</editor-fold>
    }
}