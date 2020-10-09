import React from "react";
import {Form} from "./Form";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    //Вызывается компонентом Form, когда нужно добавить
    // нового участника забега в таблицу
    addMember() {

    }

    render(){
        return (
          <div>
              <Form addMember={() => {this.addMember()}}/>
          </div>
        );
    }
}

export {Main};
