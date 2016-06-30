import React, { Component } from 'react'
import { connect } from 'react-redux'
import Docxtemplater from 'docxtemplater'
import FileSaver from 'browser-filesaver'
import JSZipUtils from 'jszip-utils'

class GenerateDoc extends Component {
  constructor (props) {
    super(props)

    this.generateDoc = this.generateDoc.bind(this)
  }

  generateDoc () {
    const loadFiles = (url, callback) => {
      JSZipUtils.getBinaryContent(url, callback)
    }

    loadFiles('./src/assets/raw.docx', (err, content) => {
      if (err) {
        throw err
      }
      const doc = new Docxtemplater(content)

      doc.setData({
        firstName: 'Gabriel',
        lastName: 'Hofman'
      })
      doc.render()
      const out = doc.getZip().generate({ type: 'blob' })
      FileSaver.saveAs(out, 'output.docx')
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.generateDoc}>Generate doc</button>
      </div>
    )
  }
}

export default connect()(GenerateDoc)
