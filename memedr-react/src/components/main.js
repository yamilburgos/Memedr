import React, { Component } from 'react';
import axios from 'axios'
// import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

export default class Main extends Component {

  handleAddSave(event){
    let memeid = event.target.getAttribute('id');
    console.log(memeid)
    let id = {this.props.userID}
    // let id = 1
    axios.post("https://memedr.herokuapp.com/users/profile/save/" + id, {
      id:id,
      memeid:memeid
    });
  }

  handleDeleteSave(){
    let id = {this.props.userID}
    // let id = 1
    axios.delete("https://memedr.herokuapp.com/users/profile/delete/saved/" + id, {
      id:id,
    });
  }

  componentDidMount(){
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
          let saveButton = document.createElement('button')
          saveButton.setAttribute('class', 'saveButton')
          saveButton.innerHTML = 'save';
          saveButton.addEventListener('click',this.handleAddSave.bind(this));
          saveButton.setAttribute('id', element.id);
          
          // CREATE DELETE BUTTON AND ADD DELETE HANDELER AS EVENT LISTENER
          let deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'delete';
          deleteButton.setAttribute('class', 'deleteButton')
          deleteButton.addEventListener('click',this.handleDeleteSave.bind(this));
         
          // CREATE MEME DIV AND SET ITS ID TO MEMEID
          let memeDiv = document.createElement('div');
          // memeDiv.setAttribute('id', element.id);
          // APPEND ALL PREVIOUSLY CREATED ELEMENTS TO MEME DIV
          
          memeDiv.appendChild(meme);
          memeDiv.appendChild(name);
          memeDiv.appendChild(deleteButton);
          memeDiv.appendChild(saveButton);
          
          // APPEND MEMEDIV TO THE MEME UL
          memeUL.appendChild(memeDiv);
        })
      })

  }



  render() {
    return (
      <div className="bigBorder">
          <h2>Memedr</h2>
          <h3>Gif me a Choice</h3>

          <div className="tempBorder">
            <br/>
            <button>Matches</button>
            <button>Saves</button>
            <button>Main</button>

            <div className="imgBorder"></div>
              
              <ul id="memeUL"></ul>

            <br/>
            <p>X</p>
            <p>O</p>
          </div>
      </div>
    );
  }
}