/**
 * It is a wrapper class used to handle error with respect to the axios 
 * Global error handler
 */
import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state={
            error:null
        }

        closeModalHandler=()=>{
            this.setState({error:null});
        }

        // It will be called when the component is created , the child has not rendered
        constructor()
        {
            super();
            // We need to return the request so that the request may continue
           this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            this.resInterceptor=axios.interceptors.response.use(resp=>resp,error=>{
                this.setState({error:error})
            })
        }
        // We need to destroy the old interceptors after the component usage otherwise it may lead to data leak
        componentWillUnmount()
        {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} clicked={this.closeModalHandler}>
                        {/* We need to handle the null reference error */}
                        <p style={{textAlign:'center'}}>{this.state.error?this.state.error.message:null}</p>
                    </Modal>
                    
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler
