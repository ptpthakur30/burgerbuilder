/**
 * It is custom hook used to get the 
 */
import { useState, useEffect } from 'react'

export default httpclient => {
    const [error, seterror] = useState(null);

    const closeModalHandler = () => {
        seterror(null)
    }

    // *************This will run before the component re renders**************
    // We need to return the request so that the request may continue
    const reqInterceptor = httpclient.interceptors.request.use(req => {
        seterror(null);
        return req;
    })
    const resInterceptor = httpclient.interceptors.response.use(resp => resp, err => {
        seterror(err)
    })
    // *************************************************************************

    // We need to destroy the old interceptors after the component usage otherwise it may lead to data leak
    useEffect(() => {
        // This will clean up the reqInterceptor and the resInterceptor on component unmount
        return () => {
            httpclient.interceptors.request.eject(reqInterceptor);
            httpclient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor])

    // returns the error and clear error function
    return [error, closeModalHandler];
}