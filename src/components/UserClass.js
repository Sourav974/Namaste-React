import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    console.log("Child Constructor");
  }

  componentDidMount() {
    console.log("Child Component DidMount");
  }
  render() {
    console.log("Child Render");
    const { name, location } = this.props;
    const { count } = this.state;
    return (
      <div className="user-card">
        <h1>Count: {count}</h1>
        <button
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        >
          Count Increase
        </button>

        <button
          onClick={() => {
            this.setState({ count: count - 1 });
          }}
        >
          Count Decrease
        </button>

        <h2>Name: {name}</h2>
        <h3>Repos: {location}</h3>
        <h4>Contact: souravyadav97@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;
