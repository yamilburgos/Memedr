import React, { Component } from 'react';
import axios from 'axios'
// import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

export default class Main extends Component {

  handleAddSave(){
    let memeid = this.parent.id;
    // let id = {this.props.userID}
    let id = 1
    axios.post("https://memedr.herokuapp.com/users/profile/save/" + id, {
      id:id,
      memeid:memeid
    });
  }

  handleDeleteSave(){
    // let id = {this.props.userID}
    let id = 1
    axios.delete("https://memedr.herokuapp.com/users/profile/delete/saved/" + id, {
      id:id,
    });
  }

  componentDidMount(){
    {/*console.log('component WILL MOUNT!!!')*/}
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((res)=>{
        console.log(res)
        res.data.memes.map((element, index)=>{
          let meme = document.createElement('img');
          meme.setAttribute('src', element.meme_link);
          let memeUL = document.getElementById('memeUL');
          {/*memeUL.appendChild(meme)*/}
          let name = document.createElement('p');
          name.innerHTML = element.meme_name;
          {/*memeUL.appendChild(name)*/}
          let saveButton = document.createElement('button')
          saveButton.setAttribute('class', 'saveButton')
          saveButton.innerHTML = 'save';
            saveButton.addEventListener('click',this.handleAddSave.bind(this));
          {/*memeUL.appendChild(saveButton)*/}
          let deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'delete';
          deleteButton.setAttribute('class', 'deleteButton')
          deleteButton.addEventListener('click',this.handleDeleteSave.bind(this));
          {/*memeUL.appendChild(deleteButton)*/}
          let memeDiv = document.createElement('div');
          memeDiv.setAttribute('id', element.id);
          memeDiv.appendChild(meme);
          memeDiv.appendChild(name);
          memeDiv.appendChild(deleteButton);
          memeDiv.appendChild(saveButton);
          memeUL.appendChild(memeDiv);
        })
      })

  }



  render() {
    return (
      <div className="bigBorder">
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