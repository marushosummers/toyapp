import React from "react";
import styles from "../styles/Home.module.css";

class Reel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern1: props.patterns ? props.patterns[1] : "",
      pattern2: props.patterns ? props.patterns[1] : "",
      pattern3: props.patterns ? props.patterns[1] : "",
      rolling1: false,
      rolling2: false,
      rolling3: false,
    };

    // get ref of dic onn which elements will roll
    this.slotRef = [React.createRef(), React.createRef(), React.createRef()];
  }

  // to trigger roolling and maintain state
  roll = () => {
    this.setState({
      rolling1: true,
      rolling2: true,
      rolling3: true,
    });
  };

  // to stop roolling
  stop = () => {
    // TODO: Numは引数として取る方法を考える
    const Num = this.getNextStop();

    this.setState({
      ["rolling" + Num]: false,
    });

    // this will trigger stopping effect
    // TODO: Numで指定する方法を調べる
    this.slotRef.forEach((slot, i) => {
      if (i === Num - 1) {
        const emojiIdx = this.getEmojiIdx();
        const emoji = this.getEmoji(emojiIdx);

        this.triggerStopEffect(slot.current, emojiIdx);
        this.setState({ [`pattern${i + 1}`]: emoji }, () => {
          if (i == 2) {
            const result = {
              pattern1: this.state.pattern1,
              pattern2: this.state.pattern2,
              pattern3: this.state.pattern3,
            };
            this.props.updateResult(result);
          }
        });
      }
    });
  };

  // get emoji Index
  getEmojiIdx = () => {
    return Math.ceil(Math.random() * (this.props.patterns.length - 2));
  };

  getEmoji = (Idx) => {
    return this.props.patterns[Idx];
  };
  // this will create a rolling effect and return random selected option
  triggerStopEffect = (ref, emojiIdx) => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let choosenOption = options[emojiIdx];
    setTop(-choosenOption.offsetTop + 20);
  };

  isRolling = () => {
    return this.state.rolling1 || this.state.rolling2 || this.state.rolling3;
  };

  getNextStop = () => {
    if (!this.isRolling()) {
      throw Error("Exception Error");
    }
    if (this.state.rolling1 && this.state.rolling2 && this.state.rolling3) {
      return 1;
    }
    if (!this.state.rolling1 && this.state.rolling2 && this.state.rolling3) {
      return 2;
    }
    if (!this.state.rolling1 && !this.state.rolling2 && this.state.rolling3) {
      return 3;
    }
  };

  render() {
    return (
      <div className={styles.SlotMachine}>
        <div className={styles.slot}>
          <div className={styles.section}>
            <div
              className={
                this.state.rolling1 ? styles.rollContainer : styles.container
              }
              ref={this.slotRef[0]}
            >
              {this.props.patterns &&
                this.props.patterns.map((pattern, i) => (
                  <div key={i}>
                    <span>{pattern}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.slot}>
          <div className={styles.section}>
            <div
              className={
                this.state.rolling3 ? styles.rollContainer : styles.container
              }
              ref={this.slotRef[2]}
            >
              {this.props.patterns &&
                this.props.patterns.map((pattern, i) => (
                  <div key={i}>
                    <span>{pattern}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.slot}>
          <div className={styles.section}>
            <div
              className={
                this.state.rolling2 ? styles.rollContainer : styles.container
              }
              ref={this.slotRef[1]}
            >
              {this.props.patterns &&
                this.props.patterns.map((pattern, i) => (
                  <div key={i}>
                    <span>{pattern}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div role="img" aria-labelledby="image-1">
          <div
            className={`${styles.btn} 
            ${this.isRolling() ? styles.stop : styles.start}`}
            onClick={
              this.isRolling()
                ? () => {
                    this.stop();
                  }
                : () => {
                    this.roll();
                  }
            }
          >
            {this.isRolling() ? "⏱" : "🎰"}
          </div>
        </div>
      </div>
    );
  }
}

export default Reel;
