import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import FilterTopTour from "../FilterTopTour";
import FilterOptionTour from "../FilterOptionTour";
import SearchListTour from "./SearchListTour";
import FilterByPrice from "./FilterByPrice";
import FilterByReviewScore from "./FilterByReviewScore";
import FilterByRating from "./FilterByRating";
import FilterByCategory from "./FilterByCategory";
import FilterByDuration from "./FilterByDuration";
import CardItemListTour from "./CardItemListTour";
import InfoTour from "../InfoTour";

const ImpTourListStyled = styled.div``;

function ImpTourList(props) {
   const [sortType, setSortType] = useState();
   const [searchTour, setSearchTour] = useState();
   const [timeSubmit, setTimeSubmit] = useState();
   const [pagination, setPagination] = useState({ page: 1, size: 0, total: 0 });

   return (
      <ImpTourListStyled>
         {/* ================================
            START CARD AREA
         ================================= */}
         <section className='card-area section--padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='filter-wrap margin-bottom-30px'>
                        <FilterTopTour />
                        <FilterOptionTour setSortType={setSortType} />
                     </div>
                     {/* end filter-wrap */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}

               <div className='row'>
                  <div className='col-lg-4'>
                     <div className='sidebar mt-0'>
                        <SearchListTour setSearchTour={setSearchTour} setTimeSubmit={setTimeSubmit} />
                        <hr></hr>
                        <FilterByPrice />
                        <hr></hr>
                        <FilterByReviewScore />
                        <hr></hr>
                        <FilterByRating />
                        <hr></hr>
                        <FilterByCategory />
                        <hr></hr>
                        <FilterByDuration />
                        <hr></hr>
                     </div>
                     {/* end sidebar */}
                  </div>
                  {/* end col-lg-4 */}
                  <div className='col-lg-8'>
                     <CardItemListTour
                        sortType={sortType}
                        searchTour={searchTour}
                        timeSubmit={timeSubmit}
                        pagination={pagination}
                        setPagination={setPagination}
                     />
                  </div>
                  {/* end col-lg-8 */}
               </div>
               {/* end row */}

               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='btn-box mt-3 text-center'>
                        <button type='button' className='theme-btn'>
                           <i className='la la-refresh mr-1' />
                           Load More
                        </button>
                        <p className='font-size-13 pt-2'>
                           Showing {pagination.page} to {Math.ceil(pagination.total / pagination.size)} of{" "}
                           {pagination.total} entries
                        </p>
                     </div>
                     {/* end btn-box */}
                  </div>
                  {/* end col-lg-12 */}
               </div>
               {/* end row */}
            </div>
            {/*end container*/}
         </section>
         {/*end card-area*/}
         {/* ================================
            END CARD AREA
         ================================= */}
         <InfoTour />
      </ImpTourListStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ImpTourList);
