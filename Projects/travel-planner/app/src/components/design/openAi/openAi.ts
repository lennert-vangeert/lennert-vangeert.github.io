import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { defaultStyles, formStyles } from "../../../style/styles";
import OpenAI from "openai";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";

@customElement("ask-gpt")
class AskGpt extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  submitLabel: String = "Ask GPT-3";
  @property()
  output: String = "Your answer will appear here";

  connectedCallback(): void {
    super.connectedCallback();
  }

  handleSubmit = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const question = formData.get("question");
    event.preventDefault();

    const openai = new OpenAI({
        apiKey: "apiKey",
        dangerouslyAllowBrowser: true
    });
    const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": question as string}],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);
  };

  render() {
    const { isLoading, error, handleSubmit, submitLabel } = this;

    let content = html``;

    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading) {
      content = html`<loading-indicator></loading-indicator>`;
    } else {
      content = html`
        <form @submit=${handleSubmit}>
          <label for="question" class="main__form-label">
            <p class="label__text">What is you question?</p>
            <input
              type="text"
              name="question"
              class="main__form-input"
              placeholder="What is the meaning of life?"
              required
            />
          </label>
          <button
            class="main__form-button"
            type="submit"
            ?disabled=${isLoading}
          >
            ${submitLabel}
          </button>
            <p class="main__form-output">${this.output}</p>
        </form>
      `;
    }

    return html` ${content}`;
  }
  static styles = [defaultStyles, formStyles];
}

export default AskGpt;
