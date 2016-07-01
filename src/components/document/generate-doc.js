import React, { Component } from 'react'
import { connect } from 'react-redux'
import Docxtemplater from 'docxtemplater'
import FileSaver from 'browser-filesaver'
import JSZipUtils from 'jszip-utils'

const styles = {
  generate: {
    marginTop: 15,
    padding: 10
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

class GenerateDoc extends Component {
  constructor (props) {
    super(props)

    this.generateDoc = this.generateDoc.bind(this)
  }

  generateDoc () {
    const { user } = this.props
    const loadFiles = (url, callback) => {
      JSZipUtils.getBinaryContent(url, callback)
    }

    loadFiles('./src/assets/raw.docx', (err, content) => {
      if (err) {
        throw err
      }
      const doc = new Docxtemplater(content)

      doc.setData({
        firstName: user.firstName,
        lastName: user.lastName
      })
      doc.render()
      const out = doc.getZip().generate({ type: 'blob' })
      FileSaver.saveAs(out, 'output.docx')
    })
  }

  render () {
    return (
      <div>
        <button style={styles.generate} onClick={this.generateDoc}>Generate doc</button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(GenerateDoc)
