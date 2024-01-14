import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({isAuthenticated, token, children }) => {
      return (
            (isAuthenticated && token) ? children : <Navigate to="/login" />
      );
}

const mapStateToProps = (state) => ({
      isAuthenticated: state.user.isAuthenticated,
      token: state.user.token,
  });

export default connect(mapStateToProps, null)(PrivateRoute);