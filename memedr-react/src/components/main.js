import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    }
  }

  handleAddSave(event){
    // SET SAVE BUTTON DISABLE TO TRUE ON CLICK
    // let disableSave = event.target;
    // // if (this.state.canSave === true) {
    // disableSave.disabled = this.state.disabled;
    // SET CAN SAVE TO FALSE TO DISBALE SAVE MEME
    
    this.setState({
      disabled: true,
    });

    console.log('click save' + this.state.disabled);
    // SAVE MEME AND USER ID TO SAVES TABLE
    let memeid = event.target.getAttribute('id');
    console.log(memeid);
    let id = this.props.userID;
    axios.post("https://memedr.herokuapp.com/users/profile/save/" + id, {
      id:id,
      memeid:memeid
    });
  }

  handleDeleteSave() {
   // SET CAN SAVE TO TRUE TO ENABLE SAVE MEME
   this.setState({
    disabled: false,
    }) 
   // DELETE SAVE FROM SAVE TABLE
    let id = this.props.userID;
    axios.delete("https://memedr.herokuapp.com/users/profile/delete/saved/" + id, {
      id:id,
    });
  }

  loadingAllDivs() {
    {/*console.log('component WILL MOUNT!!!')*/}
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((res)=>{
        // console.log(res)
        res.data.memes.map((element, index)=>{
         
          // GRAB THE MEME UL FROM THE DOCUMENT 
          let memeUL = document.getElementById('memeUL');

          //  CREATE IMG AND ADD MEME URL
          let meme = document.createElement('img');
          meme.setAttribute('src', element.meme_link);
           
          // CREATE P TAG AND ADD MEME NAME
          let name = document.createElement('p');
          name.innerHTML = element.meme_name;
          
          // CREATE SAVE BUTTON ADD SAVE HANDLER AS EVENT LISTENER
          let saveButton = document.createElement('button');
          saveButton.setAttribute('class', 'saveButton');
          saveButton.innerHTML = 'save';
          saveButton.addEventListener('click',this.handleAddSave.bind(this));
          saveButton.setAttribute('id', element.id);
          
          // DISABLE SAVE BUTTON
          saveButton.disabled = this.state.disabled;
          
          // CREATE DELETE BUTTON AND ADD DELETE HANDELER AS EVENT LISTENER
          let deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'delete';
          deleteButton.setAttribute('class', 'deleteButton');
          deleteButton.addEventListener('click',this.handleDeleteSave.bind(this));
         
          // CREATE MEME DIV AND SET ITS ID TO MEMEID
          let memeDiv = document.createElement('div');
         
          // APPEND ALL PREVIOUSLY CREATED ELEMENTS TO MEME DIV
          memeDiv.appendChild(meme);
          memeDiv.appendChild(name);
          memeDiv.appendChild(deleteButton);
          memeDiv.appendChild(saveButton);
          
          // APPEND MEMEDIV TO THE MEME UL
          memeUL.appendChild(memeDiv);
        });
      });
  };

  checkUserStatus() {
    if (!this.props.loggedIn) {    
      return <Redirect to="/"/>;
    }

    return this.loadingAllDivs();
  }

  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
           {this.checkUserStatus()}
            <br/>
            <button>Matches</button>
            <button>Saves</button>
            <button>Main</button>
            <ul id="memeUL"></ul>
          </div>
      </div>
    );
  }
}