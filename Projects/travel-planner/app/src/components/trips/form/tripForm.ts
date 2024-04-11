import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles, formStyles } from "../../../style/styles";
import { AxiosResponse } from "axios";
import { Trip, TripBody } from "@core/modules/trips/trips.types";
import { Router } from "@vaadin/router";
import { format } from "date-fns";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import "@components/design/Utils/pageTitle";
import "@components/design/Utils/buttons/primaryButton";

@customElement("trip-form")
class TripForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  submitlabel: string = "Create trip";
  @property()
  onSuccess: (() => void) | null = null;
  @property()
  method: ((trip: TripBody) => Promise<AxiosResponse<Trip>>) | null = null;

  @property()
  data: TripBody = {
    country: "",
    city: "",
    startDate: "",
    endDate: "",
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();

    if (!this.method) {
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const trip = {
      country: formData.get("country") as string,
      city: formData.get("city") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    };

    this.isLoading = true;
    if (trip.startDate > trip.endDate) {
      this.error = "The start date cannot be after the end date";
      this.isLoading = false;
      return;
    }
    this.method(trip)
      .then(({ data }) => {
        if (this.onSuccess) {
          this.onSuccess();
        }
        Router.go(`/trips/${data._id}`);
      })
      .catch((error) => {
        this.error = error;
      });
  };

  formatDate(date: string) {
    if (!date) {
      return;
    }
    return format(new Date(date), "yyyy-MM-dd");
  }

  render() {
    const { isLoading, handleSubmit, data, error, submitlabel } = this;

    return html`
      ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <label for="country" class="main__form-label">
          <p class="label__text">Country</p>
          <input
            type="text"
            name="country"
            autofocus="autofocus"
            class="main__form-input"
            placeholder="Belgium"
            .value=${data.country}
            required
          />
        </label>
        <label for="city" class="main__form-label">
          <p class="label__text">City</p>
          <input
            type="text"
            name="city"
            class="main__form-input"
            placeholder="Ghent"
            .value=${data.city}
            required
          />
        </label>
        <label for="startDate" class="main__form-label">
          <p class="label__text">Start date</p>
          <input
            type="date"
            name="startDate"
            min="${new Date().toISOString().split("T")[0]}"
            class="main__form-input"
            placeholder="Start date"
            .value=${this.formatDate(data.startDate)}
            required
          />
        </label>
        <label for="endDate" class="main__form-label">
          <p class="label__text">End date</p>
          <input
            type="date"
            name="endDate"
            class="main__form-input"
            placeholder="End date"
            .value=${this.formatDate(data.endDate)}
            required
          />
        </label>
        <button class="main__form-button" type="submit" ?disabled=${isLoading}>
          ${submitlabel}
        </button>
      </form>
    `;
  }

  static styles = [defaultStyles, formStyles];
}

export default TripForm;
