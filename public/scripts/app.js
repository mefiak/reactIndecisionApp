'use strict';

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
        _this.deleteOption = _this.deleteOption.bind(_this);
        _this.randomChoice = _this.randomChoice.bind(_this);
        _this.addNew = _this.addNew.bind(_this);
        _this.state = {
            options: props.options
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options'); //pobieramy istniejace opcje kiedy odswieza sie strone
                var options = JSON.parse(json); //zawartosc localStorage zmieniona spowrotem na obiekt
                if (options) this.setState(function () {
                    return { options: options };
                }); //próba wepchania zawartości do state'a
            } catch (e) {
                //nic nie robimy, bo chodzi tylko o powtorzenie try na wypadek zlych wartosci
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options); //przeklada obiekty na tekst, w innym wypadku obiekty zostaną jednolitym tekstem
                localStorage.setItem('options', json); //przekłada tekst do zmiennej lokalnej, usuwając wartości, to też je traci
            }
        }
    }, {
        key: 'componentwillUnmount',
        value: function componentwillUnmount() {
            console.log('ComponentWillUnmount');
        }
    }, {
        key: 'deleteOption',
        value: function deleteOption(option2remove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter( // funkcja działa jak mapowanie, ale kiedy zwraca prawdę dla wartości
                    function (option) {
                        //to wrzuca ją do nowej tablicy, a jak zwraca fałsz, to wyrzuca tą wartość
                        return option !== option2remove;
                    })
                };
            });
        }
    }, {
        key: 'deleteAll',
        value: function deleteAll() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'addNew',
        value: function addNew(option) {
            if (!option) {
                return "There is nothing to add"; //funkcja zwróci coś tylko w wypadku, gdy będzie błąd
            } else if (this.state.options.indexOf(option) > -1) {
                //jeżeli już istnieje pod jakimś indeksem (inaczej zwróci -1)
                return "This option has been already added;";
            }
            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            });
            //dodawany element musi być w klamrach - łączenie tablic//concat tworzy nowa tablice zlozona z 2 podanych
        }
    }, {
        key: 'randomChoice',
        value: function randomChoice() {
            alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
        }
    }, {
        key: 'render',
        value: function render() {
            var subtitle = "Put your decision in the hands of computer";
            var actionButtonTxt = "What should I do?";
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle
                }),
                React.createElement(AddOptions, { options: this.state.options,
                    addNew: this.addNew
                }),
                React.createElement(Action, { ifAble: this.state.options.length > 0,
                    randomChoice: this.randomChoice,
                    actionButtonTxt: actionButtonTxt
                }),
                React.createElement(Options, { deleteOption: this.deleteOption,
                    options: this.state.options,
                    deleteAll: this.deleteAll
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

;
IndecisionApp.defaultProps = {
    options: []
};
var Header = function Header(props) {
    return (//dziala jak render przy bezstanowych, komponentowych funkcjach, this tu nie dziala
        React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                props.title
            ),
            React.createElement(
                'h2',
                null,
                props.subtitle
            )
        )
    );
};
Header.defaultProps = {
    title: "Indecision App"
};
var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.randomChoice,
                disabled: !props.ifAble
            },
            props.actionButtonTxt
        )
    );
};
var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        props.options.map(function (option) {
            return React.createElement(Option, { key: option, optionText: option,
                deleteOption: props.deleteOption });
        }),
        React.createElement(
            'p',
            null,
            'There are ',
            props.options.length,
            ' options'
        ),
        React.createElement(
            'button',
            { onClick: props.deleteAll },
            ' Remove all '
        )
    );
};
var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.deleteOption(props.optionText);
                } },
            'remove'
        )
    ) /*wyświetla możliwe wartości
      e - żeby zadziałało odnośnie tego co w niego kliknięto*/
    ;
};

var AddOptions = function (_React$Component2) {
    _inherits(AddOptions, _React$Component2);

    function AddOptions(props) {
        _classCallCheck(this, AddOptions);

        //żeby mieć dostęp do this.props
        var _this2 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props)); //konstruktor zawsze w reactcie działa z props


        _this2.formSubmit = _this2.formSubmit.bind(_this2); //żeby formSubmit miała dobry kontekst 
        _this2.state = {
            error: undefined //bedzie puste, jezeli blad sie nie pojawi
        };
        return _this2;
    } //odnośnie this - bez tego wskazuje na undefined


    _createClass(AddOptions, [{
        key: 'formSubmit',
        value: function formSubmit(e) {
            var _this3 = this;

            e.preventDefault();
            var option = e.target.elements.option.value.trim(); //trim pozwala na usuwanie także spacji;
            this.setState(function () {
                return { error: _this3.props.addNew(option) };
            });
            e.target.elements.option.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.formSubmit },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add option'
                    )
                )
            );
        }
    }]);

    return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
