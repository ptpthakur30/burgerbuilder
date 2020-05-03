/**
 * To get the order details
 */
import React, { useEffect } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import { connect } from 'react-redux'
import * as orderReducer from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

export const orders = props => {

    const { onFetchOrderStart } = props;
    useEffect(() => {
        // passing the auth token
        onFetchOrderStart(props.token, props.userId);
    }, [onFetchOrderStart])

    const orderDetails = props.loading ? <Spinner /> : (
        <div>
            {props.orders.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.totalPrice} />
            })}
        </div>
    )
    return orderDetails;

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrderStart: (token, userId) => dispatch(orderReducer.fetchOrders(token, userId))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
