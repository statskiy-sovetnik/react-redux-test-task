import React from "react";
import {Form} from "./Form";
import {Table} from "./Table";

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
        });
    }

    render(){
        return (
          <div id="main-wrapper">
              <Form addMember={(member) => {this.addMember(member)}}/>
              <Table/>
          </div>
        );
    }
}

export {Main};
