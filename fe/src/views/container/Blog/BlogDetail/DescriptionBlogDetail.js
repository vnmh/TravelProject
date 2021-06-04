import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const DescriptionBlogDetailStyled = styled.div``;

const DescriptionBlogDetail = (props) => {
   return (
      <DescriptionBlogDetailStyled>
         <div>
            <p className='py-3'>{props.blogDetail?.describe}</p>
         </div>
      </DescriptionBlogDetailStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPost: appApisActions.getPost
   }
)(DescriptionBlogDetail);
