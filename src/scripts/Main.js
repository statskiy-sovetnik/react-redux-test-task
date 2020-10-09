import React from "react";
import {Form} from "./Form";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
        }
    }

    //Вызывается компонентом Form, когда нужно добавить
    // нового участника забега в таблицу
    addMember(member) {

        this.setState({
            members: this.state.members.slice().concat([member]),
        }, () => {
            console.log(this.state.members);
        });

    }

    render(){
        return (
          <div>
              <Form addMember={(member) => {this.addMember(member)}}/>
          </div>
        );
    }
}

export {Main};
