class Toggle extends React.Component {
    constructor(props){
        super(props);
        this.buttonChange = this.buttonChange.bind(this);
        this.state = {
            decision: false,
        }
    }
    buttonChange () {
            this.setState((prevState) => {
                return{
                    decision: !prevState.decision
                };
            })
        
    }
    render() { 
        const txt = ' You smell well.'
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick = {this.buttonChange}>{(this.state.decision)? 'Hide details':'Show Deteils'}</button>
                {(this.state.decision)&& <p>{txt}</p>}
            </div>
        );
    }
}
ReactDOM.render(<Toggle/>, document.getElementById('app'))


/* const toggle = {
    name: 'Visibility Toggle',
    buttonName: ['Show details', 'Hide details'],
    details: 'Hidden details'
}
let  number = 0;
const buttonChange = () => {
    if(number == 0) {
        number = 1;
    }
    else number = 0;
    renderToggle();
}
const renderToggle = () => {
    const template = (
        <div>
            <h1>{toggle.name}</h1>
            <button onClick = {buttonChange}>
                {toggle.buttonName[number]}
            </button>
            {(number == 1) &&<p>{toggle.details} </p>}
        </div>
    );
        ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('app');
renderToggle();*/