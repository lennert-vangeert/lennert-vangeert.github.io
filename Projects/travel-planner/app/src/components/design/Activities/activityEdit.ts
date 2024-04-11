import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { updateActivity } from "@core/modules/activities/activities.api";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/design/Activities/form/activityFormEdit";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/formContainer";
@customElement("activity-edit")
class ActivityEdit extends LitElement {
  render() {
    return html`
      <form-container>
        <page-title>Edit activity</page-title>
        <secondary-button @click=${() => goBack()}>Go back</secondary-button>
        <activity-form-edit .method=${updateActivity}></activity-form-edit>
      </form-container>
    `;
  }
}

export default ActivityEdit;
