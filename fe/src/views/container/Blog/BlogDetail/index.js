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

const BlogDetailStyled = styled.div``;

function BlogDetail(props) {
   const [BlogDetail, setBlogDetail] = useState([]);
   useEffect(() => {
      props
         .getPosts()
         .then(({ res }) => {
            setBlogDetail(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <BlogDetailStyled>
         <Header />
         <ImpBlogDetail />
         <Footer />
      </BlogDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts
   }
)(BlogDetail);
