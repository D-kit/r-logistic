// @flow weak

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchPageRL} from '../../../redux/modules/routesLists';
import PageRL from './PageRL';

const mapStateToProps = (state) => {
  return {
    RLs: state.routesLists.entities
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchPageRL
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageRL);
