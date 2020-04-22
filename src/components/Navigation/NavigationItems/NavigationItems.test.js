// It describes the test cases of the navigation items
import React from 'react'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


// To connect the enzyme to the react app , it renders the standalone component 
configure({ adapter: new Adapter() })
describe('<NavigationItems />', () => {
    let wrapper = null;
    // Pass the component to the shallow, it will only render that component
    // It will run before each test cases
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it('it should render only two Navigation Items if not authenticated', () => {
        // Expect is used what to get on loading the component
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('it should render three Navigation Items if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        // Expect is used what to get on loading the component
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
})