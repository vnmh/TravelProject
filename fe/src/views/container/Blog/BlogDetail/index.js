import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import Header from "../../Header";
import Footer from "../../Footer";
import ImpBlogDetail from "./ImpBlogDetail";
import { useHistory, useRouteMatch } from "react-router";
import ScrollToTop from "~/ScrollToTop";

const BlogDetailStyled = styled.div``;

function BlogDetail(props) {
   const [blogDetail, setBlogDetail] = useState([]);
   const match = useRouteMatch();
   useEffect(() => {
      props
         .getPost(match?.params?.id)
         .then(({ res }) => {
            console.log("hiendev ~ file: index.js ~ line 22 ~ .then ~ res", res);
            setBlogDetail(_.head(res || []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);

   return (
      <ScrollToTop>
         <BlogDetailStyled>
            <Header />
            <ImpBlogDetail blogDetail={blogDetail} />
            <Footer />
         </BlogDetailStyled>
      </ScrollToTop>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPost: appApisActions.getPost
   }
)(BlogDetail);
