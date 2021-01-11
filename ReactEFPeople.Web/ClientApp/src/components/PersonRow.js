import React from 'react';

class PersonRow extends React.Component {
    render() {
        const { firstName, lastName, age } = this.props.person;
        const { onEditPersonClick, onDeletePersonClick, isChecked, onChange } = this.props;
        return (
            <tr>
                    <td><input type="checkbox" checked={isChecked} onChange={onChange} /></td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{age}</td>
                    <td><button className="btn btn-info" onClick={onEditPersonClick}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={onDeletePersonClick}>Delete</button></td>
                </tr>
            )
    }
}

export default PersonRow;