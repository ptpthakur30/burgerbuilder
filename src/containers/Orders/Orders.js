/**
 * To get the order details
 */
import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import { connect } from 'react-redux'
import * as orderReducer from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

export class Orders extends Component {

    componentDidMount() {
        // passing the auth token
        this.props.onFetchOrderStart(this.props.token);
    }
    render() {
        const orderDetails = this.props.loading ? <Spinner /> : (
            <div>
                {this.props.orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.totalPrice} />
                })}
            </div>
        )
        return orderDetails;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrderStart: (token) => dispatch(orderReducer.fetchOrders(token))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
