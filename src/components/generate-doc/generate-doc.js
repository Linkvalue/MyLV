import React from 'react'
import { connect } from 'react-redux'
import Docxtemplater from 'docxtemplater'
import FileSaver from 'browser-filesaver'
import JSZipUtils from 'jszip-utils'

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

function generateDoc (user) {
  JSZipUtils.getBinaryContent('assets/raw.docx', (err, content) => {
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

export default connect(mapStateToProps)(({user}) => (
  <div>
    <button onClick={() => generateDoc(user)}>Generate doc</button>
  </div>
))
