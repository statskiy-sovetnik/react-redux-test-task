import React from "react";
import IMask from "imask";

class Form extends React.Component {

    constructor(props) {
        super(props);


    }

    render() {


        return (
            <div className="form-comp-wrapper">
                <h3 className="form-heading">Оставить заявку на участие в забеге</h3>
                <div className="form-wrapper">
                    <form>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="member-name-input" className="col-form-label">ФИО</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" id="member-name-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="date-input" className="col-form-label">Дата рождения</label>
                            </div>
                            <div className="col-8">
                                <input type="date" className="form-control" id="date-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="member-email-input" className="col-form-label">Email</label>
                            </div>
                            <div className="col-8">
                                <input type="email" className="form-control" id="member-email-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="member-number-input" className="col-form-label">Телефон</label>
                            </div>
                            <div className="col-8">
                                <input type="tel" className="form-control" id="member-number-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="distance-select" className="col-form-label">Дистанция</label>
                            </div>
                            <div className="col-8">
                                <select id="distance-select" className="form-control" >
                                    <option>3 км</option>
                                    <option>5 км</option>
                                    <option>10 км</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="member-name-input" className="col-form-label">Сумма взноса, руб</label>
                            </div>
                            <div className="col-8">
                                <input type="number" className="form-control" id="member-name-input"/>
                            </div>
                        </div>

                        <button className="btn btn-primary">Отправить заявку</button>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {

        const phone_field = document.getElementById("member-number-input");
        const options = {
            mask: "+{7}(000)000-00-00",
        }

        //Добавить маску набора телефонного номера
        let mask = IMask(phone_field, options);
    }
}

export {Form}