import React, { Component } from "react";

class chat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "32c6f42328735c5b7e7cf3ec42397181c",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      if (!window.kommunicate) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      }
    })(document, window.kommunicate || {});
  }
  render() {
    return <div></div>;
  }
}

export default chat;
