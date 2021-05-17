import React, { useState } from "react";
import { Modal, Button, Carousel } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import { Slider } from "pure-react-carousel";
import _ from "lodash";

const contentStyle = {
   height: "160px",
   color: "#fff",
   lineHeight: "160px",
   textAlign: "center",
   background: "#364d79"
};

const ImageComponent = (props) => {
   return (
      <>
         <Modal title='Hình ảnh' visible={props.isModalVisibleImage} onCancel={props.onCancel} width='700px'>
            <Carousel
               autoplay
               naturalSlideWidth={100}
               naturalSlideHeight={160}
               totalSlides={props.urlImage?.length || 0}
               visibleSlides={1}
               step={1}>
               {(props.urlImage || []).map((item, index) => {
                  return (
                     <img src={item.url ? firstImage(item.url) : "images/destination-img7.jpg"} alt='Destination-img' />
                  );
               })}
            </Carousel>
         </Modal>
      </>
   );
};

export default ImageComponent;
