import React from 'react';
import './card.css';

const response = await fetch("http://itgirlschool.justmakeit.ru/api/words");
const data = await response.json();

console.log(data.length)
export default class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {pressed: false}
        this.state = {i: 0,
        count: 0}
        
    }
    
    handleChange = () => {
        this.setState( {
            count: this.state.count + 1
          });
        this.setState(
            {pressed: !this.state.pressed}
        );
        
    }

    handleNext = () => {
        if(this.state.i < data.length - 1){
        this.setState(({ i }) => ({
            i: i + 1
          }));
          this.setState(() => ({
            pressed: false
          }));
        }
        else{
            alert('error')
        }
    }

    handlePrevious = () => {
        if(this.state.i > 0){
        this.setState(({ i }) => ({
            i: i - 1
          }));
          this.setState(() => ({
            pressed: false
          }));
        }
        else{
            alert('error')
        }
    }

    render(){


        const pressed = this.state.pressed
        let actionItem
        if(pressed){
            actionItem = <div>{data[0 + this.state.i].russian}</div>
        }
        else{
            actionItem = <Button onClick={this.handleChange}/>;
        }
    return(
        <div>
            
            <Previous onClick={this.handlePrevious}></Previous>
            <div>{data[0 + this.state.i].english}</div>
            <div>{data[0 + this.state.i].transcription}</div>
            {actionItem}
            <Next onClick={this.handleNext}></Next>
            <div>{this.state.count}</div>

        </div>
    );
    }
}

function Next(props){
    return <button onClick={props.onClick} className="next">next</button>;
}

function Previous(props){
    return <button onClick={props.onClick} className="previous">previous</button>;
}

function Button(props){
    return <button onClick={props.onClick} className="check">Проверить</button>;
}


/* export default class Test extends React.Component{
    state = {
        english: data[0]
    }

    handleClick = () => {
        this.setState(({english}) => ({
            english: english + 1
        })
        )
    }

    render(){
    return <div>
        {this.state.english}
        <button onClick={this.handleClick}></button>
    </div>}
} */