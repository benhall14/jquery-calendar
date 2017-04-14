/*global $, jQuery*/

/*!
 * jQuery Calendar
 * https://github.com/benhall14/jquery-calendar
 *
 * Copyright Benjamin Hall
 * Released under the MIT license
 */
$.fn.calendar = function (options) {
    "use strict";

    return this.each(function () {

        function daysInMonth(year, month) {

            var feb = (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
                ? 29
                : 28;

            var arr = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            return arr[month];

        }

        function findEvents(events, day) {

            var found_events = [];

            if (events) {

                $.each(events, function () {

                    if (day.getTime() >= this.start.getTime() && day.getTime() <= this.end.getTime()) {

                        found_events.push(this);

                    }

                });

            }

            return found_events || false;
        }

        var defaults = {
            color: false,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            dayLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            events: false
        };

        options = options || {};

        var $opt = $.extend(defaults, options);

        if ($opt.events) {

            $.each($opt.events, function (index, value) {

                value.start = new Date(value.start);
                value.start.setHours(0, 0, 0, 0);

                value.end = new Date(value.end);
                value.end.setHours(0, 0, 0, 0);

                $opt.events[index] = value;

            });

        }

        var date;
        if ($opt.date) {
            date = new Date($opt.date);
        } else {
            date = new Date($(this).data('date'));
        }

        if (isNaN(date.valueOf())) {
            date = new Date();
        }

        date.setDate(1);
        date.setHours(0, 0, 0, 0);

        var running_day = date;

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        var total_days_in_month = daysInMonth(date.getFullYear(), date.getMonth());

        var thead = $('<thead/>')
            .append(
                $('<tr/>')
                    .addClass('calendar-title')
                    .append(
                        $('<th/>')
                            .attr('colspan', 7)
                            .text($opt.months[date.getMonth()] + ' ' + date.getFullYear())
                    )
            )
            .append(
                $('<tr/>')
                    .addClass('calendar-header')
                    .html('<th>' + $opt.daysMin.join('</th><th>') + '</th>')
            );

        var tbody = '<tbody><tr>';

        var x;
        for (x = 0; x < date.getDay(); x += 1) {
            tbody += '<td class="pad"> </td>';
        }

        var running_day_count = 1;

        var today_class;
        var $class;
        var events;
        var event_summary;

        while (running_day_count <= total_days_in_month) {

            events = findEvents($opt.events, running_day);

            today_class = running_day.getTime() === today.getTime()
                ? ' today'
                : '';

            $class = '';

            event_summary = ' ';

            if (events) {

                $.each(events, function () {

                    if (this.start.getTime() === running_day.getTime()) {

                        $class += this.mask
                            ? ' mask-start'
                            : '';

                        $class += this.classes
                            ? ' ' + this.classes
                            : '';

                        event_summary += this.summary || '';

                    } else if (running_day.getTime() > this.start.getTime() && running_day.getTime() < this.end.getTime()) {
                        $class += this.mask
                            ? ' mask'
                            : '';

                    } else if (running_day.getTime() === this.end.getTime()) {

                        $class += this.mask
                            ? ' mask-end'
                            : '';

                    }

                });

            }

            tbody += '<td class="day' + $class + today_class + '" title="' + event_summary + '">';

            tbody += '<div>' + running_day.getDate() + '</div>';

            tbody += '<div>' + event_summary + '</div>';

            tbody += '</td>';

            if (running_day.getDay() === 6) {
                tbody += '</tr>';

                if ((running_day_count + 1) <= total_days_in_month) {
                    tbody += '<tr>';
                }

            }

            running_day.setDate(date.getDate() + 1);
            running_day_count += 1;

        }

        var padding_at_end_of_month = 7 - running_day.getDay();

        if (padding_at_end_of_month && padding_at_end_of_month < 7) {

            for (x = 1; x <= padding_at_end_of_month; x += 1) {

                tbody += '<td class="pad"> </td>';

            }

        }

        var color_scheme = '';
        if($opt.color) {
            color_scheme = $opt.color;
        }

        $(this).html(
            $('<table/>')
                .addClass('calendar ' + color_scheme)
                .append(thead)
                .append(tbody)
        );

    });

};