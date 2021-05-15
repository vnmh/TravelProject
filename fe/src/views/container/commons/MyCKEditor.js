import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import React from 'react';
import styled from 'styled-components';
import MyCustomUploadAdapterPlugin from '~/views/container/commons/MyCustomUploadAdapterPlugin';


// import CKEditor from 'ckeditor4-react';

const CKEditorStyle = styled.div`
  div.ck-editor__main {
	div.ck-content {
	  min-height: 150px;
	}
  }
`

export default class MyCKEditor extends React.PureComponent {
  render(){
	const {
	  data,
	  disabled,
	  onChange =(event, editor)=>{}
	} = this.props
	return <CKEditorStyle >

			  <CKEditor
			  		disabled={disabled}
					editor={ ClassicEditor }
					data={data}
					config={{
						extraPlugins: [ MyCustomUploadAdapterPlugin ],
						mediaEmbed: {previewsInData: true} 
					}}
					onInit={ editor => {
						// You can store the "editor" and use when it is needed.
						 
					} }
					onChange={ onChange }
					onBlur={ ( event, editor ) => {
						 
					} }
					onFocus={ ( event, editor ) => {
						 
					} }
				/>
	</CKEditorStyle>
  }
}