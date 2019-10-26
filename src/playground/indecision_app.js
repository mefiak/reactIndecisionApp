const app = {
    title: "react app",
    subtitle: "by Mateusz Zanko",
    options: [],
}
const formSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        renderTemplate();
    }
};
const reset = () => {
    app.options = [];
    renderTemplate();
};
const makeChoice = () => {
    const randomNum = Math.floor(Math.random()*app.options.length);
    alert (app.options[randomNum]);
}
const renderTemplate = () => {
    const template = (
        <div>
            <h1> {app.title} </h1>
            {(app.subtitle) &&  <p> {app.subtitle}</p>} 
        <p>{(app.options.length > 0) ? 
        'Here are your options ': 'Options undetected' }</p>
        <p>{app.options.length}</p>
        <ol>
            {
                app.options.map((option) => <li key={option}>{option}</li>)
            }
        </ol>
        <button disabled = {(app.options.length == 0)} onClick = {makeChoice}>What should I do?</button>
        <form onSubmit={formSubmit}>
            <input type="text" name="option"/>
            <button>Add</button>
            <button onClick = {reset}>RESET</button>
        </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
 };

const appRoot = document.getElementById('app');
renderTemplate();