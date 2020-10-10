import React from "react";
import {Form} from "./Form";
import {Table} from "./Table";

//Полифиллы
import "core-js/stable";
import "regenerator-runtime/runtime";

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
              <Table members={this.state.members}/>
          </div>
        );
    }

    async getMembersFromFile(url) {
        let download_promise = fetch(url);
        let promise_response = await download_promise; //ждем, пока промис выполнится
        return typeof promise_response;
    }

    componentDidMount() {

        //Асинхронно загружаем содержимое .json файла с учатниками
        this.getMembersFromFile("../../public/users.json").then(console.log);
    }
}

export {Main};
