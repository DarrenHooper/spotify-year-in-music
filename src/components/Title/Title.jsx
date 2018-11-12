import React from "react";
import "./Title.scss";

class Title extends React.Component {
    render() {
        return <header className="Title">
            <h1 className="Title__text">{this.props.title_text}</h1>
        </header>
    }
}
export default Title;
