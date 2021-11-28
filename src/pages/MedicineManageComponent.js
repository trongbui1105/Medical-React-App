import React from "react";
import APIHandler from "../utils/APIHandler";

class MedicineManageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companylist: [],
    medicineDetails: [],
    medicineDataList: [],
    dataLoaded: false,
    name: "",
    medical_typ: "",
    buy_price: "",
    sell_price: "",
    gst: "",
    batch_no: "",
    shelf_no: "",
    expire_date: "",
    mfg_date: "",
    company_id: "",
    description1: "",
    in_stock_total: "",
    qty_in_strip: "",
    total_salt_list: 0,
    medicine_id: 0,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.editMedicineData(
      event.target.name.value,
      event.target.medical_typ.value,
      event.target.buy_price.value,
      event.target.sell_price.value,
      event.target.gst.value,
      event.target.batch_no.value,
      event.target.shelf_no.value,
      event.target.expire_date.value,
      event.target.mfg_date.value,
      event.target.company_id.value,
      event.target.description1.value,
      event.target.in_stock_total.value,
      event.target.qty_in_strip.value,
      this.state.medicineDetails,
      this.state.medicine_id
    );

    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  componentDidMount() {
    this.loadInitialData();
  }

  async loadInitialData() {
    var apiHandler = new APIHandler();
    var companyData = await apiHandler.fetchCompanyOnly();
    var medicineData = await apiHandler.fetchAllMedicine();
    this.setState({
      companylist: companyData.data,
    });
    this.setState({
      medicineDataList: medicineData.data.data,
    });
    this.setState({ dataLoaded: true });
  }

  removeItems = () => {
    if (this.state.medicineDetails.length !== this.state.total_salt_list) {
      this.state.medicineDetails.pop(this.state.medicineDetails.length - 1);
    }
    this.setState({});
  };

  addItems = () => {
    var item = {
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
      id: 0,
    };
    this.state.medicineDetails.push(item);
    this.setState({});
  };

  viewMedicineDetails = (index) => {
    this.setState({ medicine_id: this.state.medicineDataList[index].id });
    this.setState({ name: this.state.medicineDataList[index].name });
    this.setState({
      medical_typ: this.state.medicineDataList[index].medical_typ,
    });
    this.setState({ buy_price: this.state.medicineDataList[index].buy_price });
    this.setState({
      sell_price: this.state.medicineDataList[index].sell_price,
    });
    this.setState({ gst: this.state.medicineDataList[index].gst });
    this.setState({ batch_no: this.state.medicineDataList[index].batch_no });
    this.setState({ shelf_no: this.state.medicineDataList[index].shelf_no });
    this.setState({
      expire_date: this.state.medicineDataList[index].expire_date,
    });
    this.setState({ mfg_date: this.state.medicineDataList[index].mfg_date });
    this.setState({
      company_id: this.state.medicineDataList[index].company_id,
    });
    this.setState({
      description1: this.state.medicineDataList[index].description,
    });
    this.setState({
      in_stock_total: this.state.medicineDataList[index].in_stock_total,
    });
    this.setState({
      qty_in_strip: this.state.medicineDataList[index].qty_in_strip,
    });
    this.setState({
      total_salt_list:
        this.state.medicineDataList[index].medicine_details.length,
    });
    this.setState({
      medicineDetails: this.state.medicineDataList[index].medicine_details,
    });
  };

  handleInput = (event) => {
    var keyname = event.target.name;
    var value = event.target.value;
    var index = event.target.getAttribute("data-index");
    this.state.medicineDetails[index][keyname] = value;
    this.setState({});
  };

  deleteMedicine = (medicine_id) => {
    var apiHandler = new APIHandler();
    var response = apiHandler.deleteMedicine(medicine_id);
    console.log(response);
    this.loadInitialData();
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE Medicine</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {this.state.dataLoaded === false ? (
                    <div className="text-center">
                      <div class="preloader pl-size-xl">
                        <div class="spinner-layer">
                          <div class="circle-clipper left">
                            <div class="circle"></div>
                          </div>
                          <div class="circle-clipper right">
                            <div class="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>All Medicine</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>NAME</th>
                        <th>Medical Type</th>
                        <th>Buy Price</th>
                        <th>Sell Price</th>
                        <th>Batch No.</th>
                        <th>Shelf No.</th>
                        <th>Expire Date</th>
                        <th>Mfg Date</th>
                        <th>In Stock</th>
                        <th>Quantity In Strip</th>
                        <th>Company</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.medicineDataList.map((medicine, index) => (
                        <tr key={medicine.id}>
                          <td>{medicine.id}</td>
                          <td>{medicine.name}</td>
                          <td>{medicine.medical_typ}</td>
                          <td>{medicine.buy_price}</td>
                          <td>{medicine.sell_price}</td>
                          <td>{medicine.batch_no}</td>
                          <td>{medicine.shelf_no}</td>
                          <td>{medicine.expire_date}</td>
                          <td>{medicine.mfg_date}</td>
                          <td>{medicine.in_stock_total}</td>
                          <td>{medicine.qty_in_strip}</td>
                          <td>{medicine.company.name}</td>
                          <td>
                            {new Date(medicine.added_on).toLocaleString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() => this.viewMedicineDetails(index)}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-block btn-danger"
                              onClick={() => this.deleteMedicine(medicine.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Manage Medicine</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="name">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Name"
                          defaultValue={this.state.name}
                        />
                      </div>
                    </div>

                    <label htmlFor="medical_typ">Medicine Type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medical_typ"
                          name="medical_typ"
                          className="form-control"
                          placeholder="Enter Medicine Type"
                          defaultValue={this.state.medical_typ}
                        />
                      </div>
                    </div>

                    <label htmlFor="buy_price">Buy Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="buy_price"
                          name="buy_price"
                          className="form-control"
                          placeholder="Enter Buy Price"
                          defaultValue={this.state.buy_price}
                        />
                      </div>
                    </div>

                    <label htmlFor="sell_price">Sell Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sell_price"
                          name="sell_price"
                          className="form-control"
                          placeholder="Enter Sell Price"
                          defaultValue={this.state.sell_price}
                        />
                      </div>
                    </div>

                    <label htmlFor="gst">GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="gst"
                          name="gst"
                          className="form-control"
                          placeholder="Enter GST"
                          defaultValue={this.state.gst}
                        />
                      </div>
                    </div>

                    <label htmlFor="batch_no">Batch No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="batch_no"
                          name="batch_no"
                          className="form-control"
                          placeholder="Enter Batch No"
                          defaultValue={this.state.batch_no}
                        />
                      </div>
                    </div>

                    <label htmlFor="shelf_no">Shelf No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="shelf_no"
                          name="shelf_no"
                          className="form-control"
                          placeholder="Enter Shelf No"
                          defaultValue={this.state.shelf_no}
                        />
                      </div>
                    </div>

                    <label htmlFor="expire_date">Expire Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="expire_date"
                          name="expire_date"
                          className="form-control"
                          placeholder="Enter Expire Date"
                          defaultValue={this.state.expire_date}
                        />
                      </div>
                    </div>

                    <label htmlFor="mfg_date">Mfg Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="mfg_date"
                          name="mfg_date"
                          className="form-control"
                          placeholder="Enter Mfg Date"
                          defaultValue={this.state.mfg_date}
                        />
                      </div>
                    </div>

                    <label htmlFor="description1">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description1"
                          name="description1"
                          className="form-control"
                          placeholder="Enter Description"
                          defaultValue={this.state.description1}
                        />
                      </div>
                    </div>

                    <label htmlFor="in_stock_total">In Stock Total</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="in_stock_total"
                          name="in_stock_total"
                          className="form-control"
                          placeholder="Enter In Stock"
                          defaultValue={this.state.in_stock_total}
                        />
                      </div>
                    </div>

                    <label htmlFor="qty_in_strip">Quantity in Strip</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="qty_in_strip"
                          name="qty_in_strip"
                          className="form-control"
                          placeholder="Enter Quantity In Strip"
                          value={this.state.qty_in_strip}
                        />
                      </div>
                    </div>

                    <label htmlFor="company">Company</label>
                    <div className="form-group">
                      <select
                        className="form-control show-tick"
                        name="company_id"
                        id="company_id"
                      >
                        {this.state.companylist.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            selected={
                              item.id === this.state.company_id ? true : false
                            }
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-success"
                          onClick={this.addItems}
                          type="button"
                        >
                          Add Details
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-danger"
                          type="button"
                          onClick={this.removeItems}
                        >
                          Remove Details
                        </button>
                      </div>
                    </div>
                    {this.state.medicineDetails.map((item, index) => (
                      <div className="form-group row" key={index}>
                        <div className="col-lg-3">
                          <label htmlFor="company">Salt Name</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_name"
                              name="salt_name"
                              className="form-control"
                              placeholder="Enter Salt Name"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.salt_name}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="company">Salt Quantity</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty"
                              name="salt_qty"
                              className="form-control"
                              placeholder="Enter Salt Quantity"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.salt_qty}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="company">Salt Quantity Type</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty_type"
                              name="salt_qty_type"
                              className="form-control"
                              placeholder="Enter Salt Quantity Type"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.salt_qty_type}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="company">Description</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="description"
                              name="description"
                              className="form-control"
                              placeholder="Enter Description"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.description}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Edit Medicine"
                        : "Updating Medicine Please Wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
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

export default MedicineManageComponent;
