// @flow weak

import { connect }            from 'react-redux';
import About                  from './About';
import {stdGetRequest} from '../../core/requests';

const mapStateToProps = state => ({
  name: state.user.name
});

const mapDispatchToProps = dispatch => ({
  getName: () => dispatch(stdGetRequest("GET_MY_NAME", '/user/name')),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
