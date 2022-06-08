import React, { Component } from "react";
import Input from "./input";
class LoginForm extends Component {
    state = {
        account: { username: "", password: "" },
        errors: {},
    };

    validate = () => {
        const errors = {};
        const { account } = this.state;
        if (account.username.trim() === "")
            errors.username = "Username is required.";
        if (account.password.trim() === "")
            errors.password = "Password is required.";
        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
    };

    validateProperty = ({ name, value }) => {
        if (name === "username") {
            if (value.trim() === "") return "Username is required.";
        }
        if (name === "password") {
            if (value.trim() === "") return "Password is required.";
        }
        return "";
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    };

    render() {
        const { account, errors } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={account.username}
                        label="Username"
                        error={errors.username}
                        onChange={this.handleChange}
                    ></Input>
                    <Input
                        name="password"
                        value={account.password}
                        label="Password"
                        error={errors.password}
                        onChange={this.handleChange}
                    ></Input>

                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;