import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import MyPage from './MyPage';

import { setCurrentGroup } from '../../../store/reducers/auth';
import { selectAuthenticated } from '../../../lib/utils';

class MyPageContainer extends PureComponent {
  render () {
    return <MyPage {...this.props} />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: selectAuthenticated (state),
  info: state.getIn (['auth', 'info']),
});

const mapDispatchToProps = {
  setCurrentGroup,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (MyPageContainer));
