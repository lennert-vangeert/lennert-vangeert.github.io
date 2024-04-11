import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { createTrip } from "@core/modules/trips/trips.api";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/trips/form/tripForm";
import "@components/design/Utils/buttons/secondaryButton"
import "@components/design/Utils/containers/formContainer";

@customElement("trip-create")
class TripCreate extends LitElement {
  render() {
    return html`
    <form-container>
      <page-title>Create trip</page-title>
      <secondary-button @click=${() => goBack()}>Go back</secondary-button>
      <trip-form .method=${createTrip}></trip-form>
      </form-container>
    `;
  }
}

export default TripCreate;
