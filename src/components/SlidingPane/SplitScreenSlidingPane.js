// @flow
import * as React from 'react';
import { Component } from 'react';
import styles from './SplitScreen.module.css';

type SlidingProps = {
  children?: React.Node
}

type SlidingState = {
  isOpen: boolean
}
export class SplitScreenSlidingPane extends Component<SlidingProps, SlidingState> {
  state = {
    isOpen: true,
  }

  toggle = (e: Event) => {
    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const classNames = [styles.slidingPane];

    if (this.state.isOpen) {
      classNames.push(styles.open);
    }

    return (
      <div className={classNames.join(' ')}>
        <button className={styles.slidingPaneToggle} onClick={this.toggle}>☰</button>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

type ToggleProps = {
  isOpen: boolean,
  children?: React.Node
}
export class SplitScreenTogglePane extends Component<ToggleProps, {}> {
  render() {
    return (
      <div style={{display: this.props.isOpen === true ? 'block' : 'none'}} className={styles.togglePane}>{this.props.children}</div>
    );
  }
}

// export default SplitScreenSlidingPane = SplitScreenSlidingPane;
