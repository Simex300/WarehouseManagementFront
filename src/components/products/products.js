import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Table from '../common/table';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSelectedIndex: null,
            activeKey: ''
        }
    }
    
    componentWillMount() {
        this.props.getProducts();
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getProducts(null, search);
    }

    onKeyDown(event) {
        if(this.state.activeKey !== 'Shift' && event.key == 'Shift'){
            this.setState({activeKey: event.key});
        }
    }

    onKeyUp(event) {
        if(this.state.activeKey === 'Shift' && event.key === 'Shift'){
            this.setState({activeKey: ''});
        }
    }

    render() {
        const tableHeader = ["Product", "Price", "Weight", "Longitude"];
        const columnTable = ["name", "price", "weight", ["width", "height", "length"]];
        const templateColumn = ["[data]", "$[data]", "[data]", "w:[data] h:[data] l:[data]"]
        const tableData = this.props.products;
        const pagination = this.props.pagination;
        const tableEvents = {
            onDoubleClick: () => {
                console.log("Entering");
                // Select Product

                // Open Modal
                this.openModal('product_detail');
            },
            onClick: (event, index) => {
                const parent = event.target.parentElement;
                const allElements = document.querySelectorAll(`.table__body__row`);
                
                if(this.state.activeKey == 'Shift') {
                    if(this.state.lastSelectedIndex == null)
                        parent.classList.add('active');
                    else if(this.state.lastSelectedIndex > index){
                        const firstIndex = index;
                        const lastIndex = this.state.lastSelectedIndex;

                        allElements.forEach((element, index) => {
                            if(index >= firstIndex && index <= lastIndex)
                                element.classList.add('active');
                        })
                    }
                    else if(this.state.lastSelectedIndex < index){
                        const firstIndex = this.state.lastSelectedIndex;
                        const lastIndex = index;

                        allElements.forEach((element, index) => {
                            if(index >= firstIndex && index <= lastIndex)
                                element.classList.add('active');
                        })
                    }
                }
                else {
                    allElements.forEach(element => {
                        element.classList.remove('active');
                    });

                    if(parent.classList.contains('active'))
                        parent.classList.remove('active');
                    else
                        parent.classList.add('active');
                }
                
                this.setState({lastSelectedIndex: index});
            }
        }
        return (
            <div className='products' onKeyDownCapture={event => this.onKeyDown(event)}  onKeyUpCapture={event => this.onKeyUp(event)} tabIndex="0">
                <Searchbar className='products-searchbar' placeholder='Search a Product' onKeyUp={this.displaySearchBarInput}/>
                <div className='products__buttoms'>
                    <FormSmallButton onClick={() => this.openModal('product_detail')} className='products__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton className='products__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openModal('product_add')} className='products__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='products__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} pagination={pagination} events={tableEvents} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { products, pagination } = state.product;
    return { products, pagination };
}

export default connect(mapStateToProps, actions)(Products);