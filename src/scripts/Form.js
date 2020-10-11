import React from "react";
import IMask from "imask";
import DatePicker from "react-datepicker";

class Form extends React.Component {

    constructor(props) {
        super(props);

        /* ____ КОНСТАНТЫ _____*/

        this.FORM_ID = "form_comp_form";

        const date_now = new Date();
        this.INITIAL_STATE = {
            //Данные пользователя вынеси здесь в отдельный объект потом
            member_name: null,
            email: null,
            day: null,
            month: null,
            year: null,
            phone: null,
            distance: "3 км",
            fee: null,
            /*---*/
            is_phone_focused: false,  //true если поле с номером телефона в фокусе
            is_email_focused: false,
        }

        this.state = {};
        Object.assign(this.state, this.INITIAL_STATE);
    }

    takeNumFromDist(dist_str) {
        return +dist_str.slice(0, dist_str.length - 2)
    }

    getDateFromStr(date_str) {
        let date = ["", "", ""];  //day, month, year
        let ind = 0;

        for(let i = 0; i < date_str.length; i++) {
            if(date_str[i] === "." || date_str[i] === "-") {
                ind++;
                continue;
            }
            date[ind] += date_str[i];
        }

        return date;
    }

    //Берет значение поля и изменяет состояние компонента Form
    changeInputValueState(id, value) {
        let new_state_obj = {};

        new_state_obj["" + id] = value;

        this.setState(new_state_obj, () => {
            console.log(this.state);
        });
    }

    isPhoneValid(phone_number) {
        return phone_number == null ? false : phone_number.length === 11 + 5;
    }

    isEmailValid(email) {
        if(email == null) {return false}

        for(let i = 0; i < email.length; i++) {
            if(email[i] === "@") {
                return true;
            }
        }

        return false;
    }

    addMemberFromForm(event) {
        event.preventDefault();

        let member = {};
        member.member_name = this.state.member_name;
        member.email = this.state.email;
        member.day = this.state.day;
        member.month = this.state.month;
        member.year = this.state.year;
        member.phone = this.state.phone;
        member.distance = this.state.distance;
        member.fee = this.state.fee;

        this.props.addMember(member);
    }

    clearForm() {
        const form = document.getElementById(this.FORM_ID);
        let inputs = form.querySelectorAll("input.form-control");

        inputs.forEach((elem) => {
            elem.value = "";
        });

        this.setState(this.INITIAL_STATE);
    }

    completeYear(year_str) {
        if(year_str == null || (year_str.length !== 2 && year_str.length !== 4)) {
            return "";
        }

        return (year_str.length === 2) ? 2000 + +year_str : +year_str;
    }

    render() {

        //Проверка на заполненность полей
        let fields_filled = true;
        for(let key in this.state) {
            if(key === "distance") {
                continue;
            }
            if(this.state["" + key] == null) {
               fields_filled = false;
               break;
            }
        }

        //Валидация почты
        let email_input_class_name = "";
        const emailValid = this.isEmailValid(this.state.email);
        if(this.state.is_email_focused) {
            email_input_class_name = emailValid ? " is-valid" : " is-invalid";
        }

        //Проверяем телефон на валидность
        let phone_input_class_name = "";
        const phoneValid = this.isPhoneValid(this.state.phone);
        if(this.state.is_phone_focused) {
            phone_input_class_name = phoneValid ? " is-valid" : " is-invalid";
        }

        let button = (fields_filled && emailValid && phoneValid) ?
            (<button type="submit" className="btn btn-primary">Отправить заявку</button>) :
            (<button disabled type="submit" className="btn btn-primary">Отправить заявку</button>);

        //Настройка календаря
        //Если year не определен, то дата не отображается.
        const member_date = this.state.year && new Date(this.state.year, this.state.month, this.state.day);

        return (
            <div className="form-comp-wrapper">
                <h4 className="form-heading">Оставить заявку на участие в забеге</h4>
                <div className="form-wrapper">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();

                            this.addMemberFromForm(event);
                            this.clearForm();
                        }}
                        id={this.FORM_ID}>

                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="member_name" className="col-form-label">ФИО</label>
                            </div>
                            <div className="col-8">
                                <input
                                    onInput={(event) => {
                                        this.changeInputValueState("member_name", event.currentTarget.value)}
                                    }
                                    type="text" className="form-control" id="member_name"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="date-input" className="col-form-label">Дата рождения</label>
                            </div>
                            <div className="col-8">
                                <DatePicker
                                    selected={member_date}
                                    onSelect={(date) => {
                                        console.log(date + " with type " + typeof date);

                                        this.changeInputValueState("year", date.getFullYear());
                                        this.changeInputValueState("month", date.getMonth() + 1);
                                        this.changeInputValueState("day", date.getDate());
                                    }}
                                    dateFormat="dd.MM.yyyy"
                                    className="form-control"
                                    id="date-input"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="member-email-input" className="col-form-label">Email</label>
                            </div>
                            <div className="col-8">
                                <input
                                    onInput={(event) => {
                                        this.changeInputValueState("email", event.currentTarget.value)}
                                    }
                                    onFocus={() => {this.setState({is_email_focused: true})}}
                                    onBlur={() => {this.setState({is_email_focused: false})}}
                                    type="email"
                                    className={"form-control" + email_input_class_name}
                                    id="member-email-input"/>
                            </div>
                        </div>
                        <div className={"form-group row"}>
                            <div className="col-4">
                                <label htmlFor="phone" className="col-form-label">Телефон</label>
                            </div>
                            <div className="col-8">
                                <input
                                    onInput={(event) => {
                                        this.changeInputValueState("phone", event.currentTarget.value)}
                                    }
                                    onFocus={() => {this.setState({is_phone_focused: true})}}
                                    onBlur={() => {this.setState({is_phone_focused: false})}}
                                    type="tel"
                                    className={"form-control" + phone_input_class_name}
                                    id="phone"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="distance-select" className="col-form-label">Дистанция</label>
                            </div>
                            <div className="col-8">
                                <select onBlur={(event) => {
                                    this.changeInputValueState("distance", event.currentTarget.value)
                                }}
                                        id="distance-select" className="form-control" >
                                    <option>3 км</option>
                                    <option>5 км</option>
                                    <option>10 км</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="fee" className="col-form-label">Сумма взноса, руб</label>
                            </div>
                            <div className="col-8">
                                <input onInput={(event) => {
                                    this.changeInputValueState("fee", event.currentTarget.value)}
                                } type="number" className="form-control" id="fee"/>
                            </div>
                        </div>

                        {button}
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const phone_field = document.getElementById("phone");
        const options = {
            mask: "+{7}(000)000-00-00",
        }

        //Добавить маску набора телефонного номера
        let mask = IMask(phone_field, options);
    }
}

export {Form}