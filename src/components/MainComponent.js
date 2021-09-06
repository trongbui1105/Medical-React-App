import React from "react";
import Navbar from "./Navbar";
import Overlay from "./Overlay";
import Sidebar from "./Sidebar";
import GoogleFontLoader from "react-google-font-loader";
import "adminbsb-materialdesign/css/themes/all-themes.css";

class MainComponent extends React.Component {
  state = {
    bodyClass: "theme-pink ls-closed",
    displayOverlay: "none",
    width: window.screen.width,
  };

  onBarClick = () => {
    if (this.state.bodyClass === "theme-pink ls-closed overlay-open") {
      this.setState({ bodyClass: "theme-pink ls-closed" });
      this.setState({ displayOverlay: "none" });
    } else if (this.state.bodyClass === "theme-pink ls-closed") {
      this.setState({ bodyClass: "theme-pink ls-closed overlay-open" });
      this.setState({ displayOverlay: "block" });
    }
  };

  onScreenResize = () => {
    console.log(window.screen.width);
    this.setState({ width: window.screen.width});
  };

  componentWillMount() {
    window.addEventListener("resize", this.onScreenResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onScreenResize);
  }

  render() {
    if (this.state.width > 1150) {
      document.getElementById("root").className = "theme-pink";
    } else {
      document.getElementById("root").className = this.state.bodyClass;
    }
    return (
      <React.Fragment>
        <GoogleFontLoader
          fonts={[
            {
              font: "Roboto",
              weights: [400, "700"],
            },
          ]}
          subsets={["latin", "cyrillic-ext"]}
        />

        <GoogleFontLoader
          fonts={[
            {
              font: "Material+Icons",
            },
          ]}
        />
        <Overlay display={this.state.displayOverlay} />
        <Navbar onBarClick={this.onBarClick} />
        <Sidebar activepage={this.props.activepage} />
        <>{this.props.page}</>
      </React.Fragment>
    );
  }
}

export default MainComponent;
