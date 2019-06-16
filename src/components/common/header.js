import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import history from '../../history';

import Icon from './icon';

class Header extends Component {
    handleLogout = () => {
        const fields = {
            token: localStorage.getItem('token'),
            id: this.props.user.id
        }
        this.props.logout(fields, () => {
            history.push('/');
        })
    }

    render() {
        const { user } = this.props;
        return (
            <div className='header'>
                <div className='header__logo'>
                    Header
                </div>
                {
                    this.props.authenticated ?
                    (
                        <div className='header__user'>
                            <div className='header__user__welcome'>Welcome, {user.first_name}</div>
                            <div className='header__user__logout'>
                                <Icon className='header__user__logout__icon' icon='sign-out-alt' onClick={this.handleLogout}/>
                            </div>
                        </div>
                    ) :
                    ''
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authenticated, user } = state.auth;
    return { authenticated, user };
}

export default connect(mapStateToProps, actions)(Header);