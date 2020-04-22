/**
 * Used to return component lazily
 * Create src/hoc/asyncComponent/asyncComponent.js
 */
import React, { Component } from 'react'

const asyncComponent = (importComponent) => {
    return class extends Component{
        state={
            component:null
        }
        componentDidMount()
        {
            // This is a function that returns promise
            importComponent()
            .then(comp=>{
                this.setState({component:comp.default});
            })
        }
        render()
        {
            const C = this.state.component;
            return C?<C {...this.props} />:null;
        }
    }
}

export default asyncComponent
