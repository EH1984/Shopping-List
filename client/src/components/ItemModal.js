import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ItemModal = props => {
  const [modal, changeModal] = useState(false);
  const [name, changeName] = useState('');

  const toggle = () => changeModal(!modal);

  const onChange = e => {
    changeName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name
    };

    props.addItem(newItem);

    toggle();
  };

  return (
    <div>
      <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                type='text'
                name='name'
                id='item'
                placeholder='Add Shopping Item'
                onChange={onChange}
              ></Input>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

ItemModal.propTypes = {
  item: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);
