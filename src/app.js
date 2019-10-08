class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.deleteAll = this.deleteAll.bind(this);
        this.randomChoice = this.randomChoice.bind(this);
        this.addNew = this.addNew.bind(this);
        this.state = {
            options: [1,2,3,4,5]
        }
    }
    deleteAll(){
        this.setState(() => {
            return {
                options: []
            };
        });
    }
    addNew(option){
        if(!option){
            return "There is nothing to add" ;//funkcja zwróci coś tylko w wypadku, gdy będzie błąd
        }
        else if(this.state.options.indexOf(option)>-1){//jeżeli już istnieje pod jakimś indeksem (inaczej zwróci -1)
            return "This option has been already added;"
        }
        this.setState((prevState) => {//nie ma =
            return {
                options: prevState.options.concat([option])//dodawany element musi być w klamrach - łączenie tablic
            };//concat tworzy nowa tablice zlozona z 2 podanych
        });
    }
    randomChoice(){
            alert(this.state.options[Math.floor(Math.random()*this.state.options.length)]);
    }
    render() {
        const title = "Indecision App";
        const subtitle = "Put your decision in the hands of computer";
        const actionButtonTxt = "What should I do?";
        return (
            <div>
                <Header title = {title} subtitle = {subtitle} />
                <AddOptions options = {this.state.options} addNew = {this.addNew}/>
                <Action ifAble = {this.state.options.length > 0} randomChoice = {this.randomChoice}
                actionButtonTxt = {actionButtonTxt}/>
                <Options options = {this.state.options} deleteAll = {this.deleteAll} />
            </div>
        );
    }
};
class Header extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}
class Action extends React.Component{
    render() {
        return (
            <div>
                <button 
                    onClick={this.props.randomChoice} 
                    disabled = {!this.props.ifAble}
                    >
                    {this.props.actionButtonTxt}
                </button>
            </div>
        );
    }
}
class Options extends React.Component {
    render(){
        return (
            <div> 
                {
                    this.props.options.map((option) => <Option key = {option} optionText={option}/>)
                }
                <p>There are {this.props.options.length} options</p>
                <button onClick = {this.props.deleteAll}> Remove all </button>
            </div>
        );
    }
}
class Option extends React.Component{
    render(){
        return(
            <div>
            {this.props.optionText}
            </div>
        )
    }
}
class AddOptions extends React.Component{
    constructor(props){//konstruktor zawsze w reactcie działa z props
        super(props); //żeby mieć dostęp do this.props
        this.formSubmit = this.formSubmit.bind(this);//żeby formSubmit miała dobry kontekst 
        this.state = {
            error: undefined //bedzie puste, jezeli blad sie nie pojawi
        }
    }//odnośnie this - bez tego wskazuje na undefined
    formSubmit (e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim() //trim pozwala na usuwanie także spacji;
        this.setState(() => {
            return {error: this.props.addNew(option)};
            }); 
        e.target.elements.option.value = '';
    }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit = {this.formSubmit}>
                    <input type = 'text' name = 'option'/>
                    <button>Add option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));