import React, { Component } from 'react'

export default class Table extends Component {
  render () {
    let { columnNames, children } = this.props
    return (
      <div className='my-table'>
        <table>
          <thead>
            <tr>
              {
                columnNames.map((item, index) => {
                  return (
                    <th key={index}>{item}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    )
  }
}
