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
   const [addressType, setAddressType] = useState();
   const [price, setPrice] = useState();
   const [searchTour, setSearchTour] = useState();
   const [timeSubmit, setTimeSubmit] = useState();
   const [pagination, setPagination] = useState({ page: 1, size: 0, total: 0 });
   const [tourCount, setTourCount] = useState(0);

   return (
      <ImpTourListStyled>
         <section className='card-area section--padding'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='filter-wrap margin-bottom-30px'>
                        <FilterTopTour tourCount={tourCount} />
                        <FilterOptionTour setSortType={setSortType} setAddressType={setAddressType} />
                     </div>
                  </div>
               </div>
               <div className='row'>
                  <div className='col-lg-4'>
                     <div className='sidebar mt-0'>
                        <SearchListTour setSearchTour={setSearchTour} setTimeSubmit={setTimeSubmit} />
                        <hr></hr>
                        <FilterByPrice setPrice={setPrice} />
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
                  </div>
                  <div className='col-lg-8'>
                     <CardItemListTour
                        setTourCount={setTourCount}
                        sortType={sortType}
                        price={price}
                        addressType={addressType}
                        searchTour={searchTour}
                        timeSubmit={timeSubmit}
                        pagination={pagination}
                        setPagination={setPagination}
                     />
                  </div>
               </div>
            </div>
         </section>
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
