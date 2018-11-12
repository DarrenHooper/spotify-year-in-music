import React from "react";
import "./List.scss";

class List extends React.Component {
    render() {
        return <div className="popular-list">
            <h2 className="popular-list__title">{this.props.list_title}</h2>
            <ol className="popular-list__list">
                {this.props.list_elements && this.props.list_elements.map(function(d, idx){
                    return (<li key={idx}>{d}</li>)
                })}
            </ol>
        </div>
    }
}
export default List;
