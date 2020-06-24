import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import Icon from '../common/icon';
import StatusCircle from '../common/statusCircle';
import Modal from '../common/modal';
import { Heading } from '../common/headings';
import { FormSmallButton } from '../formFields';
import OrderAssignUser from './orderAssignUser';

class OrderHold extends Component {

    componentWillMount() {
        this.props.getOrdersPerStatus(3);
    }

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getOrdersPerStatus(3, null, search);
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }

    openAssignUser = (orderID) => {
        this.props.getSingleOrderFromDB(orderID);
        this.openModal('assign_user');
    }

    startOrder() {

    }

    cancelOrder() {

    }

    render() {
        const data = this.props.orders;
        return (
            <div className='orders-hold'>
                <Heading className='orders-hold__heading'>Hold Orders</Heading>
                <Searchbar className='orders-hold__searchbar' placeholder='Search by Order Number' onKeyUp={this.displaySearchBarInput} />
                <div className='orders-hold__body'>
                    <div className='orders-hold__body__list'>
                        {
                            data ?
                            data.map((order, index) => {
                                return (
                                    <div key={index} className='orders-hold__body__list__list-item'>
                                        <div className='orders-hold__body__list__list-item__status'><StatusCircle className='orders-hold__body__list__list-item__status__status-circle' status='available'/></div>
                                        <div className='orders-hold__body__list__list-item__icon'><Icon className='orders-hold__body__list__list-item__icon__icon' icon='box-open' /></div>
                                        <div className='orders-hold__body__list__list-item__order'>Order #: {order.id}</div>
                                        <div className='orders-hold__body__list__list-item__agent'>{order.client.first_name} {order.client.last_name} {order.order_users.length > 0 ? `- Assigned to ${order.order_users[order.order_users.length - 1].first_name} ${order.order_users[order.order_users.length - 1].last_name}` : ""} </div>
                                        <div className='orders-hold__body__list__list-item__buttons'>
                                            <FormSmallButton onClick={() => this.openAssignUser(order.id)} className='orders-hold__body__list__list-item__buttons__button' type='button' icon='user-plus'/>
                                            <FormSmallButton onClick={() => this.startOrder()} className='orders-hold__body__list__list-item__buttons__button' type='button' icon='check'/>
                                            <FormSmallButton onClick={() => this.cancelOrder()} className='orders-hold__body__list__list-item__buttons__button danger' type='button' icon='minus'/>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            ""
                        }
                    </div>
                </div>
                
                <Modal className='modal-assign_user'> <OrderAssignUser /> </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pagination, orders } = state.order;
    return { pagination, orders };
}

export default connect(mapStateToProps, actions)(OrderHold);