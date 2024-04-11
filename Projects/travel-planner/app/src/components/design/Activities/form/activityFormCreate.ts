import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../../../style/styles";
import { Router } from "@vaadin/router";
import { AxiosResponse } from "axios";
import {
  Activity,
  ActivityBody,
  FullActivity,
} from "@core/modules/activities/activities.types";
import { getTripById } from "@core/modules/trips/trips.api";
import { Trip } from "@core/modules/trips/trips.types";

@customElement("activity-form-create")
class ActivityFormCreate extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: FullActivity = {
    title: "",
    description: "",
    type: "",
    date: "",
    startTime: "",
    endTime: "",
    tripId: "",
    userId: "",
  };
  @property()
  trip: Trip | null = null;
  @property()
  submitLabel: String = "Add activity";
  @property()
  method:
    | ((
        activity: ActivityBody,
        id?: string
      ) => Promise<AxiosResponse<Activity>>)
    | null = null;
  @property()
  onSuccess: (() => void) | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }
  fetchItems() {
    this.isLoading = true;

    getTripById(window.location.search.split("=")[1])
      .then(({ data }) => {
        this.trip = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();
    const tripId = window.location.search.split("=")[1];

    const formData = new FormData(event.target as HTMLFormElement);
    const activity = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      tripId: tripId,
    };
    this.isLoading = true;
    if (activity.startTime > activity.endTime) {
      this.error = "The start time cannot be later than the end time";
      return;
    }
    this.method(activity)
      .then(({ data }) => {
        if (this.onSuccess) {
          this.onSuccess();
          console.log(data);
        }
        Router.go(`/trips/${tripId}`);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, handleSubmit, data, error, submitLabel } = this;
      return html`
        ${error ? html`<error-view error=${error} />` : ""}
        <form @submit=${handleSubmit}>
          <label for="title" class="main__form-label">
            <p class="label__text">Title</p>
            <input
              type="text"
              name="title"
              class="main__form-input"
              placeholder="Bike tour"
              autofocus
              .value=${data.title}
              required
            />
          </label>
          <label for="description" class="main__form-label">
            <p class="label__text">description</p>
            <input
              type="text"
              name="description"
              class="main__form-input"
              placeholder="Riding around the city visiting the most important places"
              .value=${data.description}
              required
            />
          </label>
          <label for="type" class="main__form-label">
            <p class="label__text">Type of activity</p>
            <select name="type" class="main__form-input">
              .value=${data.type} required />
              <option value="sports">Sports</option>
              <option value="food">Food</option>
              <option value="culture">Culture</option>
              <option value="errands">Errands</option>
              <option value="relaxation">Relaxation</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label for="date" class="main__form-label">
            <p class="label__text">Date</p>
            <input
              type="date"
              min="${this.trip?.startDate.split("T")[0]}"
              max="${this.trip?.endDate.split("T")[0]}"
              name="date"
              class="main__form-input"
              placeholder="Don't forget to bring your passport!"
              .value=${data.date}
              required
            />
          </label>
          <label for="startTime" class="main__form-label">
            <p class="label__text">start time</p>
            <input
              type="time"
              min="${new Date().toISOString().split("T")[0]}"
              name="startTime"
              class="main__form-input"
              .value=${data.startTime}
              required
            />
          </label>
          <label for="endTime" class="main__form-label">
            <p class="label__text">end time</p>
            <input
              type="time"
              min="0"
              name="endTime"
              class="main__form-input"
              .value=${data.endTime}
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
        </form>
      `;
    }

  static styles = [defaultStyles, formStyles];
}

export default ActivityFormCreate;
