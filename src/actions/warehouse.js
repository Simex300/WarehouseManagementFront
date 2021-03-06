import axios from 'axios';
import { reset } from 'redux-form';

import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_WAREHOUSES,
    SELECT_SINGLE_WAREHOUSE,
    ADD_WAREHOUSES,
    EDIT_WAREHOUSES,
    DELETE_WAREHOUSES,
    DISPLAY_WAREHOUSE,

    // Stock
    GET_WAREHOUSE_STOCK,
    SELECT_SINGLE_WAREHOUSE_STOCK,
    ADD_WAREHOUSE_STOCK,
    EDIT_WAREHOUSE_STOCK,
    DELETE_WAREHOUSE_STOCK,
    
    // Location 
    GET_WAREHOUSE_LOCATIONS,
    ADD_WAREHOUSE_LOCATION,
    DELETE_WAREHOUSE_LOCATION,
    SELECT_SINGLE_WAREHOUSE_LOCATION,
    GET_WAREHOUSE_STOCK_LOCATION
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getWarehouses(paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/warehouses`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_WAREHOUSES,
                        payload: response.data
                    });
                }
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}

export function selectSingleWarehouse(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_WAREHOUSE,
            payload: id
        });
    }
}

export function selectSingleWarehouseFromDB(id) {
    return function (dispatch) {
        axios.get(`${API_URL}/warehouses/${id}`)
            .then(response => {
                dispatch({
                    type: DISPLAY_WAREHOUSE,
                    payload: response.data
                })
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function addWarehouse(fields, success, error) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/warehouses`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_WAREHOUSES,
                            payload: response.data
                        });
                    }
                    success();
                })
                .catch(err => {
                    if(err)
                        error(err.response.data.error)
                });
        }
    }
    else {
        return function (dispatch) {
            axios.put(`${API_URL}/warehouses/${fields.id}`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: EDIT_WAREHOUSES,
                            payload: response.data
                        });
                    }
                    success();
                })
                .catch(err => {
                    if(err)
                        console.log(err);
                });
        }
    }
}

export function deleteWarehouse(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/warehouses/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_WAREHOUSES,
                        payload: id
                    });
                }
                success();
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

// Stock

export function getStockPerWarehouse(warehouse, paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/stock`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL + `&warehouse=${warehouse}`)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_WAREHOUSE_STOCK,
                        payload: response.data
                    });
                }
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}

export function selectSingleStock(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_WAREHOUSE_STOCK,
            payload: id
        });
    }
}

export function addStock(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/stock`, qs.stringify(fields), requestConfig)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: ADD_WAREHOUSE_STOCK,
                        payload: response.data
                    });
                }
                success(response);
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });

        dispatch(reset('stock-add'));
    }
}

export function editStock(fields, success) {
    return function (dispatch) {
        axios.put(`${API_URL}/stock/${fields.id}`, qs.stringify(fields), requestConfig)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: EDIT_WAREHOUSE_STOCK,
                        payload: response.data
                    });
                }
                success(response);
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });

        dispatch(reset('stock-add'));
    }
}

export function deleteStock(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/stock/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_WAREHOUSE_STOCK,
                        payload: id
                    });
                }
                success();
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function getStockLocations(product_warehouseID){
    const requestURL = `${API_URL}/stock/location/${product_warehouseID}`;
    return function (dispatch) {
        axios.get(requestURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_WAREHOUSE_STOCK_LOCATION,
                        payload: response.data
                    });
                }
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}
// Location

export function getLocationPerWarehouse(warehouse, paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/location`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL + `&warehouse=${warehouse}`)
        .then(response => {
            if(response.data){
                dispatch({
                    type: GET_WAREHOUSE_LOCATIONS,
                        payload: response.data
                    });
                }
            })
            .catch(err => {
                if(err)
                console.log(err);
            });
        }
}

export function selectSingleLocation(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_WAREHOUSE_LOCATION,
            payload: id
        });
    }
}

export function addLocation(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/location`, qs.stringify(fields), requestConfig)
        .then(response => {
                if(response.data){
                    dispatch({
                        type: ADD_WAREHOUSE_LOCATION,
                        payload: response.data
                    });
                }
                success(response);
            })
            .catch(err => {
                if(err)
                console.log(err);
            });
            
            dispatch(reset('location-add'));
        }
    }

export function deleteLocation(fields, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/location/0`, {...requestConfig, data: qs.stringify(fields)})
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_WAREHOUSE_LOCATION,
                        payload: fields
                    });
                }
                success(response);
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}