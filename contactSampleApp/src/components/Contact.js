import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            selectedKey: -1,
            contactData: [{
                name: '유영훈',
                phone: '010-0000-0001'
            }, {
                name: '김승우',
                phone: '010-0000-0002'
            }, {
                name: '윤성호',
                phone: '010-0000-0003'
            }, {
                name: '송영준',
                phone: '010-0000-0004'
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // HTML5 localStorage
    componentWillMount() {
      const contactData = localStorage.contactData;

      if(contactData){
        this.setState({
          contactData : JSON.parse(contactData)
        });
      }
    }

    // localStorage update
    componentDidUpdate(prevProps, prevState){
      if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)){
        localStorage.contactData = JSON.stringify(this.state.contactData);
      }
    }

    // searching keywrod handling
    handleChange(e){
      this.setState({
        keyword: e.target.value
      });
    }

    // click user handler
    handleClick(key){
      this.setState({
        selectedKey : key
      });
    }

    // create contact
    handleCreate(contact){
      this.setState({
        contactData : update( this.state.contactData, { $push: [contact] } )
      });
    }

    // delete contact
    handleDelete(){
      // item must be selected
      if(this.state.selectedKey < 0){
        return;
      }

      this.setState({
        contactData : update( this.state.contactData, {$splice: [[this.state.selectedKey, 1]]}),
        selectedKey : -1
      });
    }

    // edit contact
    handleEdit(newName, newPhone){
      this.setState({
        contactData : update( this.state.contactData,
              {
                  [this.state.selectedKey]: {
                      name: {$set: newName},
                      phone : {$set: newPhone}
                  }
               }
            )
        });
    }

    render() {
        const mapToComponents = (data) => {

            //sorting
            data.sort();

            //filtering
            data = data.filter(
              (contact) => {
                  return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
              }
            );

            return data.map((contact, i) => {
                return (<ContactInfo
                            contact={contact}
                            key={i}
                            onClick={ () => this.handleClick(i) }
                        />);
            });
        };

        return (
            <div>
              <h1>Contacts</h1>
              <input
                name="keyword"
                placeholder="Search"
                value={this.state.keyword}
                onChange={this.handleChange}
              />
              <div>{mapToComponents(this.state.contactData)}</div>
              <ContactDetails
                isSelected={this.state.selectedKey != -1}
                contact = {this.state.contactData[this.state.selectedKey]}
                onDelete={this.handleDelete}
                onEdit={this.handleEdit}
              />
              <ContactCreate
                onCreate={this.handleCreate}
              />
            </div>
        );
    }
}
