import React, { useEffect, useState } from "react";
import { Card, Tabs, Tree } from "antd";

import styled from "styled-components";
import _ from "lodash";

const { TabPane } = Tabs;

const Wrapper = styled.div`
   border-radius: 0.5em;
   border: 1px solid #ccc;
   overflow: hidden;
   .ant-card-head {
      background: #fafafa;
   }
`;
const TreeStyle = styled(Tree)`
   .ant-tree-checkbox-checked .ant-tree-checkbox-inner {
      background-color: #3bff1e;
      border-color: #17ff6b;
   }
   .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {
      background-color: #3bff1e;
   }
   .ant-tree-node-selected {
      background-color: #ccff8c !important;
   }

   .ant-tree-switcher-leaf-line {
      position: relative !important;
   }
`;
const TabPaneStyled = styled(TabPane)`
   max-height: 400px;
   overflow-y: scroll;
`;

function Category({ changed, options, checked }) {
   const [expandedKeys, setExpandedKeys] = useState([]);
   const [selectedKeys, setSelectedKeys] = useState([]);
   const [checkedKeys, setCheckedKeys] = useState([]);

   useEffect(() => {
      const key = checked ? [checked] : [];
      if (options.length > 0) {
         setCheckedKeys(key);
      }
   }, [checked, options]);

   const onExpand = (expandedKeys) => {
      setExpandedKeys(expandedKeys);
   };

   const onCheck = (checkedKeys) => {
      const checked = _.last(checkedKeys.checked);
      setCheckedKeys([checked]);
      changed(checked);
   };
   return (
      <Wrapper>
         <Card
            title={strings.category}
            bordered={false}
            style={{ width: "100%" }}
            headStyle={{
               height: "30px",
               lineHeight: "30px",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center"
            }}>
            <Tabs defaultActiveKey='1' type='card' size='small'>
               <TabPane tab={strings.category_all} key='1'>
                  <TreeStyle
                     multiple={false}
                     onExpand={onExpand}
                     expandedKeys={expandedKeys}
                     onCheck={onCheck}
                     checkedKeys={checkedKeys}
                     selectable={false}
                     treeData={options}
                     checkStrictly={true}
                     checkable={true}
                     height='400px'
                  />
               </TabPane>
               <TabPane tab={strings.category_always} key='2'>
                  Content of card tab 2
               </TabPane>
            </Tabs>
         </Card>
      </Wrapper>
   );
}

export default Category;
