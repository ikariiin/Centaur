import React, { Component } from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Subscriber} from "../../../Functional/Subscriber";
import {SubscriptionsEnum} from "../../../Configuration/SubscriptionsEnum";
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import JoinCard from "./JoinCard";
import {UserPair} from "../../../Functional/UserPair";

export default class PeopleList extends Component {
  static subs = [
    SubscriptionsEnum.user_change,
    SubscriptionsEnum.user_leave,
    SubscriptionsEnum.user_join
  ];

  state = {
    activeChatContext: {
      username: null,
      code: null,
      details: null,
      active: true
    },
    people: []
  };

  addPerson(person, code, switchContext = true) {
    this.setState(prevState => ({
      people: [
        ...prevState.people,
        {
          ...person,
          code
        }
      ]
    }));
    if(switchContext) {
      this.changeChatContext({
        ...person,
        code
      });
    }
  }

  componentDidMount() {
    this.subscriber = new Subscriber(
      this.props.websocket
    );

    this.subscriber.subscribe(
      PeopleList.subs,
      (data) => this.handleSubscriptionData(data)
    );

    this.props.setAddNewPerson((person, code) => this.addPerson(person, code));
    this.props.setOpenConversation((person) => this.changeChatContext(person))
  }

  componentWillUnmount() {
    this.subscriber.unsubscribe(
      PeopleList.subs
    );
  }

  changeChatContext(person) {
    this.props.onChange({
      ...person,
      active: true
    });
    this.setState({
      activeChatContext: {
        username: person['username'],
        details: person['details'],
        code: person['code'],
        active: true
      }
    });
  }

  checkIfConnected(code) {
    return this.state.people.map(person => person.code).includes(code);
  }

  requestPair(code) {
    const userPair = new UserPair(this.props.websocket);
    // We cannot allow the user to pair with himself
    if(code === this.props.joinCode) return;

    // Check if we are already connected to them
    if(this.checkIfConnected(code)) {
      const requiredPerson = this.state.people.filter(person => person.code === code)[0];
      this.changeChatContext(requiredPerson);
      return;
    }

    userPair.request(
      code,
      this.props.activeUsername,
      this.props.joinCode,
      (user) => this.addPerson(
        user,
        code
      )
    );
  }

  handleUserLeave(data) {
    const leaveUserCode = data.code;
    if(this.state.people.map(person => person.code).filter(code => code === leaveUserCode).length !== 0) {
      this.setState(prevState => ({
        people: prevState.people.filter(person => person.code !== leaveUserCode)
      }));
      // Check if the same person is in the active chat context. If yes, close the current chat context.
      if(this.state.activeChatContext.code === leaveUserCode) {
        this.setState(prevState => ({
          activeChatContext: {
            ...prevState.activeChatContext,
            active: false
          }
        }), () => this.props.onChange(this.state.activeChatContext));
      }
    }
  }

  handleSubscriptionData(data) {
    if(data.type === 'event user-leave') {
      this.handleUserLeave(data);
    }
  }

  render() {
    return (
      <section className="people-list">
        {this.state.people.length !== 0
          ? (this.state.people.map((person, index) => (
            <div tabIndex={1} className={`person ${this.state.activeChatContext.username === person['username'] && 'active'}`} key={index} role="button" onClick={this.state.activeChatContext.username === person['username'] ? (() => {}) : (() => this.changeChatContext(person))}>
              <MoreVertIcon className="action-trigger" />
              <Avatar className="person-avatar">
                {person.username[0].toUpperCase()}
              </Avatar>
              <section className="details">
                <div className="username">{person.username}</div>
                <div className="about">{person.details.userAbout.trim().length === 0 ? 'This user likes to keep a mystery surrounding them' : person.details.userAbout}</div>
              </section>
            </div>
          )))
          : <div className="no-people">No people are sharing a chat session with you at this moment.</div>}
          <JoinCard joinCode={this.props.joinCode} requestPair={(code) => this.requestPair(code)} />
      </section>
    );
  }
}