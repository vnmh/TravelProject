import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import Header from "../../Header";
import ImpBlogGrid from "./ImpBlogGrid";
import Footer from "../../Footer";
import TopBarBlog from "../TopBarBlog";

const BlogGridStyled = styled.div``;

function BlogGrid(props) {
   const [postList, setPostList] = useState([]);
   useEffect(() => {
      props
         .getPosts()
         .then(({ res }) => {
            setPostList(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <BlogGridStyled>
         <Header />
         <TopBarBlog />
         <ImpBlogGrid />
         <Footer />
      </BlogGridStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts
   }
)(BlogGrid);
