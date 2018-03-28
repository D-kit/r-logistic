// @flow weak

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class PageRL extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    RLs: PropTypes.object,
    fetchPageRL: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {search: ''};
    props.fetchPageRL();
  }

  onChangeSearch = (e, val) => {
    this.setState({search: val})
  };

  header = () => (
    <TableRow>
      <TableHeaderColumn>№</TableHeaderColumn>
      <TableHeaderColumn>Дата</TableHeaderColumn>
      <TableHeaderColumn>Грузоотправитель</TableHeaderColumn>
      <TableHeaderColumn>Статус</TableHeaderColumn>
      <TableHeaderColumn>Марка автомобиля</TableHeaderColumn>
      <TableHeaderColumn>Госномер автомобиля</TableHeaderColumn>
    </TableRow>
  );

  body = () => this.props.RLs.content.map(rl => (
    <TableRow
      key={rl.id}
      onDoubleClick={() => {
        this.props.history.push(`/rl/${rl.id}`);
      }}
    >
      <TableRowColumn>{rl.number}</TableRowColumn>
      <TableRowColumn>{new Date(rl.date).toLocaleDateString()}</TableRowColumn>
      <TableRowColumn>{rl.shipperOrganization}</TableRowColumn>
      <TableRowColumn>{rl.status}</TableRowColumn>
      <TableRowColumn>{rl.modelCar}</TableRowColumn>
      <TableRowColumn>{rl.regNumCar}</TableRowColumn>
    </TableRow>
  ));

  render() {
    return (
      <div style={{padding: 16}}>
        <h3 style={{marginTop: 0}}>
          Маршрутные листы (МЛы)
        </h3>
        <TextField
          floatingLabelText="Поиск"
          value={this.state.search}
          onChange={this.onChangeSearch}
        />
        <Table>
          <TableHeader displaySelectAll={false}>
            {this.header()}
          </TableHeader>
          <TableBody>
            {this.body()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default PageRL;
