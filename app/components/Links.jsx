import { Link } from 'react-router-dom';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const Links = (props) => {
    return (
        <div>
            <Link to='/'><RaisedButton primary={true} label="Item List" style={style} /></Link>
            <Link to='/item'><RaisedButton secondary={true} label="Test Component" style={style} /></Link>
        </div>
    )
}

export default Links;
