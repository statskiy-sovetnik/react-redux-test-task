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

    transpileMemberObj(member) {
        let member_ = {};
        let member_date = member.date.split(".");

        member_.member_name = member.name;
        member_.day = member_date[0];
        member_.month = member_date[1];
        member_.year = member_date[2];
        member_.phone = member.phone;
        member_.email = member.email;
        member_.distance = member.distance + " км";
        member_.fee = member.payment + " руб.";

        return member_;
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
        const fetch_response = await download_promise;
        return await fetch_response.json();
    }

    componentDidMount() {
        let members = [];

        //Асинхронно загружаем содержимое .json файла с учатниками
        this.getMembersFromFile("../public/users.json").then((members_obj) => {
            members = members_obj.users || members;

            for(let i = 0; i < members.length; i++) {
                this.addMember(this.transpileMemberObj(members[i]));
            }
        });
    }
}

export {Main};
