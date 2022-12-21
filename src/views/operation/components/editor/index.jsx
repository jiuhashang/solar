import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props)
    const html = props.editorState
    if (html) {
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty()
      }
    }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://123.60.52.140:7800/huawei/uploadFile')
        xhr.setRequestHeader('Authorization', `Client-ID ${localStorage.getItem('token')}`)
        const data = new FormData()
        data.append('file', file)
        xhr.send(data)
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText)
          const url = response.data.url
          resolve({data: {link: url}})
        })
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText)
          reject(error)
        })
      }
    )
  }
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  render() {
    const { editorState } = this.state
    return (
      <Editor
        editorState={editorState}
        editorStyle={{border: '1px solid black', minHeight: 200, padding: 10}}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: this.uploadImageCallBack,
            previewImage: true,
            inputAccept: 'image/*',
            alt: {present: false, mandatory: false,previewImage: true}
          },
        }}
      />
    )
  }
}
