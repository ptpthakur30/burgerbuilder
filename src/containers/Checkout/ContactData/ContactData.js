import React, { Component } from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import Axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
export class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderDetails = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: {
                name: 'testUser',
                address: {
                    street: '123 street',
                    zipCode: '420001',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        Axios.post('/orders.json', orderDetails)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => this.setState({ loading: false }));
    }
    render() {
        let form = (
            <Aux>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='Enter Name' />
                    <input type='email' name='email' placeholder='Enter Email' />
                    <input type='text' name='street' placeholder='Street' />
                    <input type='text' name='postalcode' placeholder='Postal Code' />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </Aux>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData
