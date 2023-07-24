import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "Dummy",
      public_repos: 3,
    };

    console.log("Parent constructor");
  }

  async componentDidMount() {
    const data = await fetch(" https://api.github.com/users/Sourav974");
    const json = await data.json();
    this.setState({
      login: json.login, // Assign the 'login' property from the response to 'login' state
      public_repos: json.public_repos, // Assign the 'public_repos' property from the response to 'public_repos' state
    });
    console.log("data", json);
    console.log("Parent component Did Mount");
  }

  render() {
    const { login, public_repos } = this.state;
    console.log("Parent render");
    return (
      <div>
        <h1>About us</h1>
        {/* <User name={"Sourav (function)"} /> */}
        <UserClass name={login} location={public_repos} />
      </div>
    );
  }
}

export default About;
