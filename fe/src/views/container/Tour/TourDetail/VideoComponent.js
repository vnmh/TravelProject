import React, { useState } from "react";
import { Modal, Button } from "antd";
import ReactPlayer from "react-player";

const VideoComponent = (props) => {
   return (
      <>
         <Modal title='Video' visible={props.isModalVisible} onCancel={props.onCancel} width="700px">
            <ReactPlayer url={props.urlVideo} />
         </Modal>
      </>
   );
};

export default VideoComponent;
