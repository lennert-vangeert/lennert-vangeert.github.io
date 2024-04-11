import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../../../style/styles";
import { AxiosResponse } from "axios";
import { Trip } from "@core/modules/trips/trips.types";
import { goBack } from "@core/modules/utils/goBack";
import {
  Activity,
  ActivityBody,
  FullActivity,
} from "@core/modules/activities/activities.types";
import { getActivityById } from "@core/modules/activities/activities.api";

@customElement("activity-form-edit")
class ActivityFormEdit extends LitElement {
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
  activity: Activity | null = null;
  @property()
  trip: Trip | null = null;
  @property()
  submitLabel: String = "edit activity";
  @property()
  method:
    | ((activity: ActivityBody, id: string) => Promise<AxiosResponse<Activity>>)
    | null = null;
  @property()
  onSuccess: (() => void) | null = null;
  @property()
  activityId: string = window.location.search.split("=")[1];

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchActivity();
  }
  fetchActivity() {
    getActivityById(this.activityId)
      .then(({ data }) => {
        this.activity = data;
        console.log(this.activity);
      })
      .catch((error) => {
        this.error = error;
      });
  }
  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const activity = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
    };
    this.isLoading = true;
    if (activity.startTime > activity.endTime) {
      this.error = "The start time cannot be later than the end time";
      return;
    }
    this.method(activity, window.location.search.split("=")[1])
      .then(({ data }) => {
        if (this.onSuccess) {
          console.log(data);
          this.onSuccess();
        }
        goBack();
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, handleSubmit, error, submitLabel, activity } =
      this;
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
              .value=${activity?.title}
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
              .value=${activity?.description}
              required
            />
          </label>
          <label for="type" class="main__form-label">
            <p class="label__text">Type of activity</p>
            <select name="type" class="main__form-input">
              .value=${activity?.type} required />
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
          <label for="amount" class="main__form-label">
            <p class="label__text">Date</p>
            <input
              type="date"
              min="0"
              name="date"
              class="main__form-input"
              placeholder="Don't forget to bring your passport!"
              .value=${activity?.date}
              required
            />
          </label>
          <label for="amount" class="main__form-label">
            <p class="label__text">start time</p>
            <input
              type="time"
              min="0"
              name="startTime"
              class="main__form-input"
              .value=${activity?.startTime}
              required
            />
          </label>
          <label for="amount" class="main__form-label">
            <p class="label__text">end time</p>
            <input
              type="time"
              min="0"
              name="endTime"
              class="main__form-input"
              .value=${activity?.endTime}
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

export default ActivityFormEdit;
