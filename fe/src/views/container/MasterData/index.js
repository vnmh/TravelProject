import React from "react";

import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { getString } from "~/views/utilities/helpers/utilObject";
import * as PATH from "~/configs/routesConfig";
import Overview from "./Overview";
import ListProduct from "./OriginalProduct/Original";
import AddProduct from "./OriginalProduct/AddProduct";
import Category from "./CategoryProduct";
import BusinessCertificate from "./BusinessCertificate";
import StandardCertificate from "./StandardCertificate";
import _ from "lodash";
import { Sidebar } from "~/views/presentation/ui/navigation";
import {
   FolderOpenOutlined,
   DashboardOutlined,
   AuditOutlined,
   ProfileOutlined,
   FileAddOutlined
} from "@ant-design/icons";
import MDNav from "~/views/presentation/ui/navigation/MDNav";
import { breadcrumb } from "~/configs/breadcrumb";
import OriginalProduct from "./OriginalProduct";

const ContainerStyled = styled.div`
   display: flex;
   flex-direction: row;
   .profile-nav {
      position: fixed;
      left: 0px;
      right: 0px;
      top: 45px;
      z-index: 999;
      @media (max-width: 600px) {
         top: 90px;
      }
   }
   .menu {
      margin-top: 4px;
      width: 250px;
      height: 100vh;
      top: 110px;
      position: fixed;
      @media (max-width: 600px) {
         top: 155px;
      }
   }
   .content {
      flex: 1;
      right: 0px;
      position: absolute;
      left: 250px;
      min-height: 100vh;
      padding: 25px;
      background-color: #e9e9e9;
      top: 60px;
      @media (max-width: 600px) {
         top: 110px;
      }
   }
   .none-menu {
      left: 0px !important;
   }
`;

let menuArray = {
   overview: {
      icon: <DashboardOutlined />,
      name: strings.SIDEBAR_MENU_DASHBOARD,
      path: PATH.DASHBOARD
   },
   categories: {
      icon: <FolderOpenOutlined />,
      name: strings.SIDEBAR_MENU_CATEGORY,
      path: PATH.MASTER_DATA_CATEGORY
   },
   products: {
      icon: <AuditOutlined />,
      name: strings.SIDEBAR_MENU_PRODUCT,
      path: PATH.MASTER_DATA_ORIGINAL_PRODUCT,
      subMenus: {
         allProducts: {
            icon: <ProfileOutlined />,
            name: strings.SIDEBAR_MENU_PRODUCT_LIST,
            path: PATH.MASTER_DATA_PRODUCT_ALL
         },
         createProduct: {
            icon: <FileAddOutlined />,
            name: strings.SIDEBAR_MENU_PRODUCT_ADD,
            path: PATH.MASTER_DATA_PRODUCT_ADD
         }
      }
   },
   business: {
      icon: <AuditOutlined />,
      name: strings.SIDEBAR_MENU_BUSINESS,
      path: PATH.MASTER_DATA_BUSINESS_CERTIFICATE
   },
   standard: {
      icon: <AuditOutlined />,
      name: strings.SIDEBAR_MENU_STANDARD,
      path: PATH.MASTER_DATA_STANDARD_CERTIFICATE
   }
};

class MasterData extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         viewAsBlocks: true
      };
   }
   changeViewStyle = (viewAsBlocks) => {
      this.setState({ viewAsBlocks: viewAsBlocks });
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
   };

   renderContent = () => {
      switch (this.props.match.path) {
         case PATH.DASHBOARD:
            return <Overview />;
         case PATH.MASTER_DATA_CATEGORY:
            return <Category />;
         case PATH.MASTER_DATA_PRODUCT_ALL:
         case PATH.MASTER_DATA_PRODUCT_VIEW:
         case PATH.MASTER_DATA_PRODUCT_ADD:
         case PATH.MASTER_DATA_PRODUCT_EDIT:
            return <OriginalProduct />;
         case PATH.MASTER_DATA_BUSINESS_CERTIFICATE:
            return <BusinessCertificate />;
         case PATH.MASTER_DATA_STANDARD_CERTIFICATE:
            return <StandardCertificate />;
         default:
            return;
      }
   };
   setBearCum = (name) => {
      this.setState({ bearCum: name });
   };

   getBreadcrumb = () => {
      const { match } = this.props;
      return breadcrumb(match);
   };

   render() {
      return (
         <React.Fragment>
            <ContainerStyled>
               <MDNav
                  changeViewStyle={this.changeViewStyle}
                  className='profile-nav'
                  breadcrumb={this.getBreadcrumb()}
               />
               {
                  <div className='sidebar-main'>
                     <Sidebar menus={menuArray} />
                  </div>
               }

               <div className='content'>{this.renderContent()}</div>
            </ContainerStyled>
         </React.Fragment>
      );
   }
}

export default compose(withRouter)(MasterData);
