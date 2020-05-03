import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/index'

const logout = props => {
    const {onlogout} = props;
    // when this component is moumted the authentication tokens will get clear
    useEffect(()=>{
        onlogout();
    },[onlogout]);
        // It will redirect to the home page after authetication is cleared
        return <Redirect to="/" />
}
const mapDispatchToProps = dispatch => {
    return {
        // Give braces after the function call actionTypes.authLogout()
        onlogout: () => dispatch(actionTypes.authLogout())
    };
}
export default connect(null, mapDispatchToProps)(logout)
