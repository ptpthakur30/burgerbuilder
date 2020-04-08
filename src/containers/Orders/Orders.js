/**
 * To get the order details
 */
import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

export class Orders extends Component {
    state={
        orderdetails:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            const fetchedata=[];
            for(let key in res.data)
            {
                fetchedata.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({orderdetails:fetchedata,loading:false})
        })
        .catch(error=>{this.setState({loading:false})})
    }
    render() {
        return (
            <div>
                {this.state.orderdetails.map(order=>{
                  return  <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.totalPrice} />
                })}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);
