// @flow weak

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentSweep from 'material-ui/svg-icons/content/delete-sweep';
import TableFit from '../../../components/TableFit';
import {headers, RouteFields} from '../utils';
import RowEditorRL from './RowEditorRL';

class EditorRL extends PureComponent {

  constructor(props) {
    super(props);

    const {id} = props.match.params;
    id && props.fetchRL(id);

    this.emptyRL = {
      id: null,
      number: '',
      date: null,
      modelCar: '',
      regNumCar: '',
      comment: '',
      routes: [],
      selectedIds: []
    };

    this.state = {
      ...this.emptyRL
    };
  }

  componentWillReceiveProps(props) {

    const {id} = props.match.params;
    const isNewRLSaved = !this.state.id || !this.props.RL.id && props.RL.id;

    // Переход на редактирование после создания
    !id && isNewRLSaved && props.history.push(`rl/${props.RL.id}`);

    if (id || isNewRLSaved) {
      // Заполнение state либо при редактировании, либо после создания
      this.setState({
        ...props.RL,
        date: props.RL.date ? new Date(props.RL.date) : null
      });
    }
    else {
      // Очистка state при переходе к созданию
      this.setState({...this.emptyRL});
    }
  }

  onChangeNumber = (e, val) => {
    this.setState({number: val})
  };

  onChangeDate = (e, val) => {
    this.setState({date: val})
  };

  onChangeModelCar = (e, val) => {
    this.setState({modelCar: val})
  };

  onChangeRegNumCar = (e, val) => {
    this.setState({regNumCar: val})
  };

  onChangeComment = (e, val) => {
    this.setState({comment: val})
  };

  createEmptyRow = () => {
    const route = {id: new Date().getTime(), fakeId: true};
    Object.keys(RouteFields).forEach((f) => {
      route[f] = '';
    });
    route.deliveryDate = null;
    return route;
  };

  onClickAddRow = () => {
    this.setState({routes: [...this.state.routes, this.createEmptyRow()]});
  };

  onClickCopyRow = () => {
    const {routes, selectedIds} = this.state;
    const copyRoutes = [];
    routes.filter(r => selectedIds.indexOf(r.id) !== -1).forEach(r => {
      copyRoutes.push({...r, id: new Date().getTime(), fakeId: true});
    });
    this.setState({
      routes: [...routes, ...copyRoutes],
      selectedIds: []
    });
  };

  onClickDelRow = () => {
    const {routes, selectedIds} = this.state;
    this.setState({
      routes: routes.filter(r => selectedIds.indexOf(r.id) === -1),
      selectedIds: []
    });
  };

  onEditEnd = (route, createNext) => {
    const erts = this.state.routes.map(r => r.id === route.id ? route : r);
    const routes = createNext ? [...erts, this.createEmptyRow()] : erts;
    this.setState({routes});
  };

  onIdsSelection = (selectedIds) => {
    this.setState({selectedIds});
  };

  save = () => {
    const {updateRL, saveRL, history} = this.props;
    const {id, date, routes} = this.state;

    const data = {};
    Object.keys(this.emptyRL).forEach(p => {
      data[p] = this.state[p];
    });
    data.date = date && date.getTime();
    data.routes = routes.map((r) => {
      const route = {...r};
      if (route.fakeId) {
        delete route.id;
        delete route.fakeId;
      }
      return route;
    });

    if (id) {
      updateRL(data);
      history.push('/rls');
    } else {
      saveRL(data);
    }
  };

  // Получение строки LocaleDateString из даты, полученной в милисекундах
  getLocaleDateString = date => (date ? new Date(date).toLocaleDateString() : null);

  body = (entities) => (entities || []).map(
    rowData => (
      <TableRow key={rowData.id}>
        {Object.keys(RouteFields).map((f) => <TableRowColumn
          key={f}>{f === 'deliveryDate' ? this.getLocaleDateString(rowData[f]) : rowData[f]}</TableRowColumn>)}
      </TableRow>
    )
  );

