import { customElement, property } from "lit/decorators.js";
import { LitElement, css, html } from "lit";
import { getTripById } from "@core/modules/trips/trips.api";
import { defaultStyles } from "../../style/styles";
import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";

let countdownInterval: any;

@customElement("countdown-clock")
class CountdownClock extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  tripId: string | null = null;
  @property()
  trip: any;
  @property()
  days: number = 0;
  @property()
  hours: number = 0;
  @property()
  minutes: number = 0;
  @property()
  seconds: number = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
    this.countdown(this.trip.startDate);
  }
  fetchItems() {
    this.isLoading = true;

    getTripById(this.tripId ?? "")
      .then(({ data }) => {
        this.trip = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  countdown = (date: Date) => {
    countdownInterval = setInterval(() => {
      const currentDate: Date = new Date();
      const newDate: Date = new Date(date);

      const timeLeft: number = newDate.getTime() - currentDate.getTime();

      const s: number = Math.floor(timeLeft / 1000);
      const m: number = Math.floor(s / 60);
      const h: number = Math.floor(m / 60);
      const d: number = Math.floor(h / 24);

      this.days = d;
      this.hours = h % 24;
      this.minutes = m % 60;
      this.seconds = s % 60;

      return [this.days, this.hours, this.minutes, this.seconds];
    }, 1000);
  };
  render() {
    const { isLoading, error, days, hours, minutes, seconds } = this;

    let content = html``;

    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (seconds < 0) {
      clearInterval(countdownInterval);
      content = html`<p>Trip has ended already :(</p>`;
    } else {
      content = html`
        <div class="countdown__items">
        
          <div class="countdown__item-group">
            <p class="countdown__item-number">${days}</p>
            <p class="countdown__item-text">${days > 1 ? "Days" : "Day"}</p>
          </div>
          <div class="countdown__item-group">
            <p class="countdown__item-number">${hours}</p>
            <p class="countdown__item-text">${hours > 1 ? "Hours" : "Hour"}</p>
          </div>
          <div class="countdown__item-group">
            <p class="countdown__item-number">${minutes}</p>
            <p class="countdown__item-text">
              ${minutes > 1 ? "Minutes" : "Minute"}
            </p>
          </div>
          <div class="countdown__item-group">
            <p class="countdown__item-number">${seconds}</p>
            <p class="countdown__item__text">
              ${seconds > 1 ? "Seconds" : "Second"}
            </p>
            <p> </p>
          </div>
        </div>
      `;
    }

    return html` ${content}`;
  }
  static styles = [
    defaultStyles,
    css`
      :host {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .countdown__items {
        display: flex;
        gap: 1rem; 
      }
      .countdown__item-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .countdown__item-number {
        font-size: 2rem;
        font-weight: 700;
        color: var(--main-blue);
      }
    `,
  ];
}

export default CountdownClock;
//credit: https://lennert-vangeert.github.io/Projects/Countdown/index.html
