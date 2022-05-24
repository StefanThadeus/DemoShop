class DashboardController {
    constructor() {
        this.dashboardService = new DashboardService();
    }

    // loads dashboard view and get data by making server request on the given request url for data
    getView(dataRequestPath) {
        // get view data by making making a request via dashboardService to url provided in dataRequestPath variable
        let viewData = this.dashboardService.makeRequest('GET', dataRequestPath);
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
        let dashboardView = new DashboardView();
        dashboardView.renderView(contentAreaSelector, data);
    }
}