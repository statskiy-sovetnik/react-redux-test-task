import React from "react";

class Table extends React.Component {

    renderTableBody() {
        let rows = [];
        const members = this.props.members.slice();

        for(let i = 0; i < members.length; i++) {
            rows.push((
                <tr>
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

    render() {
        return (
            <div id="table-comp-wrapper">
                <h4 className="table-heading">Таблица участников</h4>
                <div className="table-wrapper">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th scope="col-3">ФИО</th>
                            <th scope="col-1">Дата рождения</th>
                            <th scope="col-3">Email</th>
                            <th scope="col-3">Телефон</th>
                            <th scope="col-1">Дистанция</th>
                            <th scope="col-1">Взнос</th>
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
