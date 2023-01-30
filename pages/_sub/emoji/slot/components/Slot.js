import React from "react";
import Reel from "./Reel";
import styles from "../styles/Home.module.css";

import { TwitterShareButton, TwitterIcon } from "react-share";
class Slots extends React.Component {
  componentDidMount() {
    history.pushState("", "", "/");
  }

  static patterns = {
    fruits: ["🥝", "🍒", "🍉", "🍌", "🍋", "🍇", "🥝", "🍒"],
    animals: ["🦔", "🦄", "🦍", "🦊", "🐈", "🦒", "🦔", "🦄"],
    faces: ["😡", "🥺", "🤣", "🙂", "🥰", "🤪", "😡", "🥺"],
    foods: ["🥞", "🍣", "🍖", "🍔", "🍙", "🥟", "🥞", "🍣"],
  };

  constructor(props) {
    super(props);
    this.state = {
      patterns: Slots.patterns.fruits,
      result1: null,
      result2: null,
      result3: null,
    };
  }

  updateResult = (result) => {
    this.setState({
      result1: result.pattern1,
      result2: result.pattern2,
      result3: result.pattern3,
    });
  };

  handlePatternClick = (patternName) => {
    this.setState({
      patterns: Slots.patterns[patternName],
    });
  };

  getURL = (state) => {
    if (!state.result1) {
      return new URL("https://emoji.toyapp.dev/slot");
    }

    const url = new URL("https://emoji.toyapp.dev/slot");

    url.searchParams.append(
      "q",
      `${state.result1 ?? "🎰"} ${state.result2 ?? "🎰"} ${
        state.result3 ?? "🎰"
      }`,
    );
    return url;
  };

  render() {
    return (
      <div className={styles.emojiSlot}>
        <div className={styles.SlotMachine}>
          <div className={styles.patternsBtns}>
            <div
              className={styles.patternsBtn}
              onClick={() => this.handlePatternClick("fruits")}
            >
              🍒
            </div>
            <div
              className={styles.patternsBtn}
              onClick={() => this.handlePatternClick("animals")}
            >
              🦄
            </div>
            <div
              className={styles.patternsBtn}
              onClick={() => this.handlePatternClick("faces")}
            >
              🥺
            </div>
            <div
              className={styles.patternsBtn}
              onClick={() => this.handlePatternClick("foods")}
            >
              🍣
            </div>
          </div>
          <Reel
            patterns={this.state.patterns}
            key={this.state.patterns}
            ref={(c) => {
              this.reel = c;
            }}
            updateResult={this.updateResult}
          />
        </div>
        <div className={styles.share}>
          <div className={styles.balloon}>
            <div className={styles.pattern}>{this.state.result1 ?? "🎰"}</div>
            <div className={styles.pattern}>{this.state.result3 ?? "🎰"}</div>
            <div className={styles.pattern}>{this.state.result2 ?? "🎰"}</div>
          </div>
          <div className={styles.share_icon}>
            <TwitterShareButton
              title={`${this.state.result1 ?? "🎰"} ${
                this.state.result3 ?? "🎰"
              } ${this.state.result2 ?? "🎰"}\n\n#emoji_slot\n`}
              url={this.getURL(this.state)}
            >
              <TwitterIcon size={28} round />
            </TwitterShareButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Slots;
