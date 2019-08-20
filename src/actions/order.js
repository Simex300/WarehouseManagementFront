import axios from 'axios';
import { reset } from 'redux-form';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_ORDERS_PER_CLIENT,
    SELECT_SINGLE_ORDER_PER_CLIENT,
    SELECT_SINGLE_ORDER_FROM_DB,
    ADD_ORDER,
    ADD_ORDER_DETAIL
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getOrdersPerClient(clientID, paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/orders`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL + `&clientID=${clientID}`)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_ORDERS_PER_CLIENT,
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

export function getSingleOrderPerClient(id){
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_ORDER_PER_CLIENT,
            payload: id
        });
    }
}

export function getSingleOrderFromDB(orderID){
    return function (dispatch) {
        axios.get(`${API_URL}/orders/${orderID}`)
            .then(response => {
                dispatch({
                    type: SELECT_SINGLE_ORDER_FROM_DB,
                    payload: response.data
                })
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function addOrder(fields, success) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/orders`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_ORDER,
                            payload: response.data
                        });
                    }
                    success(response);
                    dispatch(reset('order-add-modal'));
                })
                .catch(err => {
                    if(err)
                        console.log(err);
                });
        }
    }
}

export function addOrderDetail(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/orderdetail`, qs.stringify(fields), requestConfig)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: ADD_ORDER_DETAIL,
                        payload: response.data
                    });
                }
                success(response);
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}