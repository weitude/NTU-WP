import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

class TodoApp extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {items: [], text: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render()
    {
        return (
            <div className="todo-app__root">
                <header className="todo-app__header">
                    <div className="todo-app__title">todos</div>
                </header>
                <div id="main" className="todo-app__main">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="todo-app__input"
                            onChange={this.handleChange}
                            value={this.state.text}
                        />
                    </form>
                    <TodoList items={this.state.items}/>
                </div>
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">2 left</div>
                    <ul className="todo-app__view-buttons">

                        <li>
                            <button>All</button>
                        </li>
                        <li>
                            <button>Active</button>
                        </li>
                        <li>
                            <button>Completed</button>
                        </li>
                    </ul>
                    <div className="todo-app__clean">Clear completed</div>

                </footer>
            </div>
        );
    }

    handleChange(e)
    {
        this.setState({text: e.target.value});
    }

    handleSubmit(e)
    {
        e.preventDefault();
        if (this.state.text.length === 0)
        {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
}

class TodoList extends React.Component {
    render()
    {
        return (
            <ul className="todo-app__list" id="todo-list">
                {this.props.items.map(item => (
                    <li className="todo-app__item" key={item.id}>

                        <div className="todo-app__checkbox">
                            <input type="checkbox" id="2"/>
                            <label htmlFor="2"></label>
                        </div>
                        <h1 className="todo-app__item-detail">{item.text}</h1>
                        <img src="https://i.imgur.com/JbhwBqT.png" className="todo-app__item-x" alt="item-x"/>
                    </li>
                ))}
            </ul>
        );
    }
}

root.render(<TodoApp/>);