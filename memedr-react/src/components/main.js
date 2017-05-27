import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import MemeList from './memelist';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: []
    }
  }

  componentWillMount(){
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((res) => {

        //let memesArr = res.data.memes;
        this.setState({ memes:res.data.memes })

      }).catch((err) =>  {return err })
  }

  renderMemes(){
/*    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((res) => {

        let memesArr = res.data.memes;

        this.setState({ memes:memesArr })

      }).catch((err) =>  {return err })*/
  }

  handleAddSave(event){
    console.log('click save' + this.state.disabled);

    let memeid = event.target.getAttribute('id');
    console.log(memeid);
    let id = this.props.userID;
    axios.post("https://memedr.herokuapp.com/users/profile/save/" + id, {
      id:id,
      memeid:memeid
    });
  }

  handleDeleteSave() {
    let id = this.props.userID;
    axios.delete("https://memedr.herokuapp.com/users/profile/delete/saved/" + id, {
      id:id,
    });
  }

  checkUserStatus() {
    if (!this.props.loggedIn) {    
      return <Redirect to="/"/>;
    }
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

            <MemeList memes={this.state.memes} />
          </div>
      </div>
    );
  }
}


/*loadingAllDivs() {

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
  };*/