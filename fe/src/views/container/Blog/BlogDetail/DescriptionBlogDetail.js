import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Tooltip, Typography } from "antd";

const DescriptionBlogDetailStyled = styled.div``;

const DescriptionBlogDetail = (props) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      props
         .getPosts()
         .then(({ res }) => {
            props
               .getAllImagesPost()
               .then((resImg) => {
                  // setImages(res);
                  const postWithImage = res.map((post) => {
                     return {
                        ...post,
                        images: resImg.res.filter((image) => {
                           return post.idPost === image.idPost;
                        })
                     };
                  });
                  setPosts(postWithImage);
               })
               .catch((err) => {
                  console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
               });
         })
         .catch((err) => {
            console.log("🚀 ~ file: BlogHomePage.js ~ line 40 ~ useEffect ~ err", err);
         });
   }, []);
   return (
      <DescriptionBlogDetailStyled>
         {posts.map((item, index) => {
            return (
               <div key={index}>
                  <h3 className='title font-size-20'>
                     {" "}
                     <Tooltip title={item.titlePost}>
                        <Link to='/tour-detail'>
                           <Typography.Paragraph className='text-link' ellipsis={{ rows: 2 }}>
                              {item.titlePost}
                           </Typography.Paragraph>
                        </Link>
                     </Tooltip>
                  </h3>
                  <p className='py-3'>
                     {item.describe}
                  </p>
                  
                  <h3 className='title font-size-15 font-weight-medium pb-3'>Highlights</h3>
                  <div className='row'>
                     <div className='col-lg-6 responsive-column'>
                        <ul className='list-items pb-3'>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Dolorem mediocritatem
                           </li>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Mea appareat
                           </li>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Prima causae
                           </li>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Singulis indoctum
                           </li>
                        </ul>
                     </div>
                     <div className='col-lg-6 responsive-column'>
                        <ul className='list-items pb-3'>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Timeam inimicus
                           </li>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Oportere democritum
                           </li>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Cetero inermis
                           </li>
                           <li>
                              <i className='la la-dot-circle text-color mr-2' />
                              Pertinacia eum
                           </li>
                        </ul>
                     </div>
                  </div>
                  {/* end row */}
                  <div className='row'>
                     <div className='col-lg-6 responsive-column'>
                        <h3 className='title font-size-15 font-weight-medium pb-3'>Included</h3>
                        <ul className='list-items'>
                           <li>
                              <i className='la la-check text-success mr-2' />
                              Airfare
                           </li>
                           <li>
                              <i className='la la-check text-success mr-2' />
                              Local Transportation
                           </li>
                           <li>
                              <i className='la la-check text-success mr-2' />
                              Accommodation
                           </li>
                           <li>
                              <i className='la la-check text-success mr-2' />
                              Tour Guide
                           </li>
                        </ul>
                     </div>
                     <div className='col-lg-6 responsive-column'>
                        <h3 className='title font-size-15 font-weight-medium pb-3'>Not Included</h3>
                        <ul className='list-items'>
                           <li>
                              <i className='la la-times text-danger mr-2' />
                              Entrance Fees
                           </li>
                           <li>
                              <i className='la la-times text-danger mr-2' />
                              Guide Gratuity
                           </li>
                           <li>
                              <i className='la la-times text-danger mr-2' />
                              Lunch
                           </li>
                           <li>
                              <i className='la la-times text-danger mr-2' />
                              Dinner
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            );
         })}
         {/* end row */}
      </DescriptionBlogDetailStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getPosts: appApisActions.getPosts,
      getAllImagesPost: appApisActions.getAllImagesPost
   }
)(DescriptionBlogDetail);
