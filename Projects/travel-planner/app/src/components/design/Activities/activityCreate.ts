import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { createActivity } from "@core/modules/activities/activities.api";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/design/Activities/form/activityFormCreate";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/formContainer";
@customElement("activity-create")
class ActivityCreate extends LitElement {
  render() {
    return html`
      <form-container>
        <page-title>Create activity</page-title>
        <secondary-button @click=${() => goBack()}>Go back</secondary-button>
        <activity-form-create .method=${createActivity}></activity-form-create>
      </form-container>
    `;
  }
}

export default ActivityCreate;
