import React from "react";
import './table.css';

const response = await fetch("http://itgirlschool.justmakeit.ru/api/words");
const data = await response.json();

console.log(data)


class Table extends React.Component{
    constructor(props){
        super(props)
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {added: false}
        
    }

    handleLoginClick() {
        this.setState({added: true});
      }

      handleLogoutClick() {
        this.setState({added: false});
      }

    render(){

        const added = this.state.added
        let actionItem
        if(added){
            actionItem = <LogoutButton onClick={this.handleLogoutClick} />
        }
        else{
            actionItem = <LoginButton onClick={this.handleLoginClick} />;
        }
    return<div>
      <AddWord></AddWord>
      <div>
          <Greeting added={added}/>
         {actionItem}
         </div>
        </div>
}
}


class UserGreeting  extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: `${props.id}`,
      english: `${props.english}`,
      russian: `${props.russian}`,
      transcription: `${props.transcription}`,
      disabled: false
    }};

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
      if(e.target.value == ''){
        this.setState({disabled: true})
        return false
      }
      else{
        this.setState({disabled: false})
      }
    }

    handleClick = () => {



      fetch('/api/words/add', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({english: this.state.english,
        russian: this.state.russian,
        transcription: this.state.transcription})
      })
      .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
    })
    .then((response) => {
      console.log(response)
  
    })
    .catch((error) =>{
      console.error('Error:', error)
    });


    fetch(`/api/words/${this.state.id}/delete`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({english: this.state.english,
      russian: this.state.russian,
      transcription: this.state.transcription})
    })
    .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Something went wrong ...');
      }
  })
  .then((response) => {
    console.log(response)
    window.location.reload();
  })
  .catch((error) =>{
    console.error('Error:', error)
  });

/*       fetch(`/api/words/${this.state.id}/update`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({english: this.state.english,
        russian: this.state.russian,
        transcription: this.state.transcription})
      })
      .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
    })
    .then((response) => {
      console.log(response)

    })
    .catch((error) =>{
      console.error('Error:', error)
    }); */

    }

    render(){

    return <div className="table">
      <div>
        <input name="english" id="" value={this.state.english} onChange={this.handleChange}/>
      </div>
      <div><input name="russian" id="" value={this.state.russian} onChange={this.handleChange}/></div>
      <div><input name="transcription" id="" value={this.state.transcription} onChange={this.handleChange}/></div>
      <div>
      <button type="button" disabled={this.state.disabled} onClick={this.handleClick}>с</button>
      <button type="button" disabled>у</button>
      </div>
    </div>;
    }
  
}


  class GuestGreeting extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        id: `${props.id}`,
        english: `${props.english}`,
        russian: `${props.russian}`,
        transcription: `${props.transcription}`,
      }};

      handleDelete = () => {
        fetch(`/api/words/${this.state.id}/delete`, {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({english: this.state.english,
          russian: this.state.russian,
          transcription: this.state.transcription})
        })
        .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Something went wrong ...');
          }
      })
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch((error) =>{
        console.error('Error:', error)
      });
      }

    render(){
    return <div className="table">
    <div>
    <input name="test" id="" value={this.state.english} readOnly/>
    </div>
    <div><input name="test1" id="" value={this.state.russian} readOnly/></div>
    <div><input name="test2" id="" value={this.state.transcription} readOnly/></div>
    <div>
    <button type="button" onClick={this.handleDelete}>у</button>
    </div>
    </div>;
  }}

  function Greeting(props) {
    const added = props.added;
    if (added) {
    return <span>{
        data.map((word, index) =><UserGreeting key = {index} id={word.id} english={word.english} russian={word.russian} transcription={word.transcription}/>)}</span>;
    }
    return <span>{
        data.map((word, index) =><GuestGreeting key = {index} id={word.id} english={word.english} russian={word.russian} transcription={word.transcription}/>)}</span>;
  }


  function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        и
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        о
      </button>
    );
  }

  class AddWord extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        english: [],
        russian: [],
        transcription: [],
      }
    }

    handleChangeAdd = (e) =>{
      this.setState({[e.target.name]: e.target.value})
    }

    handleAdd = () => {
    fetch('/api/words/add', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({english: this.state.english,
      russian: this.state.russian,
      transcription: this.state.transcription})
    })
    .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Something went wrong ...');
      }
  })
  .then((response) => {
    console.log(response)
    window.location.reload();

  })
  .catch((error) =>{
    console.error('Error:', error)
  });

  
    }

    render(){
    return<div><input id="" name='english' value={this.state.english} onChange={this.handleChangeAdd}></input>
          <input id="" name='russian' value={this.state.russian} onChange={this.handleChangeAdd}></input>
          <input id="" name='transcription' value={this.state.transcription} onChange={this.handleChangeAdd}></input>
          <button onClick={this.handleAdd}>xx</button></div>
    }
  }

export default Table