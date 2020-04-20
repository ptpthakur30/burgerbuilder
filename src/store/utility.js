/**
 * It is a function to enhance the reducers
 */
const updateObject = (oldState, updatedProperties) => {
    return {
        ...oldState,
        ...updatedProperties
    }
}

export default updateObject
