"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.deleteAll = _this.deleteAll.bind(_this);
        _this.randomChoice = _this.randomChoice.bind(_this);
        _this.addNew = _this.addNew.bind(_this);
        _this.state = {
            options: [1, 2, 3, 4, 5]
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: "deleteAll",
        value: function deleteAll() {
            this.setState(function () {
                return {
                    options: []
                };
            });
        }
    }, {
        key: "addNew",
        value: function addNew(option) {
            if (!option) {
                return "There is nothing to add"; //funkcja zwróci coś tylko w wypadku, gdy będzie błąd
            } else if (this.state.options.indexOf(option) > -1) {
                //jeżeli już istnieje pod jakimś indeksem (inaczej zwróci -1)
                return "This option has been already added;";
            }
            this.setState(function (prevState) {
                //nie ma =
                return {
                    options: prevState.options.concat([option]) //dodawany element musi być w klamrach - łączenie tablic
                }; //concat tworzy nowa tablice zlozona z 2 podanych
            });
        }
    }, {
        key: "randomChoice",
        value: function randomChoice() {
            alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
        }
    }, {
        key: "render",
        value: function render() {
            var title = "Indecision App";
            var subtitle = "Put your decision in the hands of computer";
            var actionButtonTxt = "What should I do?";
            return React.createElement(
                "div",
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(AddOptions, { options: this.state.options, addNew: this.addNew }),
                React.createElement(Action, { ifAble: this.state.options.length > 0, randomChoice: this.randomChoice,
                    actionButtonTxt: actionButtonTxt }),
                React.createElement(Options, { options: this.state.options, deleteAll: this.deleteAll })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

;

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    this.props.title
                ),
                React.createElement(
                    "h2",
                    null,
                    this.props.subtitle
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var Action = function (_React$Component3) {
    _inherits(Action, _React$Component3);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    {
                        onClick: this.props.randomChoice,
                        disabled: !this.props.ifAble
                    },
                    this.props.actionButtonTxt
                )
            );
        }
    }]);

    return Action;
}(React.Component);

var Options = function (_React$Component4) {
    _inherits(Options, _React$Component4);

    function Options() {
        _classCallCheck(this, Options);

        return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
    }

    _createClass(Options, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.props.options.map(function (option) {
                    return React.createElement(Option, { key: option, optionText: option });
                }),
                React.createElement(
                    "p",
                    null,
                    "There are ",
                    this.props.options.length,
                    " options"
                ),
                React.createElement(
                    "button",
                    { onClick: this.props.deleteAll },
                    " Remove all "
                )
            );
        }
    }]);

    return Options;
}(React.Component);

var Option = function (_React$Component5) {
    _inherits(Option, _React$Component5);

    function Option() {
        _classCallCheck(this, Option);

        return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
    }

    _createClass(Option, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.props.optionText
            );
        }
    }]);

    return Option;
}(React.Component);

var AddOptions = function (_React$Component6) {
    _inherits(AddOptions, _React$Component6);

    function AddOptions(props) {
        _classCallCheck(this, AddOptions);

        //żeby mieć dostęp do this.props
        var _this6 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props)); //konstruktor zawsze w reactcie działa z props


        _this6.formSubmit = _this6.formSubmit.bind(_this6); //żeby formSubmit miała dobry kontekst 
        _this6.state = {
            error: undefined //bedzie puste, jezeli blad sie nie pojawi
        };
        return _this6;
    } //odnośnie this - bez tego wskazuje na undefined


    _createClass(AddOptions, [{
        key: "formSubmit",
        value: function formSubmit(e) {
            var _this7 = this;

            e.preventDefault();
            var option = e.target.elements.option.value.trim(); //trim pozwala na usuwanie także spacji;
            this.setState(function () {
                return { error: _this7.props.addNew(option) };
            });
            e.target.elements.option.value = '';
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.error && React.createElement(
                    "p",
                    null,
                    this.state.error
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.formSubmit },
                    React.createElement("input", { type: "text", name: "option" }),
                    React.createElement(
                        "button",
                        null,
                        "Add option"
                    )
                )
            );
        }
    }]);

    return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
