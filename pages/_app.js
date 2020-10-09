import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/nextjs-argon-dashboard.scss";
import Admin from  "../layouts/Admin"

import { useAuth ,AuthContext} from "../libs/ContextLib/ContextLib"
import PrivateRoute from "../components/PrivateRoute/PrivateRoute"

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  console.log("success")
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  
  constructor(props){
    super(props)
    this.state = {
      signedIn : false,
      loading : true
    }
  }
  componentDidMount() {
    if (window.localStorage.getItem("billing_token")) {
      this.setState({signedIn:true})
    }
    this.setState({loading:false})
    console.log(this.state)
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || Admin;
    const setAuthenticated = signedIn => this.setState({signedIn})
    const setLoading = loading=> this.setState({loading})
    return (
      <React.Fragment>
        <AuthContext.Provider  value={{isAuthenticated : this.state.signedIn,setAuthenticated,loading:this.state.loading,setLoading}}>
        <PrivateRoute isAuthenticated={this.state.signedIn} loading={this.state.loading}/>
        <Head>
          <meta 
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          <title>vFileStore Billing</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </AuthContext.Provider>
      </React.Fragment>
    );
  }
}
