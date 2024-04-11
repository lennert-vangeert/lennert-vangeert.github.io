import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@components/design/Utils/header-navigation";
import "@components/design/Utils/containers/appContainer";

@customElement("my-app")
class App extends LitElement {
  render() {
    return html` <slot></slot> `;
  }
}

export default App;
