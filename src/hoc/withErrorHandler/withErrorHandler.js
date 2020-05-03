/**
 * It is a wrapper class used to handle error with respect to the axios 
 * Global error handler
 */
import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'
import useHttpErrorHandler from '../../hooks/httpErrorHandling'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        // Custom hook that provides the error object
        const [error, closeModalHandler] = useHttpErrorHandler(axios);
        return (
            <Aux>
                <Modal show={error} clicked={closeModalHandler}>
                    {/* We need to handle the null reference error */}
                    <p style={{ textAlign: 'center' }}>{error ? error.message : null}</p>
                </Modal>

                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler
