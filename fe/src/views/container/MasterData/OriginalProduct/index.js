import React, { Component } from "react";
import { compose } from "recompose";
import AddProduct from "./AddProduct";
import ListProduct from "./Original";
import * as PATH from "~/configs/routesConfig";
import { withRouter } from "react-router-dom";
class Products extends Component {
   constructor(props) {
      super(props);

      this.state = {};
   }

   renderContent = () => {
      switch (this.props.match.path) {
         case PATH.MASTER_DATA_PRODUCT_ALL:
            return <ListProduct />;
         case PATH.MASTER_DATA_PRODUCT_ADD:
         case PATH.MASTER_DATA_PRODUCT_VIEW:
         case PATH.MASTER_DATA_PRODUCT_EDIT:
            return <AddProduct />;
         default:
            return;
      }
   };
   render() {
      return <>{this.renderContent()} </>;
   }
}
export default compose(withRouter)(Products);
