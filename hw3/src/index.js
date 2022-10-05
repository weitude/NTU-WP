import React from "react";
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
                            placeholder="What needs to be done?"
                        />
                    </form>
                    <TodoList items={this.state.items}/>
                </div>
                <footer
                    className="todo-app__footer"
                    id="todo-footer"
                    style={{display: this.state.items.length ? "" : "none"}}
                >
                    <div className="todo-app__total">{this.state.items.length} left</div>
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
            id: Date.now(),
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

            <ul
                className="todo-app__list"
                id="todo-list"
                style={{display: this.props.items.length ? "" : "none"}}
            >
                {this.props.items.map(item => (
                    <TodoItem key={item.id} items={item}/>
                ))}
            </ul>
        );
    }
}

class TodoItem extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {complete: false};
    }

    change()
    {
        this.setState({complete: !this.state.complete});
    }

    render()
    {
        return (

            <li className="todo-app__item">

                <div className="todo-app__checkbox">
                    <input
                        type="checkbox"
                        id={this.props.items.id}
                        onClick={() => this.change()}
                    />
                    <label htmlFor={this.props.items.id}></label>
                </div>
                <h1
                    className="todo-app__item-detail"
                    style={{
                        textDecoration: this.state.complete ? "line-through" : "",
                        opacity: this.state.complete ? 0.5 : 1
                    }}>{this.props.items.text}</h1>
                <img src="https://i.imgur.com/JbhwBqT.png" className="todo-app__item-x" alt="item-x"/>
            </li>
        )

    }
}

root.render(<TodoApp/>);