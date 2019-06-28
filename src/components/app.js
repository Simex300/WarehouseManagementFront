import React, { Component } from 'react';

import Header from './common/header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle, faUsers, faArchive, faBoxes, faWarehouse, faSearch, faAngleLeft, faAngleRight, faAngleDown, faPlus, faSignOutAlt, faEdit, faMinus, faUser } from '@fortawesome/free-solid-svg-icons';

import Modal from './common/modal';
import ProductDetail from './products/productDetail';
import ProductAdd from './products/productAdd';

library.add(faQuestionCircle, faUsers, faArchive, faBoxes, faWarehouse, faSearch, faAngleLeft, faAngleRight, faAngleDown, faPlus, faSignOutAlt, faEdit, faMinus, faUser);

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <Header actual_page={window.location.href}/>
                {this.props.children}
                <Modal className='modal-product_detail'> <ProductDetail/> </Modal>
                <Modal className='modal-product_add'> <ProductAdd/> </Modal>
            </div>
        );
    }
}
