// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Table, {TableHeaderColumn, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

/*
 Обернул (приспособил) Table для удобства работы с сущностями с Id (Уникальным идентификатором)

 Новые свойства:
 onIdsSelection - вызывается при выборе и сбросе выбора строк, передает ids выбранных строк
 onRowClick - клик по строке, передает объект соответствующий строке
 checkClickedRow - (НЕ) выбирать при клике по строке
 createRowEditor - фабрика строки для редактирования
 onEditEnd - Редактирование строки окончено
 .
 .
 .
 */

export default class TableFit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIds: this.props.selectedIds,
      isEdit: false,
      editEntity: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const {selectedIds} = nextProps;
    this.setState({selectedIds});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entities.length && prevProps.entities.length < this.props.entities.length) {
      this.editRow(prevProps.entities.length);
    }
  }

  onAllRowSelection = (cmd) => {
    const {onIdsSelection, onRowSelection, children} = this.props;
    if (onRowSelection) {
      onRowSelection(cmd);
    }

    const body = children[1];
    const rows = body.props.children;
    if (cmd === 'all') {
      const selectedIds = _.union(this.props.selectedIds, rows.map(r => r.key).map(Number));
      this.setState({selectedIds});
      if (onIdsSelection) {
        onIdsSelection(selectedIds);
      }
    }
    if (cmd === 'none') {
      const deselectedIds = rows.map(r => r.key).map(Number);
      const selectedIds = _.xor(this.props.selectedIds, deselectedIds);
      this.setState({selectedIds});
      if (onIdsSelection) {
        onIdsSelection(selectedIds);
      }
    }
  };

  _onIdSelection = (id, checked) => {
    const idn = Number.parseInt(id, 10);
    const {onIdsSelection} = this.props;
    const newselectedIds = checked ?
      [...this.state.selectedIds, idn] :
      this.state.selectedIds.filter(e => e !== idn);

    this.setState({
      selectedIds: newselectedIds
    });
    if (onIdsSelection) {
      onIdsSelection(newselectedIds);
    }
  };

  _onCellClick = (rowNumber, columnNumber, event) => {
    const {
      entities, onRowClick, onCellClick,
      checkClickedRow, onIdsSelection
    } = this.props;

    if (onCellClick) {
      onCellClick(rowNumber, columnNumber, event);
    }
    if (onRowClick) {
      onRowClick(entities[rowNumber]);
    }

    if (checkClickedRow) {
      const idn = entities[rowNumber].id;
      let newselectedIds = [...this.state.selectedIds];
      if (this.state.selectedIds.indexOf(idn) === -1) {
        newselectedIds.push(idn);
      } else {
        newselectedIds = newselectedIds.filter(e => e !== idn);
      }
      if (onIdsSelection) {
        onIdsSelection(newselectedIds);
      }
      this.setState({selectedIds: newselectedIds});
    }
    if (columnNumber > 0)
      this.editRow(rowNumber);
  };

  _editRow = (rowNumber) => {
    const {editable, createRowEditor, entities, onEditEnd} = this.props;
    if (editable && createRowEditor) {
      const rowEditor = createRowEditor({...entities[rowNumber]}, (row, enterOnLastColumn) => {
        this.setState({isEdit: false}, () => {
          onEditEnd && onEditEnd(row, enterOnLastColumn);
        });
      });
      const body = this.props.children[1];
      const rows = body.props.children;
      if (rows instanceof Array && rows.length) {
        rows[rowNumber] = rowEditor;
        this.setState({isEdit: true, editEntity: entities[rowNumber]});
      }
    }
  };

  editRow = (rowNumber) => {
    const {onEditEnd} = this.props;
    const {isEdit, editEntity} = this.state;
    if(isEdit && editEntity && onEditEnd) {
      if(editEntity && onEditEnd) {
        onEditEnd(editEntity);
        this.setState({isEdit: false, editEntity: null}, () => {this._editRow(rowNumber);});
      }
    } else {
      this._editRow(rowNumber);
    }
  };

  enableAllSelect = (headerRow, allChecked) => {
    const cols = headerRow.props.children;
    if (cols instanceof Array) {
      if (cols.length && cols[0].key === 'btnAllCheckbox') {
        cols.shift();
      }
      cols.unshift(
        <TableHeaderColumn key="btnAllCheckbox" style={{width: 1, paddingLeft: 19, paddingRight: 33}}>
          <Checkbox
            double="true"
            onCheck={(e, checked) => {
              this.onAllRowSelection(checked ? 'all' : 'none');
            }}
            checked={allChecked}
          />
        </TableHeaderColumn>
      );
    }
  };

  enableSelectable = (displaySelectAll) => {
    const {entities} = this.props;
    const {selectedIds} = this.state;
    const header = this.props.children[0];
    const body = this.props.children[1];
    const rows = body.props.children || [];

    if (displaySelectAll) {
      const allLength = selectedIds.length - entities.length;
      const rowsIds = rows.map(r => Number.parseInt(r.key, 10));
      const allChecked = _.xor(selectedIds, rowsIds).length === allLength;
      this.enableAllSelect(header.props.children, allChecked);
    }

    rows.forEach((r) => {
      const cols = r.props.children;
      const styleTableRowColumn = {width: 1, paddingLeft: 19, paddingRight: 33};
      const styleWrapCheckbox = {display: 'inline-block', marginBottom: -5};

      if (cols instanceof Array) {
        if (cols.length && cols[0].key === 'btnCheckbox') {
          cols.shift();
        }
        const idn = Number.parseInt(r.key, 10);
        cols.unshift(
          <TableRowColumn key="btnCheckbox" style={styleTableRowColumn}>
            <div style={styleWrapCheckbox}>
              <Checkbox
                key={idn}
                onCheck={(e, checked) => {
                  this._onIdSelection(idn, checked);
                }}
                checked={selectedIds.indexOf(idn) !== -1}
              />
            </div>
          </TableRowColumn>
        );
      }
    }, this);
  };

  render() {
    const {selectable, displaySelectAll} = this.props;
    if (selectable) {
      this.enableSelectable(displaySelectAll);
    }

    return (
      <Table
        {...this.props}
        onCellClick={this._onCellClick}
      />
    );
  }
}

TableFit.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({})),
  onIdsSelection: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowSelection: PropTypes.func,
  onCellClick: PropTypes.func,
  editable: PropTypes.bool,
  selectable: PropTypes.bool,
  checkClickedRow: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  displaySelectAll: PropTypes.bool,
  createRowEditor: PropTypes.func,
  onEditEnd: PropTypes.func
};

TableFit.defaultProps = {
  entities: [{}],
  onIdsSelection: null,
  onRowClick: null,
  onRowSelection: null,
  onCellClick: null,
  editable: false,
  selectable: true,
  checkClickedRow: false,
  selectedIds: [],
  displaySelectAll: true,
  createRowEditor: null,
  onEditEnd: null
};
