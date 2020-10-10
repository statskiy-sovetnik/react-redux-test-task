import React from "react";

class Table extends React.Component {


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
                        <tbody>
                            <tr>
                                <td>Иван Евгенич Гладкиъ</td>
                                <td>09.02.2000</td>
                                <td>ivangladkikh3@gmail.com</td>
                                <td>89237036186</td>
                                <td>3 км</td>
                                <td>13000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export {Table};
