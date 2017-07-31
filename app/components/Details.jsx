import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { itemFetchData } from '../actions';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  paddingTop:5
};

class Details extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData('http://localhost:3000/customers/'+parseInt(this.props.match.params.id));
    }

    getSelectedItem(){
        let itemId = parseInt(this.props.match.params.id);
        let items = this.props.items;
        let selectedItem = items.filter((item) => {
            var eql = (item.id === itemId);
            return eql;
        })[0];
        return selectedItem;
    }

    render() {
        let selectedItem = this.props.item;
        let fullName = selectedItem.first_name + " "+selectedItem.last_name ;
        let title = fullName + " Details";
        if (this.props.hasErrored) {
            return (<p>Sorry! There was an error loading the item</p>);
        }
        if (this.props.isLoading) {
            return (<p>Loading Item… </p>);
        }
        return (
            <div>
                <Card initiallyExpanded>
                  <CardHeader
                    title={title}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
                    <Paper style={style} zDepth={5}>
                    NAME: { selectedItem.first_name }  { selectedItem.last_name }<br />
                    PHONE NUMBER: { selectedItem.phone }
                    </Paper>
                  </CardText>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.currentItem.data,
        hasErrored: state.currentItem.itemHasErrored,
        isLoading: state.currentItem.itemIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
