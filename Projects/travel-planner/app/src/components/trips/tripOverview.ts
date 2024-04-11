import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getTrips } from "@core/modules/trips/trips.api";
import { Trip } from "@core/modules/trips/trips.types";
import { format } from "date-fns";
import { defaultStyles } from "../../style/styles";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import "@components/design/Utils/pageTitle";
import "@components/design/Utils/containers/gridContainer";
import "@components/design/Utils/secondaryTitle";

@customElement("trip-overview")
class TripOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  trips: Array<Trip> | null = null;
  @property()
  error: string | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }

  fetchItems() {
    this.isLoading = true;
    // todo in api
    getTrips()
      .then(({ data }) => {
        this.trips = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, trips, error } = this;

    const getWelcomeMessage = () => {
      const currentTime = new Date().getHours();

      if (currentTime >= 6 && currentTime < 12) {
        return "Good morning!🌄🛌☕";
      } else if (currentTime >= 12 && currentTime < 18) {
        return "Good afternoon! 🌞👋🏼";
      } else {
        return "Good evening! 🌅🛋️";
      }
    };

    if (error) {
      return html`<error-view error=${error} />`;
    }

    if (isLoading || !trips) {
      return html`<loading-indicator></loading-indicator>`;
    }
    if (trips.length === 0) {
      return html`
      
       <div class="container">
         <page-title>Trips</page-title>
          <secondary-title>${getWelcomeMessage()}</secondary-title>
          <a class="create__button" href="/trips/create">Create trip</a>
  
          <p>You have no trips</p>
          
       </div>
        `;
    }
    return html`
      <page-title>Trips</page-title>
      <secondary-title>${getWelcomeMessage()}</secondary-title>
      <a class="create__button" href="/trips/create">Create trip</a>
      <grid-container>
        ${trips.map((c) => {
          const randomRotation = Math.floor(Math.random() * 11) - 5;

          const checkDate = (date: string) => {
            const tripDate = new Date(date);
            const currentDate = new Date();

            if (tripDate < currentDate) {
              return `opacity: 0.5;`;
            } else {
              const daysDifference = Math.floor(
                (tripDate.getTime() - currentDate.getTime()) /
                  (1000 * 3600 * 24)
              );

              if (daysDifference < 14) {
                const notificationMessage = `Your trip to ${c.city} is coming up in ${daysDifference} days!`;
                const notificationTag = `trip-${c._id}`; // Use a unique tag for each trip
                sendNotification(notificationMessage, notificationTag);
                console.log(notificationMessage);
                return;
              }
            }
          };

          const sendNotification = (message: string, tag: string) => {
            Notification.requestPermission().then(function (result) {
              if (result === "granted") {
                let notification = new Notification("Trip Reminder", {
                  body: message,
                  tag: tag, // Set a unique tag for each notification
                });
                console.log(notification);
              }
            });
          };

          return html`
          <div>
            <a class="card__anchor" href="/trips/${c._id}"
             ">
              <div class="card" style="transform: rotate(${randomRotation}deg); ${checkDate(
            c.startDate
          )} ">
                <svg
                  class="card__thumbtack"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.48 122.88"
                >
                  <defs>
                    <style>
                      .cls-1 {
                        fill: #ef4136;
                      }
                      .cls-1,
                      .cls-2 {
                        fill-rule: evenodd;
                      }
                      .cls-2 {
                        fill: #1a1a1a;
                      }
                    </style>
                  </defs>
                  <title>thumbtack</title>
                  <path
                    class="cls-1"
                    d="M121.21,36.53,85.92,1.23c-3-3-7.77.1-9.2,2.74-.24.45.19.86-.2,3.92A46.27,46.27,0,0,1,73.8,19.21L58.11,34.91c-6.27,6.26-15.23,3.48-22.87-.32-1.62-.8-3.69-2.57-5.48-.78l-6.64,6.64a2.49,2.49,0,0,0,0,3.53L78.9,99.76a2.5,2.5,0,0,0,3.53,0l6.64-6.64c1.77-1.77-.49-4.06-1.41-6-3.4-7-6.45-16.41-.78-22.08l16.39-16.39a84.14,84.14,0,0,1,11.35-2.57c3.09-.49,3.47-.11,3.91-.4,2.71-1.74,5.7-6.15,2.68-9.17Z"
                  />
                  <polygon
                    class="cls-2"
                    points="53.48 82.11 40.77 69.4 0 120.96 1.92 122.88 53.48 82.11 53.48 82.11"
                  />
                </svg>
                <div class="image__container">
                  <img
                    class="card__image"
                    src="https://source.unsplash.com/200x200/?${c.city}"
                    alt="${c.city}"
                  />
                </div>
                <div class="card__content">
                  <h2 class="card__title">${c.city}</h2>
                  <p class="card__text">${c.country}</p>
                  <p class="card__text">
                    ${format(c.startDate, "dd - MM - yyyy")}
                  </p>
                </div>
              </div>
            </a>
            </div>
          `;
        })}
      </grid-container>
    `;
  }
  static styles = [
    defaultStyles,
    css`
      :host {
        display: block;
        width: 100vw;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      .card {
        position: sticky;
        border-radius: 4px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
        padding: 16px;
        margin: 16px;
        width: 200px;
        transition: all 0.3s ease-in-out;
      }
      .card__anchor {
        width: fit-content;
      }
      .card__image {
        width: 100%;
        object-fit: cover;
        border-radius: 4px;
        transition: all 0.3s ease-in-out;
      }
      .card__thumbtack {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        z-index: 1;
      }
      .image__container {
        overflow: hidden;
        border-radius: 4px;
      }
      .card__content {
        padding: 1rem 0 1rem;
      }
      .card__content-anchor {
        text-align: right;
      }
      .card__title {
        font-size: 1.5rem;
        margin: 0;
      }
      .card__text {
        margin: 0;
      }
      .create__button {
        background-color: #00ffff;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        color: #000;
        transition: all 0.3s ease-in-out;
      }
      .create__button:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      }
      .card:hover {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
      }
      .card:hover .card__image {
        animation: imageHover 0.5s ease-in-out;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;
        justify-content: center;
        gap: 1rem;
      }

      @media (max-width: 850px) {
        .container {
          align-items: center;
        }
      }

      @keyframes imageHover {
        0%,
        100% {
          scale: 1;
        }
        50% {
          scale: 1.1;
        }
      }
    `,
  ];
}

export default TripOverview;
