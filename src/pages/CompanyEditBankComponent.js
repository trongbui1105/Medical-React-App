import React from "react";
import { Link } from "react-router-dom";
import APIHandler from "../utils/APIHandler";


class CompanyEditBankComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    bank_account_no: "",
    swift_no: "",
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.editCompanyBankData(
      event.target.bank_account_no.value,
      event.target.swift_no.value,
      this.props.match.params.company_id,
      this.props.match.params.id
    );

    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  // This method works when our page is ready
  componentDidMount() {
    this.fetchCompanyBankData();
  }

  async fetchCompanyBankData() {
    var apiHandler = new APIHandler();
    var companyData = await apiHandler.fetchCompanyBankDetails(
      this.props.match.params.id
    );
    console.log(companyData);
    this.setState({ bank_account_no: companyData.data.data.bank_account_no });
    this.setState({ swift_no: companyData.data.data.swift_no });
    this.setState({ dataLoaded: true });
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE COMPANY</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Edit Company Bank #{this.props.match.params.id}</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="bank_account_no">Account No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="bank_account_no"
                          name="bank_account_no"
                          className="form-control"
                          placeholder="Enter Company Account No"
                          defaultValue={this.state.bank_account_no}
                        />
                      </div>
                    </div>

                    <label htmlFor="swift_no">Swift Code</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="swift_no"
                          name="swift_no"
                          className="form-control"
                          placeholder="Enter Swift Code"
                          defaultValue={this.state.swift_no}
                        />
                      </div>
                    </div>

                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Edit Company Bank"
                        : "Editing Company Bank Please Wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                        <Link
                          to={
                            "/companydetails/" +
                            this.props.match.params.company_id
                          }
                          className="btn btn-info"
                        >
                          Back to Company Details
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}

                    {this.state.errorRes === true &&
                    this.state.sendData === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CompanyEditBankComponent;
