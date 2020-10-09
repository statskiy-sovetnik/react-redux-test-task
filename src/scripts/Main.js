import React from "react";
import {Form} from "./Form";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

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
