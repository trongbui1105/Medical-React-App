import React from "react";
import { Redirect } from "react-router";
import AuthHandler from "../utils/AuthHandler";

class LogoutComponent extends React.Component {
    render() {
        AuthHandler.logoutUser();
        return <Redirect to="/" />;
    }
}

export default LogoutComponent;