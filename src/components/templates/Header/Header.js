import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import SVG from 'atoms/SVG';
import logo from 'static/logo/logo.svg';
import left from 'static/images/chevron_left.svg';
import { selectAuthenticated } from '../../../lib/utils';
import { logout as logoutAction } from '../../../store/reducers/auth';
import HeaderWrapper from './Header.styled';

const Header = ({ back, title, rightGroup }) => {
  const history = useHistory ();
  return (
    <HeaderWrapper>
      <div className="container">
        <div>
          {back ? (
            <>
              <img alt="Go back" src={left} style={{ width: '15px', height: 'auto' }} onClick={history.goBack} />
              {title && <h1>{title}</h1>}
            </>
          ) : (
            <NavLink to="/">
              <img alt="logo" src={logo} style={{ width: '70px', height: '30px' }} />
            </NavLink>
          )}
        </div>
        {rightGroup}
      </div>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
  rightGroup: PropTypes.element,
};

Header.defaultProps = {
  back: false,
  title: '',
  rightGroup: null,
};

Header.AuthDropdown = () => {
  const dispatch = useDispatch ();
  const isAuthenticated = useSelector (selectAuthenticated);
  const logout = () => dispatch (logoutAction ());
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <NavLink to="/my-page" size="md" className="user-icon">
            <SVG icon="user" />
          </NavLink>

          <a href="#" onClick={logout}>
            Logout
          </a>
        </div>
      ) : (
        <NavLink to="/auth/login">Login</NavLink>
      )}
    </div>
  );
};

export default Header;
