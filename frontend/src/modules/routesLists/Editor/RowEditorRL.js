// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
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

  componentWillUnmount() {
    const {onEditClick, onEditEnd} = this.props;
    const {dataRow} = this.state;
    if (onEditClick) onEditClick(dataRow);
    if (onEditEnd) onEditEnd(dataRow);
  }

  render() {
    const styleTableRowColumn = {width: 56, paddingLeft: 7, paddingRight: 0};
    const styleWrap = {display: 'inline-block', marginBottom: 0};
    const {onEditClick, onEditEnd, data} = this.props;
    const {dataRow} = this.state;
    return (
      <TableRow key={data.id}>
        <TableRowColumn key="btnCheckbox" style={styleTableRowColumn}>
          <div style={styleWrap}>
            <IconButton
              onClick={() => {
                if (onEditClick) onEditClick(dataRow);
                if (onEditEnd) onEditEnd(dataRow);
              }}
            >
              <ContentSave />
            </IconButton>
          </div>
        </TableRowColumn>
        {
          Object.keys(RouteFields).map((f) =>
            <TableRowColumn key={f}>
              <TextField
                hintText={RouteFields[f]}
                value={dataRow[f]}
                onChange={
                  (e, val) => {
                    const row = {};
                    row[f] = val;
                    this.setState({dataRow: {...dataRow, ...row}});
                  }
                }
              />
            </TableRowColumn>
          )
        }
      </TableRow>
    );
  }
}

RowEditorRL.propTypes = {
  id: PropTypes.number,
  onEditEnd: PropTypes.func,
  onEditClick: PropTypes.func
};
