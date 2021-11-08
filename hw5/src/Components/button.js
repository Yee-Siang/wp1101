
import React,{Component} from "react";
import '../index.css';

class Button extends Component {
  render() {

    if (this.props.Styletype==="1"){   
    return (
    <div className="app__item">
    <button className="Type1" onClick={() =>this.props.Click(this.props.No)}>{this.props.No}</button> 
    </div> 
    )}
    else  if (this.props.Styletype==="2"){   
      return (
      <div className="app__item">
      <button className="Type2" onClick={() =>this.props.Click(this.props.No)}>{this.props.No}</button> 
      </div> 
    )}
    else  if (this.props.Styletype==="3"){   
      return (
      <div className="app__item">
      <button className="Type3" onClick={() =>this.props.Click(this.props.No)}>{this.props.No}</button> 
      </div> 
    )}
    else  {   
      return (
      <div className="app__item">
      <button className="Type4" onClick={() =>this.props.Click(this.props.No)}>{this.props.No}</button> 
      </div> 
    )}
  }
}

export default Button;
