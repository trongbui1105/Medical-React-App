import React from "react";
import APIHandler from "../utils/APIHandler";

import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  state = {
    customer_request: 0,
    bill_count: 0,
    medicine_count: 0,
    company_count: 0,
    employee_count: 0,
    profit_total: 0,
    sell_total: 0,
    request_pending: 0,
    request_completed: 0,
    profit_total_today: 0,
    sell_total_today: 0,
    medicine_expire: 0,
    dataPoints: [],
    profitChartOption: {},
    sellChartOption: {},
  };

  // This method works when our page is ready
  componentDidMount() {
    this.fetchHomePage();
  }

  async fetchHomePage() {
    var apiHandler = new APIHandler();
    var homeData = await apiHandler.fetchHomePage();
    console.log(homeData);
    this.setState({ customer_request: homeData.data.customer_request });
    this.setState({ bill_count: homeData.data.bill_count });
    this.setState({ medicine_count: homeData.data.medicine_count });
    this.setState({ company_count: homeData.data.company_count });
    this.setState({ employee_count: homeData.data.employee_count });
    this.setState({ profit_total: homeData.data.profit_total });
    this.setState({ sell_total: homeData.data.sell_total });
    this.setState({ request_pending: homeData.data.request_pending });
    this.setState({ request_completed: homeData.data.request_completed });
    this.setState({ profit_total_today: homeData.data.profit_total_today });
    this.setState({ sell_total_today: homeData.data.sell_total_today });
    this.setState({ medicine_expire: homeData.data.medicine_expire });

    var profitDataList = [];
    for (var i = 0; i < homeData.data.profit_chart.length; i++) {
      profitDataList.push({
        x: new Date(homeData.data.profit_chart[i].date),
        y: homeData.data.profit_chart[i].amt,
      });
    }

    var sellDataList = [];
    for (var i = 0; i < homeData.data.sell_chart.length; i++) {
        sellDataList.push({
        x: new Date(homeData.data.sell_chart[i].date),
        y: homeData.data.sell_chart[i].amt,
      });
    }

    this.state.profitChartOption = {
      animationEnabled: true,
      title: {
        text: "Total Profit Chart of Medicine",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "Profit",
        prefix: "$",
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: profitDataList,
        },
      ],
    };

    this.state.sellChartOption = {
      animationEnabled: true,
      title: {
        text: "Total Sell Chart of Medicine",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "Sales",
        prefix: "$",
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: sellDataList,
        },
      ],
    };
    this.setState({});
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>DASHBOARD</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.customer_request}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.bill_count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL MEDICINE</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.medicine_count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL COMPANY</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.company_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL EMPLOYEE</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.employee_count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.profit_total}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES AMOUNT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.sell_total}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">MEDICINE EXPIRE IN WEEK</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.medicine_expire}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">COMPLETED REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.request_completed}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">PENDING REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.request_pending}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TODAY SALES AMOUNT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.sell_total_today}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TODAY SALES PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.profit_total_today}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Profit Chart</h2>
                </div>
                <div className="body">
                  <CanvasJSChart
                    options={this.state.profitChartOption}
                    /* onRef={ref => this.chart = ref} */
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Sell Chart</h2>
                </div>
                <div className="body">
                  <CanvasJSChart
                    options={this.state.sellChartOption}
                    /* onRef={ref => this.chart = ref} */
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomeComponent;
