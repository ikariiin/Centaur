import React, { Component } from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Subscriber} from "../../../Functional/Subscriber";
import {SubscriptionsEnum} from "../../../Configuration/SubscriptionsEnum";

export default class PeopleList extends Component {
  static subs = [
    SubscriptionsEnum.user_change,
    SubscriptionsEnum.user_leave,
    SubscriptionsEnum.user_join
  ];

  state = {
    activeChatContext: {
      username: null
    },
    people: [{
      username: 'Ikari',
      lastMessage: 'Everybody else is shit!'
    }, {
      username: 'Saitama',
      lastMessage: 'You reckon you can finish it by saturday?'
    }, {
      username: 'Archer',
      lastMessage: 'Hey there douche.'
    }]
  };

  componentDidMount() {
    this.subscriber = new Subscriber(
      this.props.websocket
    );

    this.subscriber.subscribe(
      PeopleList.subs,
      (data) => this.handleData(data)
    );
  }

  componentWillUnmount() {
    this.subscriber.unsubscribe(
      PeopleList.subs
    );
  }

  changeChatContext(person) {
    this.props.onChange(person);
    this.setState({
      activeChatContext: {
        username: person['username']
      }
    });
  }

  handleData(data) {
    console.log(data);
  }

  render() {
    return (
      <section className="people-list">
        {this.state.people.map((person, index) => (
          <div className={`person ${this.state.activeChatContext.username === person['username'] && 'active'}`} key={index} role="button" onClick={() => this.changeChatContext(person)}>
            <Avatar className="person-avatar">
              {person.username[0].toUpperCase()}
            </Avatar>
            <section className="details">
              <div className="username">{person.username}</div>
              <div className="last-message">{person.lastMessage}</div>
            </section>
          </div>
        ))}
      </section>
    );
  }
}