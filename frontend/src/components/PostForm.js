import React, {Component} from "react";

export default class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', text: ''};
    }

    render() {
        return (<form className="input-area">
                <div>
                    <label htmlFor="name">name:</label>
                    <input id='name' value={this.state.name} placeholder='name' onChange={(event) => this.setState({'name': event.target.value})}/>
                </div>
                <div>
                    <label htmlFor="text">text:</label>
                    <input id='text' value={this.state.text} placeholder='text' onChange={(event) => this.setState({'text': event.target.value})}/>
                </div>
                <button disabled={this.state.name.length < 1 || this.state.text.length < 1} onClick={this.onSend}>send</button>
            </form>
        );
    }

    onSend = () => {
        this.props.onSendPost({...this.state});
        this.setState({name: '', text: ''});
    }
}
