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
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = props => {
  const [modal, changeModal] = useState(false);
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [msg, changeMsg] = useState(null);

  useEffect(() => {
    if (props.error.id === 'REGISTER FAIL') {
      changeMsg(props.error.msg.msg);
    } else {
      changeMsg(null);
      console.log(msg);
    }

    // If authenticated close modal
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

  const onChangeName = e => {
    changeName(e.target.value);
  };

  const onChangeEmail = e => {
    changeEmail(e.target.value);
  };

  const onChangePassword = e => {
    changePassword(e.target.value);
  };

  const onChangeMsg = e => {
    onChangeMsg(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    // Create User object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    props.register(newUser);
  };

  return (
    <div>
      <NavLink onClick={toggle} href={'#'}>
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Enter your full name'
                onChange={onChangeName}
              />
              <Label for='email' className='mt-3'>
                Email
              </Label>
              <Input
                type='text'
                name='email'
                id='email'
                placeholder='Enter email address'
                onChange={onChangeEmail}
              />
              <Label for='password' className='mt-3'>
                Password
              </Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Enter password'
                onChange={onChangePassword}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
