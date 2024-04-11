import { getActivities } from "@core/modules/activities/activities.api";
import { Activity } from "@core/modules/activities/activities.types";
import { format } from "date-fns";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tableStyles } from "../../../style/styles";

@customElement("activity-overview")
class ActivityOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  activities: Array<Activity> | null = null;
  @property()
  error: string | null = null;
  @property()
  tripId: string | null = null;
  @property()
  activityId: string | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }

  fetchItems() {
    this.isLoading = true;

    let filters = {};
    if (this.tripId) {
      filters = { tripId: this.tripId };
    }

    getActivities(filters)
      .then(({ data }) => {
        this.activities = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  formatDate(date: string) {
    if (!date) {
      return;
    }
    return format(new Date(date), "dd-MM-yyyy");
  }
  groupActivitiesByDay(activities: Activity[]) {
    const groupedActivities = new Map<string, Activity[]>();

    activities.forEach((activity) => {
      const dateKey: any = this.formatDate(activity.date);
      if (groupedActivities.has(dateKey)) {
        groupedActivities.get(dateKey)?.push(activity);
      } else {
        groupedActivities.set(dateKey, [activity]);
      }
    });

    return groupedActivities;
  }

  render() {
    const { isLoading, activities, error } = this;

    let content = html``;

    if (error) {
      content = html`<p>You have no activities</p>
        <a href="/activities/create?tripId=${this.tripId}">Add activity</a>`;
    } else if (isLoading || !activities) {
      content = html`<loading-indicator></loading-indicator>`;
    } else {
      const groupedActivities = this.groupActivitiesByDay(activities);

      content = html`
        <div>
          ${Array.from(groupedActivities.keys()).map((dateKey) => {
            const dateActivities = groupedActivities.get(dateKey) || [];
            return html`
              <div>
                <h3>${dateKey}</h3>
                <table class="table">
                  <tr class="table__row-head">
                    <th class="table__head">Title</th>
                    <th class="table__head">Description</th>
                    <th class="table__head">Start time</th>
                    <th class="table__head">End time</th>
                    <th class="table__head"></th>
                    <th class="table__head"></th>
                    <th class="table__head"></th>
                  </tr>
                  ${dateActivities.map((a) => {
                    return html`
                      <tr class="table__row">
                        <td class="table__item">${a.title}</td>
                        <td class="table__item">${a.description}</td>
                        <td class="table__item">${a.startTime}</td>
                        <td class="table__item">${a.endTime}</td>
                        <td class="table__item">
                          <img class="type__icon"
                          src="../../../../icons/${a.type}.svg"
                        </td>
                        <td class="table__item">
                          <a
                            class="table__item-anchor"
                            href="/activities/edit?activityId=${a._id}"
                            >Edit</a
                          >
                        </td>
                        <td class="table__item">
                          <a
                            class="table__item-anchor red"
                            href="/activities/delete?activityId=${a._id}"
                            >Delete</a
                          >
                        </td>
                      </tr>
                    `;
                  })}
                </table>
              </div>
            `;
          })}
        </div>
        <a href="/activities/create?tripId=${this.tripId}">Add activity</a>
      `;
    }

    return html` ${content}`;
  }
  static styles = [
    tableStyles,
    css`
      .table__item-anchor {
        color: black;
      }
      .red {
        color: red;
      }
    `,
  ];
}

export default ActivityOverview;
