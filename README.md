# Event Calendar

This project displays an interactive calendar where you can view upcoming events based on a JSON file. The calendar is rendered in HTML, and events are highlighted on their respective days.

## Features

- Displays a full calendar grid with months and days.
- Highlights days with upcoming events.
- Displays event details (title and description) for each event when hovering over the event.
- The events are fetched from a `JSON` file that contains the date, title, and links.

## How to Use:

### Event Format:
Events are stored as a JSON array in [events.json](https://github.com/VijaySamant4368/hashcalendar/blob/main/events.json), with each event containing the following properties:
- `date`: The date of the event in `YYYY-MM-DD` format.
- `title`: The title of the event.
- `link`: A URL link related to the event.
- `type`: The type of event, which will determine the color associated with the event on the calendar (e.g., `startline`, `deadline`, etc.).

#### Example JSON File:
```json
[
    {
        "date": "2025-03-24",
        "title": "google-summer-of-code-2025",
        "link": "https://opensource.googleblog.com/2025/01/google-summer-of-code-2025-is-here.html",
        "type": "startline"
    },
    {
        "date": "2025-04-08",
        "title": "google-summer-of-code-2025",
        "link": "https://opensource.googleblog.com/2025/01/google-summer-of-code-2025-is-here.html",
        "type": "deadline"
    }
]
```

### `eventcolor` Object

The `eventcolor` object in [colors.js](https://github.com/VijaySamant4368/hashcalendar/blob/main/colors.js) defines colors for each event type:

```javascript
{
  "startline": "green",
  "deadline": "red"
}
```

### `defaultcolor` variable

In [colors.js](https://github.com/VijaySamant4368/hashcalendar/blob/main/colors.js), a default color ("blue") is assigned for events that do not match the predefined event types:

```javascript
const defaultcolor = "blue";
```

You can use this structure to easily manage event timelines, assigning colors to each event based on its type. You can modify the `events` file to add more events, change the dates, or update the URLs for each event.
