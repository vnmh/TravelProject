import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import CardItemGridBlog from "./CardItemBlog";
import InfoTour from "../../Tour/InfoTour";
import FilterTopBlog from "../FilterTopBlog";
import CreateBlogContainer from "../CreateBlog/CreateBlogContainer";

const ImpBlogGridStyled = styled.div``;

function ImpBlogGrid(props) {
   const [blogCount, setBlogCount] = useState(0);
   const [isCreatePost, setIsCreatePost] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);
   const [currentEdit, setCurrentEdit] = useState();

   return (
      <ImpBlogGridStyled>
         <section className='card-area section--padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='filter-wrap'>
                        <FilterTopBlog
                           blogCount={blogCount}
                           isCreatePost={isCreatePost}
                           setIsCreatePost={setIsCreatePost}
                           setIsSubmit={setIsSubmit}
                        />
                     </div>
                  </div>
               </div>
               {isCreatePost && (
                  <CreateBlogContainer
                     isCreatePost={isCreatePost}
                     setIsCreatePost={setIsCreatePost}
                     setIsSubmit={setIsSubmit}
                     isSubmit={isSubmit}
                     currentEdit={currentEdit}
                     setCurrentEdit={setCurrentEdit}
                  />
               )}
               {!isCreatePost && <CardItemGridBlog setBlogCount={setBlogCount} />}
            </div>
         </section>
         <InfoTour />
      </ImpBlogGridStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts
   }
)(ImpBlogGrid);
