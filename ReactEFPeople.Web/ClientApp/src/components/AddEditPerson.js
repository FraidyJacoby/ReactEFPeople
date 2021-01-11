import React from 'react';

class AddEditPerson extends React.Component {
    render() {
        const { onAddClick, onTextChange, isAdd, onEditClick, onCancelClick } = this.props;
        const { firstName, lastName, age } = this.props.person;
        return (
            <div style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }} className="row">

                <div className="col-md-3">
                    <input type="text" placeholder="First Name" onChange={onTextChange}
                        value={firstName} name="firstName" className="form-control" />
                </div>

                <div className="col-md-3">
                    <input type="text" placeholder="Last Name" onChange={onTextChange}
                        value={lastName} name="lastName" className="form-control" />
                </div>

                <div className="col-md-3">
                    <input type="text" placeholder="Age" onChange={onTextChange}
                        value={age} name="age" className="form-control" />
                </div>

                <div className="col-md-3">
                {isAdd && <button className="btn btn-success btn-block" onClick={onAddClick}>
                    Add</button>}
                    {!isAdd && <div><button className="btn btn-outline-info btn-block"
                                    onClick={onEditClick}>Edit</button>
                            <button className="btn btn-outline-warning btn-block"
                                    onClick={onCancelClick}> Cancel</button></div>}
                </div>

            </div>
            )
    }
}

export default AddEditPerson;