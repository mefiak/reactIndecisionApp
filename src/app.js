class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.deleteAll = this.deleteAll.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
        this.randomChoice = this.randomChoice.bind(this);
        this.addNew = this.addNew.bind(this);
        this.state = {
            options: props.options
        };
    }
    componentDidMount(){
        try {
            const json = localStorage.getItem('options') //pobieramy istniejace opcje kiedy odswieza sie strone
            const options = JSON.parse(json) //zawartosc localStorage zmieniona spowrotem na obiekt
            if(options)
                this.setState(() => ({options})) //próba wepchania zawartości do state'a
        }
        catch (e){
            //nic nie robimy, bo chodzi tylko o powtorzenie try na wypadek zlych wartosci
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)//przeklada obiekty na tekst, w innym wypadku obiekty zostaną jednolitym tekstem
            localStorage.setItem('options', json) //przekłada tekst do zmiennej lokalnej, usuwając wartości, to też je traci
         }
    }
    componentwillUnmount(){
        console.log('ComponentWillUnmount')
    }
    deleteOption(option2remove)  {
        this.setState((prevState) => ({
            options: prevState.options.filter(// funkcja działa jak mapowanie, ale kiedy zwraca prawdę dla wartości
            (option) =>{                        //to wrzuca ją do nowej tablicy, a jak zwraca fałsz, to wyrzuca tą wartość
                    return option !== option2remove
                })
        }))
    }
    deleteAll(){
        this.setState(() => ({options: []}));
    }
    addNew(option){
        if(!option){
            return "There is nothing to add" ;//funkcja zwróci coś tylko w wypadku, gdy będzie błąd
        }
        else if(this.state.options.indexOf(option)>-1){//jeżeli już istnieje pod jakimś indeksem (inaczej zwróci -1)
            return "This option has been already added;"
        }
        this.setState((prevState) => ({options: prevState.options.concat([option])}));
            //dodawany element musi być w klamrach - łączenie tablic//concat tworzy nowa tablice zlozona z 2 podanych
    }
    randomChoice(){
            alert(this.state.options[Math.floor(Math.random()*this.state.options.length)]);
    }
    render() {
        const subtitle = "Put your decision in the hands of computer";
        const actionButtonTxt = "What should I do?";
        return (
            <div>
                <Header subtitle = {subtitle} 
                />
                <AddOptions options = {this.state.options} 
                addNew = {this.addNew}
                />
                <Action ifAble = {this.state.options.length > 0} 
                randomChoice = {this.randomChoice}
                actionButtonTxt = {actionButtonTxt}
                />
                <Options deleteOption = {this.deleteOption} 
                    options = {this.state.options} 
                    deleteAll = {this.deleteAll} 
                />
            </div>
        );
    }
};
IndecisionApp.defaultProps = {
    options: []
};
const Header  = (props) => {
        return ( //dziala jak render przy bezstanowych, komponentowych funkcjach, this tu nie dziala
            <div>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
        );
};
Header.defaultProps = {
    title: "Indecision App",
}
const Action = (props) =>{
    return (
        <div>
            <button 
                onClick={props.randomChoice} 
                disabled = {!props.ifAble}
                >
                {props.actionButtonTxt}
            </button>
        </div>
        );
};
const Options = (props) => {
    return (
        <div> 
            {
                props.options.map((option) => <Option key = {option} optionText={option} 
                deleteOption ={props.deleteOption}/>)
            }
            <p>There are {props.options.length} options</p>
            <button onClick = {props.deleteAll}> Remove all </button>
        </div>
    );
};
const Option =(props) => {
    return( 
        <div> 
            {props.optionText} 
            <button onClick = {(e) => {props.deleteOption(props.optionText)}}>remove</button> 
        </div>/*wyświetla możliwe wartości
        e - żeby zadziałało odnośnie tego co w niego kliknięto*/
    );
};
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
        this.setState(() => ({error: this.props.addNew(option)}));
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