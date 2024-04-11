import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { TripContext, tripContext } from "./tripDetailContainer";
import { defaultStyles } from "../../style/styles";
import { format } from "date-fns";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import "@components/design/Notes/noteOverview";
import "@components/trips/countdown";
import "@components/design/Utils/pageTitle";
import "@components/design/Utils/secondaryTitle";
import "@components/design/Expenses/expenseOverview";
import "@components/design/Activities/activityOverview";

@customElement("trip-detail")
class TripDetail extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public tripContextValue?: TripContext | null;

  render() {
    const { tripContextValue } = this;

    if (!tripContextValue || !tripContextValue.trip) {
      return html``;
    }
    const { trip } = tripContextValue;
    if (!trip) {
      return html``;
    }

    const downloadICS = () => {
      const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//Example//Example Calendar//EN
      BEGIN:VEVENT
      SUMMARY:${trip.city}, ${trip.country}
      DTSTART:${trip.startDate.replace(/\.\d+Z$/, 'Z')}
      DTEND:${trip.endDate.replace(/\.\d+Z$/, 'Z')}
      LOCATION:${trip.city}, ${trip.country}
      DESCRIPTION:Trip to ${trip.city}, ${trip.country}
      UID:${trip._id}
      END:VEVENT
      END:VCALENDAR
  `;

      const blob = new Blob([icsContent], { type: "text/calendar" });
      console.log("ICS Content:", icsContent);

      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = `${trip.city}_${trip.country}_Trip.ics`;

      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    };

    return html`
      <page-title>${trip.country} ${trip.city}</page-title>
      <countdown-clock .trip=${trip}></countdown-clock>
      <section class="container">
        <secondary-title>Trip information</secondary-title>
        <p class="information__item">
          Start date: ${format(trip.startDate, "dd - MM - yyyy")}
        </p>
        <p class="information__item">
          End date: ${format(trip.endDate, "dd - MM - yyyy")}
        </p>
        <p class="information__item">
          Destination: ${trip.city}, ${trip.country}
        </p>
        <button class="download__button" @click=${downloadICS}>
          Download Calendar Event
        </button>
        <a class="tripinfo__button edit" href="/trips/${trip._id}/edit">Edit</a>
        <a
          class="tripinfo__button delete"
          href="/trips/delete?tripId=${trip._id}"
          >Delete</a
        >
        <secondary-title>Notes</secondary-title>
        <note-overview .tripId=${trip._id}></note-overview>
        <secondary-title>Expenses</secondary-title>
        <expense-overview .tripId=${trip._id}></expense-overview>
        <secondary-title>Activities</secondary-title>
        <activity-overview .tripId=${trip._id}></activity-overview>
        </section>
        <div class="card">
          <div class="image__container">
            <img
              class="card__image"
              src="https://source.unsplash.com/200x200/?${trip.city}"
              alt="${trip.city}"
            />
          </div>
          <div class="card__content">
            <h2 class="card__title">${trip.city}</h2>
            <p class="card__text">${trip.country}</p>
            <p class="card__text">
              ${format(trip.startDate, "dd - MM - yyyy")}
            </p>
          </div>
        </div>
    `;
  }

  static styles = [
    defaultStyles,
    css`
      .container {
        width: 100%;
        padding: 0px 15vw;
        box-sizing: border-box;
      }
      .download__button {
        display: block;
        margin: 1rem 0;
        cursor: pointer;
        background-color: var(--main-blue);
        border: none;
        padding: 0.5rem 1rem;
        transition: all 0.3s ease-in-out;
      }
      .download__button:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease-in-out;
      }
      .tripinfo__button {
        cursor: pointer;
      }
      .edit {
        color: #000;
      }
      .delete {
        color: red;
      }
      .information__item {
        margin: 0.5rem 0;
      }
      .card {
        position: absolute;
        top: 0;
        right: 0;
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

      @media (max-width: 1000px) {
        .card {
          display: none;
        }
        .container {
          padding: 0px 5vw;

        }
      }
      @media (max-width: 600px) {
        .container {
          padding: 0px 2vw;
        }
      }
    `,
  ];
}

export default TripDetail;
