import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  ButtonToggle
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const Login = props => {
  const [modal, changeModal] = useState(false);
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [msg, changeMsg] = useState('');

  useEffect(() => {
    if (props.error.id === 'LOGIN FAIL') {
      changeMsg(props.error.msg.msg);
    }

    //Close modal window on authentication
    if (modal) {
      if (props.isAuthenticated) {
        toggle();
      }
    }
  }, [props.error, props.isAuthenticated]);

  const toggle = () => {
    // Clear Errors
    props.clearErrors();
    changeModal(!modal);
  };

  const onChangeEmail = e => {
    changeEmail(e.target.value);
  };

  const onChangePassword = e => {
    changePassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    props.login(user);
  };

  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='text'
                name='email'
                id='email'
                placeholder='Enter your email address'
                onChange={onChangeEmail}
                className='mb-3'
              />
              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Enter your password'
                onChange={onChangePassword}
                className='mb-3'
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
