// @flow weak

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class EditorRL extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    RL: PropTypes.object,
    saveRL: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {number: '', ...props.RL};
  }

  onChangeNumber = (e, val) => {
    this.setState({number: val})
  };

  save = () => {
    this.props.saveRL({...this.state});
  };

  render() {
    const styleFlex = {display: 'flex', flexFlow: 'row wrap'};
    return (
      <div style={{padding: 32}}>
        <h3 style={{marginTop: 0}}>
          Маршрутный лист (МЛ)
        </h3>
        <RaisedButton
          label="Сохранить"
          onClick={this.save}
        />
        <div style={styleFlex}>
          <TextField
            hintText="Номер"
            value={this.state.number}
            onChange={this.onChangeNumber}
          />
          <div style={{width: 16}}/>
          <DatePicker
            autoOk
            container="inline"
            hintText="Дата"
          />
        </div>
        <div style={styleFlex}>
          <AutoComplete
            hintText="Заказчик"
            dataSource={['Центр', 'Запад']}
          />
          <div style={{width: 16}}/>
          <AutoComplete
            hintText="Склад назначения"
            dataSource={['Ростов-на-Дону', 'Краснодар']}
          />
        </div>
        <h4>
          Таблица маршрутов
        </h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>№</TableHeaderColumn>
              <TableHeaderColumn>Откуда</TableHeaderColumn>
              <TableHeaderColumn>Куда</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>Москва</TableRowColumn>
              <TableRowColumn>Ростов-на-Дону</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default EditorRL;
