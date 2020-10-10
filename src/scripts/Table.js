import React from "react";

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.SHOW_MEMBERS = 4; //сколько человек отображается на одной странице таблицы

        this.state = {
            sort_function: null,  //может быть date, fee, distance
            least: false,  //true, если сортировка от меньшего к большему
            current_page: 1, //текущая активная страница таблицы
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

    renderPaginationList() {
        let list_elems = [];
        const members_num = this.props.members.length;
        const pages_num = Math.ceil( members_num / this.SHOW_MEMBERS);
        const prev_disable_str = (this.state.current_page === 1 || pages_num === 1) ? " disabled" : "";
        const next_disable_str = (this.state.current_page === pages_num || pages_num === 1) ? " disabled" : "";

        console.log(pages_num);
        if(pages_num === 1) {
            return;
        }

        //Добавляем кнопку "назад"
        list_elems.push(
            <li key="page-back" className={"page-item" + prev_disable_str}>
                <a
                    onClick={(event) => {
                        event.preventDefault();
                        this.goToPage(this.state.current_page - 1);
                    }}
                    className="page-link" href="#">
                    Назад
                </a>
            </li>
        )

        for(let i = 0; i < pages_num; i++) {
            let active_btn_class_str = (i + 1 === this.state.current_page) ? " active" : "";
            list_elems.push(
                <li key={"page-" + (i + 1)} className="page-item">
                    <a
                        onClick={(event) => {
                            event.preventDefault();
                            this.goToPage(i + 1);
                        }}
                        className={"page-link" + active_btn_class_str} href="#">
                        {i + 1}
                    </a>
                </li>
            )
        }

        //Добавляем кнопку "вперед"
        list_elems.push(
            <li key="page-forward" className={"page-item" + next_disable_str}>
                <a
                    onClick={(event) => {
                        event.preventDefault();
                        this.goToPage(this.state.current_page + 1);
                    }}
                    className="page-link" href="#">
                    Вперёд
                </a>
            </li>
        )

        return React.createElement("ul", {className: "pagination"}, list_elems);
    }

    goToPage(page) {

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

                <nav aria-label="Переход по таблице">
                    {this.renderPaginationList()}
                </nav>
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
