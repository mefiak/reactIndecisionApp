class Counter extends React.Component {
    constructor (props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinOne = this.handleMinOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {//nazwa state jest niezmienna!
            count: 0
        };
    }
    componentDidMount(){
        const intCount = parseInt(localStorage.getItem('count'), 10);
        this.setState(() => ({count: intCount}));

    };
    componentDidUpdate(prevProps, prevState) {//muszą być obydwa!!!
        if(prevState.count !== this.state.count){//do teraźniejszego dodaje się this!!!
            localStorage.setItem('count', this.state.count)
        }
    };
    handleAddOne () {//prevState - odniesienie się do wartości przed użyciem funkcji
        this.setState((prevState) => {//funkja która przyjmuje jako argument funkcje, która podmienia wartości
            return {//ta funkcja musi nosić tą nazwe i odnosić się do obiektu state
                count: prevState.count + 1
            };
        });
    }
    handleMinOne (){
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }
    handleReset () {
        this.setState(() => {
            return {
                count: 0
            };
        });
    }
    render() {
        return (
            <div>
                <h1> COUNTER {this.state.count}</h1>
                <button onClick = {this.handleAddOne}>+1</button>
                <button onClick={this.handleMinOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
            );
    }
}
ReactDOM.render(<Counter/>, document.getElementById('app'))
/*let count = 0;
const addOne = () => {
    count++;
    appRender();
};
const subtractOne = () => {
    count--;
    appRender();
};
const reset = () => {
    count = 0;
    appRender();
};
const appRender = () => {
    const templateTwo = (
        <div>
            <h1> Count: {count} </h1>
            <button onClick = {addOne}>+1</button>
            <button onClick = {subtractOne}>-1</button>
            <button onClick = {reset}>reset</button>
        </div>
);
    ReactDOM.render(templateTwo, appRoot);
};
appRender();*/