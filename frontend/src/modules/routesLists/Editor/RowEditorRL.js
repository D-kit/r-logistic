// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import {RouteFields} from '../utils';

export default class RowEditorRL extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataRow: props.data
    };
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onEditEnd(this.state.dataRow, true);
    }
  };

  render() {
    const styleTableRowColumn = {width: 56, paddingLeft: 7, paddingRight: 0};
    const styleWrap = {display: 'inline-block', marginBottom: 0};
    const {onEditEnd} = this.props;
    const {dataRow} = this.state;
    const cols = Object.keys(RouteFields);
    return (
      <TableRow key={dataRow.id}>
        <TableRowColumn key="btnCheckbox" style={styleTableRowColumn}>
          <div style={styleWrap}>
            <IconButton onClick={() => {
              onEditEnd(dataRow);
            }}>
              <ContentSave />
            </IconButton>
          </div>
        </TableRowColumn>
        {
          cols.map((f) => {
            switch (f) {
              case 'deliveryDate':
                return (
                  <TableRowColumn key={f}>
                    <DatePicker
                      autoOk
                      container="inline"
                      hintText={RouteFields[f]}
                      value={dataRow[f] && new Date(dataRow[f])}
                      onChange={
                        (e, val) => {
                          const row = {};
                          row[f] = val.getTime();
                          this.setState({dataRow: {...dataRow, ...row}});
                        }
                      }
                    />
                  </TableRowColumn>
                );
              default:
                return (
                  <TableRowColumn key={f}>
                    <TextField
                      id={f}
                      hintText={RouteFields[f]}
                      value={dataRow[f]}
                      fullWidth
                      onKeyPress={f === 'weight' ? this.onKeyPress : null}
                      onChange={
                        (e, val) => {
                          const row = {};
                          row[f] = val;
                          this.setState({dataRow: {...dataRow, ...row}});
                        }
                      }
                    />
                  </TableRowColumn>
                );
            }
          })
        }
      </TableRow>
    );
  }
}

RowEditorRL.propTypes = {
  id: PropTypes.number,
  onEditEnd: PropTypes.func.isRequired
};
