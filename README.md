# jQuery Calendar
A simple ***lightweight (2.1KB)*** jQuery plug-in to generate calendars with 8 responsive color schemes to choose from (or use your own style sheet).

You can pass events using optional parameters.

# Usage
Please make sure you have added the the plug-in script include in your page, as well as a copy of jQuery.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="js/calendar.min.js"></script>
```

You should probably also make sure you include the calendar.css stylesheet, unless you are creating your own stylesheet.
```html
<link rel="stylesheet" type="text/css" href="css/calendar.css">
```

It's really simple to implement a calendar by adding the HTML element to your page and passing the date parameter in a HTML5 data attribute:

```html
    <div id="calendar" data-date="2017-01-01"></div>
```

Then define your calendar in your script tag.

```js
    $('#calendar').calendar();
```

Optionally, you can pass the date parameter to the function instead of the HTML5 data attribute:

```html
    <div id="calendar"></div>
```

Then define your calendar in your script tag.

```js
    $('#calendar').calendar({date: '2017-01-01'});
```

You can add the optional parameters by passing a JavaScript object. For example, to generate an 'orange' theme calendar, use the color parameter.

```js
    $('#calendar').calendar({color: 'orange'});

    /* the default color scheme is Turquoise */
    $('#calendar').calendar({color: 'yellow'});
    $('#calendar').calendar({color: 'pink'});
    $('#calendar').calendar({color: 'purple'});
    $('#calendar').calendar({color: 'blue'});
    $('#calendar').calendar({color: 'green'});
    $('#calendar').calendar({color: 'grey'});
```

Parameter options:
 * 'date' - The date of the calendar to be instantiated.
 * 'color' - One of the available color schemes: yellow, pink, green, orange, purple, blue, turquoise (default) or none.
 * 'months' - Override the Month names i.e January, February, March, April, May, June, July, August, September, October, November, December.
 * 'days' - Override the day names i.e Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.
 * 'daysMin' - Override the day abbreviation i.e. SUN, MON, TUE, WED, THU, FRI, SAT.
 * 'dayLetter' - Override the day letter abbreviation i.e. S, M, T, W, T, F, S.
 * 'events' - The formatted array of events.

The passed event array must be in the following format:

```js
var events = [
    {start: '2017/04/01', end: '2017/04/07', summary: "Example Event", mask: true},
    {start: '2017/04/14', end: '2017/04/20', summary: "Example Event #2", mask: true},
    {start: '2017/05/05', end: '2017/05/15', summary: "Example Event #3", mask: true}
];
```

Each event must have a start date, end date, summary string and a mask boolean. The mask boolean should be true if you want to 'mask'(block off) event dates, or false.

***Please make sure you include the calendar.css style sheet in the head of your page, unless you choose to use your own style declarations.***

# Requirements
jQuery 1.11.1+

# License
Copyright (c) Benjamin Hall, benhall14@hotmail.com

Licensed under the MIT license
