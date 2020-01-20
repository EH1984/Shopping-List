import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const registerModal = props => {
  const [modal, changeModal] = useState(false);
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [msg, changeMsg] = useState(null);

  toggle = () => {
    changeModal(!modal);
  };

  onChange = e => {
    console.log(e.target.name);
  };

  onSubmit = e => {
    e.preventDefault();

    // Close Modal
    toggle();
  };

  return (
    <div>
      <NavLink onClick={toggle}></NavLink>
    </div>
  );
};

registerModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {})(registerModal);
