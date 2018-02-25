// @flow weak

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {saveRL} from '../../../redux/modules/routesLists';

import EditorRL from './EditorRL';

const mapStateToProps = (state) => {
  return {
    RL: state.routesLists.active
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveRL
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorRL);
