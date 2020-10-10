import React from "react";

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sort_function: null,  //может быть date, fee, distance
            least: false,  //true, если сортировка от меньшего к большему
        }
    }

    renderTableBody() {
        let rows = [];
        const members = this.props.members.slice();

        //Сортировка участников
        switch(this.state.sort_function) {
            case "date":
                if(this.state.least) {
                    members.sort((a, b) => {return this.compareMembersByDateLeast(a, b)});
                }
                else {
                    members.sort((a, b) => {return this.compareMembersByDateGreater(a, b)});
                }
                break;
            case "fee":
                if(this.state.least) {
                    members.sort((a, b) => {return this.compareMembersByFeeLeast(a, b)})
                }
                else {
                    members.sort((a, b) => {return this.compareMembersByFeeGreater(a, b)})
                }
                break;
            case "distance":
                if(this.state.least) {
                    console.log(this);
                    members.sort((a, b) => {return this.compareMembersByDistLeast(a, b)})
                }
                else {
                    console.log(this);
                    members.sort((a, b) => {return this.compareMembersByDistGreater(a, b)})
                }
                break;
            default:
                break;
        }

        for(let i = 0; i < members.length; i++) {
            rows.push((
                <tr key={"table-row-" + i}>
                    <td>{members[i].member_name}</td>
                    <td>{members[i].day + "." + members[i].month + "." + members[i].year}</td>
                    <td>{members[i].email}</td>
                    <td>{members[i].phone}</td>
                    <td>{members[i].distance}</td>
                    <td>{members[i].fee}</td>
                </tr>
            ));
        }

        return React.createElement("tbody", [], rows);
    }

    compareMembersByDateLeast(member_1, member_2) {
        return (+member_1.year * 365 + +member_1.month * 12 + +member_1.day) - (
            +member_2.year * 365 + +member_2.month * 12 + +member_2.day
        );
    }

    compareMembersByDateGreater(member_1, member_2) {
        return -this.compareMembersByDateLeast(member_1, member_2);
    }

    compareMembersByFeeLeast(member_1, member_2) {
        const fee_1 = +(member_1.fee.split(" ")[0]);
        const fee_2 = +(member_2.fee.split(" ")[0]);

        return fee_1 - fee_2;
    }

    compareMembersByFeeGreater(member_1, member_2) {
        return -this.compareMembersByFeeLeast(member_1, member_2);
    }

    compareMembersByDistLeast(member_1, member_2) {
        const dist_1 = +(member_1.distance.split(" ")[0]);
        const dist_2 = +(member_2.distance.split(" ")[0]);

        return dist_1 - dist_2;
    }

    compareMembersByDistGreater(member_1, member_2) {
        return -this.compareMembersByDistLeast(member_1, member_2);
    }

    render() {
        let sort_name = "";
        switch (this.state.sort_function) {
            case "date":
                sort_name = " по дате"
                break;
            case "distance":
                sort_name = " по дистанции забега"
                break;
            case "fee":
                sort_name = " по взносу"
                break;
            default:
                sort_name = " нет";
        }
        if(this.state.sort_function !== null) {
            if(this.state.least) {
                sort_name += ", от меньшего к большему"
            }
            else {
                sort_name += ", от большего к меньшему"
            }
        }

        return (
            <div id="table-comp-wrapper">
                <h4 className="table-heading">Таблица участников</h4>

                <p className="sort-heading">
                    Сортировка: {sort_name}
                </p>
                <div className="table-wrapper">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th scope="col-3">ФИО</th>
                            <th scope="col-1">
                                <span
                                    onClick={() => {
                                        this.setState({
                                            sort_function: "date",
                                            least: true,
                                        })
                                    }}
                                    className="table-arrow-icon oi oi-caret-top"> </span>
                                <span
                                    onClick={() => {
                                        this.setState({
                                            sort_function: "date",
                                            least: false,
                                        })
                                    }}
                                    className="table-arrow-icon right-icon oi oi-caret-bottom"> </span>
                                Дата рождения
                            </th>
                            <th scope="col-3">Email</th>
                            <th scope="col-3">Телефон</th>
                            <th scope="col-1">
                                <span
                                    onClick={() => {
                                        this.setState({
                                            sort_function: "distance",
                                            least: true,
                                        })
                                    }}
                                    className="table-arrow-icon oi oi-caret-top"> </span>
                                <span
                                    onClick={() => {
                                        this.setState({
                                            sort_function: "distance",
                                            least: false,
                                        })
                                    }}
                                    className="table-arrow-icon right-icon oi oi-caret-bottom"> </span>
                                Дистанция
                            </th>
                            <th scope="col-1">
                                <span
                                    onClick={() => {
                                        this.setState({
                                            sort_function: "fee",
                                            least: true,
                                        })
                                    }}
                                    className="table-arrow-icon oi oi-caret-top"> </span>
                                <span
                                    onClick={() => {
                                        this.setState({
                                            sort_function: "fee",
                                            least: false,
                                        })
                                    }}
                                    className="table-arrow-icon right-icon oi oi-caret-bottom"> </span>
                                Взнос
                            </th>
                        </tr>
                        </thead>
                        {this.renderTableBody()}
                    </table>
                </div>
            </div>
        )
    }
}

export {Table};
