import React from "react";

class Form extends React.Component {


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
                                <input type="password" className="form-control" id="member-number-input"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export {Form}