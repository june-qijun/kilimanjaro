import React, { Component } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Mousetrap from 'mousetrap'
import { Button } from 'antd'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'
import './editor.less'

export class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readMode: false
    }
    import('highlight.js').then(highlight => {
      marked.setOptions({
        sanitizer: true,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      })
      this.forceUpdate()
    })
  }

  onChange = (e) => {
    this.props.onContentChange(e.target.value)
  }

  switchReadMode() {
    this.setState({
      readMode: !this.state.readMode
    })
  }

  componentDidMount() {
    Mousetrap(document.getElementById('editor')).bind('ctrl+s', () => {
      this.props.onCtrlS()
      return false
    })
  }

  render() {
    return (
      <div className='editor-container'>
        <div className='md-preview' style={{ width: (this.state.readMode ? '100%' : '49%') }}>
          <div className='expand-btn'>
            <Button type='primary' shape='circle' icon={this.state.readMode ? 'shrink' : 'arrows-alt'} size='small' onClick={() => { this.switchReadMode() }} />
          </div>
          <div className='markdown-body' dangerouslySetInnerHTML={{
            __html:
            marked(this.props.content)
          }} />
        </div>
        {
          this.state.readMode ? null : <div className="editor-seperator" />
        }
        {
          this.state.readMode ? null :
            <textarea id='editor' className='editor' value={this.props.content} onChange={this.onChange} readOnly={this.props.isDisabled} />
        }
      </div>
    )
  }
}

NoteEditor.propTypes = {
  onCtrlS: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
}