  createRowEditor = (route, onEditEnd) => (
    <RowEditorRL data={route} onEditEnd={onEditEnd}/>
  );

  render() {
    const {id} = this.props.match.params;
    const styleFlex = {display: 'flex', flexFlow: 'row wrap', padding: 5};
    const {number, date, modelCar, regNumCar, comment, routes, selectedIds} = this.state;
    return (
      <div style={{padding: 16}}>
        <div style={styleFlex}>
          <h3 style={{marginTop: 0}}>
            {id ? 'Редактирование МЛ №' + id : 'Создание маршрутного листа (МЛ)'}
          </h3>
          <div style={{width: 16}}/>
          <RaisedButton
            primary
            labelPosition="before"
            label={id ? 'Сохранить' : 'Создать'}
            icon={<ContentSave />}
            onClick={this.save}
          />
        </div>
        <div style={styleFlex}>
          <TextField
            floatingLabelText="Номер"
            value={number}
            onChange={this.onChangeNumber}
          />
          <div style={{width: 16}}/>
          <DatePicker
            autoOk
            container="inline"
            floatingLabelText="Дата"
            value={date}
            onChange={this.onChangeDate}
          />
          <div style={{width: 272}}/>
          <TextField
            multiLine
            style={{width: 512}}
            floatingLabelText="Комментарий"
            value={comment || ''}
            onChange={this.onChangeComment}
          />
        </div>
        <div style={styleFlex}>
          <AutoComplete
            floatingLabelText="Заказчик"
            dataSource={['1', '2']}
          />
          <div style={{width: 16}}/>
          <AutoComplete
            floatingLabelText="Склад назначения"
            dataSource={['3', '4']}
          />
          <div style={{width: 16}}/>
          <TextField
            floatingLabelText="Машина"
            value={modelCar}
            onChange={this.onChangeModelCar}
          />
          <div style={{width: 16}}/>
          <TextField
            floatingLabelText="Рег. №"
            value={regNumCar}
            onChange={this.onChangeRegNumCar}
          />
        </div>
        <div style={styleFlex}>
          <h4 style={{marginBottom: 0}}>
            Таблица маршрутов
          </h4>
          <div style={{width: 16}}/>
          <RaisedButton
            primary
            labelPosition="before"
            label="Удалить маршруты"
            onClick={this.onClickDelRow}
            icon={<ContentSweep />}
            disabled={!selectedIds.length}
          />
          <div style={{width: 16}}/>
          <RaisedButton
            primary
            labelPosition="before"
            label="Копировать маршрут"
            onClick={this.onClickCopyRow}
            disabled={selectedIds.length !== 1}
          />
        </div>
        <TableFit
          multiSelectable
          selectedIds={selectedIds}
          onIdsSelection={this.onIdsSelection}
          createRowEditor={this.createRowEditor}
          onEditEnd={this.onEditEnd}
          editable
          entities={routes}
        >
          {headers()}
          <TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
            { this.body(routes) }
          </TableBody>
        </TableFit>
        <div style={styleFlex}>
          <RaisedButton
            primary
            labelPosition="before"
            label="Добавить маршрут"
            onClick={this.onClickAddRow}
            icon={<ContentAdd />}
            disabled={selectedIds.length === 10}
          />
          <div style={{width: 16}}/>
          <RaisedButton
            primary
            labelPosition="before"
            label={id ? 'Сохранить' : 'Создать'}
            icon={<ContentSave />}
            onClick={this.save}
          />
        </div>
      </div>
    );
  }
}

EditorRL.propTypes = {
  // react-router 4:
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  RL: PropTypes.object,
  saveRL: PropTypes.func.isRequired,
  updateRL: PropTypes.func.isRequired,
  fetchRL: PropTypes.func.isRequired
};

export default EditorRL;
