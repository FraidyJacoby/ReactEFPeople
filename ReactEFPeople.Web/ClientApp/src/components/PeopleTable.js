import React from 'react';
import AddEditPerson from './AddEditPerson';
import PersonRow from './PersonRow';
import axios from 'axios';
import { produce } from 'immer';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            id:'',
            firstName: '',
            lastName: '',
            age: '',
        },
        isAdd: true,
        selectedPeople: []
    }

    componentDidMount = () => {
        axios.get('/api/people/getpeople').then(response => {
            this.setState({ people: response.data })
        })
    }

    onAddClick = () => {
        const { firstName, lastName, age } = this.state.person;
        const person = { firstName, lastName, age: parseInt(age) }
        axios.post('/api/people/addperson', person).then(response => {
            const newState = produce(this.state, draft => {
                const person = {
                    id:'',
                    firstName: '',
                    lastName: '',
                    age: ''
                }
                draft.person = person;
                draft.people.push(response.data);
            })

            this.setState(newState);            
        })
    }

    onTextChange = e => {
        const newState = produce(this.state, draft => {
            draft.person[e.target.name] = e.target.value;
        })
        this.setState(newState);
    }

    onEditPersonClick = person => {
        this.setState({ person, isAdd: false })
    }

    onEditClick = () => {
        const { id, firstName, lastName, age } = this.state.person;
        const person = { id, firstName, lastName, age: parseInt(age) }
        axios.post('/api/people/editperson', person).then(() => {
            axios.get('api/people/getpeople').then(response => {
                const person = {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
                this.setState({ people: response.data, isAdd: true, person })
            })
        })
    }

    onCancelClick = () => {
        const newState = produce(this.state, draft => {
            draft.person = {
                firstName: '',
                lastName: '',
                age: ''
            };
            draft.isAdd = true;
        })
        this.setState(newState);
    }

    onDeletePersonClick = person => {
        axios.post('/api/people/deleteperson', person).then(() => {
            axios.get('/api/people/getpeople').then(response => {
                this.setState({ people: response.data });
            })
            })
    }

    onDeleteSelectedClick = () => {
        const ids = this.state.selectedPeople.map(p => p.id);
        axios.post('/api/people/deleteselected', ids).then(() => {
            axios.get('/api/people/getpeople').then(response => {
                this.setState({ people: response.data, selectedPeople:[] })
            })
        })
    }

    onChange = person => {
        const selectedPeople = this.state.selectedPeople;
        { selectedPeople.includes(person) && this.setState({ selectedPeople: [...selectedPeople.filter(p => p.id !== person.id)] }) }
        { !selectedPeople.includes(person) && this.setState({ selectedPeople: [...selectedPeople, person] }) }
    }

    render() {
        const { people, person, isAdd, selectedPeople } = this.state;
        const { onAddClick, onEditClick, onTextChange, onEditPersonClick, onDeletePersonClick,
            onDeleteSelectedClick, onChange, onCancelClick } = this;
        return (
            <div className="container">
                <AddEditPerson person={person} onAddClick={onAddClick} onTextChange={onTextChange}
                    isAdd={isAdd} onEditClick={onEditClick} onCancelClick={onCancelClick} />
                <table className="table table-bordered table-hover" style={{marginRight:20, marginLeft:20, marginTop:40}}>
                    <thead>
                        <tr>
                            <th><button className="btn btn-danger" onClick={onDeleteSelectedClick}>Delete Selected</button></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <PersonRow person={p}
                            onEditPersonClick={() => onEditPersonClick(p)}
                            onDeletePersonClick={() => onDeletePersonClick(p)}
                            onChange={() => onChange(p)}
                            isChecked={selectedPeople.includes(p)}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PeopleTable;