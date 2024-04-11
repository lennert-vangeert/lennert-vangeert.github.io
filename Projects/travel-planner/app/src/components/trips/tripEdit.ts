import { consume } from "@lit/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TripContext, tripContext } from "./tripDetailContainer";
import { TripBody } from "@core/modules/trips/trips.types";
import { updateTrip } from "@core/modules/trips/trips.api";
import { defaultStyles } from "../../style/styles";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import "@components/trips/form/tripForm";
import "@components/design/Utils/pageTitle";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/formContainer";
import { goBack } from "@core/modules/utils/goBack";

@customElement("trip-edit")
class TripEdit extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public tripContextValue?: TripContext | null;

  handleSuccess = () => {
    const { tripContextValue } = this;
    if (tripContextValue) {
      tripContextValue.refresh();
    }
  };

  render() {
    const { tripContextValue } = this;

    if (!tripContextValue || !tripContextValue.trip) {
      return html``;
    }
    const { trip } = tripContextValue;

    if (!trip) {
      return html``;
    }

    return html` 
    <form-container>
    <page-title>Edit trip</page-title>
      <secondary-button @click=${() => goBack()}>Go back</secondary-button>
      <trip-form
        submitLabel="Edit"
        .onSuccess=${this.handleSuccess}
        .data=${trip}
        .method=${(body: TripBody) => updateTrip(trip._id, body)}
      >
      </trip-form>
      </form-container>`;
  }

  static styles = [defaultStyles];
}

export default TripEdit;
