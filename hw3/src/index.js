import React from "react";
import ReactDOM from 'react-dom/client';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

class TodoApp extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {items: [], text: '', show: "All", gray: 0, green: 0};
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
                <div className="todo-app__main">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="todo-app__input"
                            onChange={this.handleChange}
                            value={this.state.text}
                            placeholder="What needs to be done?"
                        />
                    </form>
                    <ul
                        className="todo-app__list"
                        id="todo-list"
                        style={{display: this.state.items.length ? "" : "none"}}
                    >
                        {this.state.items.map(item => (
                            <TodoItem
                                key={item.id}
                                item={item}
                                show={this.state.show}
                                onComplete={() => this.handleComplete(item)}
                                onDel={() => this.handleDel(item)}
                            />
                        ))}
                    </ul>
                </div>

                <footer
                    className="todo-app__footer"
                    id="todo-footer"
                    style={{display: this.state.items.length === 0 ? "none" : ""}}
                >
                    <div className="todo-app__total">{this.showHowManyLeft()} left</div>
                    <ul className="todo-app__view-buttons">
                        <li>
                            <button onClick={() => this.changeShow("All")}>All</button>
                        </li>
                        <li>
                            <button onClick={() => this.changeShow("Active")}>Active</button>
                        </li>
                        <li>
                            <button onClick={() => this.changeShow("Completed")}>Completed</button>
                        </li>
                    </ul>
                    <div
                        className="todo-app__clean"
                        style={{visibility: this.state.green === 0 ? "hidden" : ""}}
                    >
                        <button onClick={() => this.clearCompleted()}>Clear completed</button>
                    </div>
                </footer>
            </div>);
    }

    clearCompleted()
    {
        let newArray = [...this.state.items];
        newArray = newArray.filter(newArray => newArray.complete === false);
        this.setState({
            items: newArray,
            green: 0,
        });
    }

    showHowManyLeft()
    {
        if (this.state.show === "All")
            return this.state.items.length
        else if (this.state.show === "Active")
            return this.state.gray
        else if (this.state.show === "Completed")
            return this.state.green
    }

    handleComplete(item)
    {
        const newArray = [...this.state.items]
        const index = newArray.indexOf(item)
        let newItem = {...newArray[index]}
        if (newItem.complete)
            this.setState({gray: this.state.gray + 1, green: this.state.green - 1})
        else
            this.setState({gray: this.state.gray - 1, green: this.state.green + 1})
        newItem.complete = !newItem.complete
        newArray[index] = newItem
        this.setState({items: newArray});
    }

    changeShow(type)
    {
        this.setState({show: type})
    }

    handleDel(item)
    {
        const newItems = [...this.state.items]
        const index = newItems.indexOf(item)
        if (index !== -1)
        {
            if (newItems[index].complete)
                this.setState({green: this.state.green - 1})
            else
                this.setState({gray: this.state.gray - 1})
            newItems.splice(index, 1);
            this.setState({items: newItems})
        }
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
            content: this.state.text,
            id: Date.now(),
            complete: false
        };
        this.setState({
            items: this.state.items.concat(newItem),
            text: '',
            gray: this.state.gray + 1
        });
    }
}

class TodoItem extends React.Component {
    decideShow()
    {
        if (this.props.show === "All")
            return ""
        else if (this.props.show === "Active")
            return this.props.item.complete ? "none" : ""
        else if (this.props.show === "Completed")
            return this.props.item.complete ? "" : "none"
    }

    render()
    {
        return (
            <li className="todo-app__item" style={{
                display: this.decideShow()
            }}>

                <div className="todo-app__checkbox">
                    <input
                        type="checkbox"
                        id={this.props.item.id}
                        onClick={() => this.props.onComplete(this)}
                    />
                    <label htmlFor={this.props.item.id}></label>
                </div>
                <h1
                    className="todo-app__item-detail"
                    style={{
                        textDecoration: this.props.item.complete ? "line-through" : "",
                        opacity: this.props.item.complete ? 0.5 : 1
                    }}
                >
                    {this.props.item.content}
                </h1>
                <img
                    src="https://i.imgur.com/JbhwBqT.png"
                    className="todo-app__item-x"
                    alt="item-x"
                    onClick={() => this.props.onDel(this)}
                />
            </li>
        )
    }
}

root.render(<TodoApp/>);