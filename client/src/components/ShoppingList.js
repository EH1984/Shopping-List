import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = props => {
  useEffect(() => {
    props.getItems();
  }, []);

  const { items } = props.item;

  const onDeleteClick = id => {
    props.deleteItem(id);
  };

  return (
    <Container>
      {/* <Button
        color='dark'
        styel={{ marginBottom: '2rem' }}
        onClick={() => {
          const name = prompt('Enter Item');
          if (name) {
          }
        }}
      >
        Add Item
      </Button> */}
      <ListGroup>
        <TransitionGroup className='shopping-list mt-5'>
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() => onDeleteClick(_id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
