import React = require('react');
import {DateUtilities} from '../DateUtilities';



export interface IWeekState { }

export interface IWeekProps {
    key: number;
    start: Date;
    month: number;
    selected: boolean;
    minDate: number;
    maxDate: number;

    onSelect(day: number): any;
}


export class Week extends React.Component<IWeekProps, IWeekState>{

    constructor(props: IWeekProps) {
        super(props);

        this.isDisabled = this.isDisabled.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    /** 
     * Create days of the week
     */
    buildDays(start) {
        // push start day to array days
        var days = [DateUtilities.clone(start)];
        // clonning start day
        var clone = DateUtilities.clone(start);
        
        for (var i = 1; i <= 6; i++) {
            clone = DateUtilities.clone(clone);
            clone.setDate(clone.getDate() + 1);
            days.push(clone);
        }
        return days;
    }

    isOtherMonth(day) {
        return this.props.month !== day.month();
    }

    getDayClassName(day) {
        var className = "day";
        if (DateUtilities.isSameDay(day, new Date()))
            className += " today";
        if (this.props.month !== day.getMonth())
            className += " other-month";
        if (this.props.selected && DateUtilities.isSameDay(day, this.props.selected))
            className += " selected";
        if (this.isDisabled(day))
            className += " disabled";
        return className;
    }

    onSelect(day) {
        if (!this.isDisabled(day))
            this.props.onSelect(day);
    }

    isDisabled(day) {
        var minDate = this.props.minDate,
            maxDate = this.props.maxDate;

        return (minDate && DateUtilities.isBefore(day, minDate)) || (maxDate && DateUtilities.isAfter(day, maxDate));
    }

    render() {
        var days = this.buildDays(this.props.start);
        var DaysElement = days.map((day, i) => {
            return (
                <div key={i} onClick={this.onSelect.bind(null, day) } className={this.getDayClassName(day) }>
                        {DateUtilities.toDayOfMonthString(day)}
                </div>
            );
        });

        return (
            <div className="week">
                {DaysElement}
            </div>
        );
        
        
        // React.createElement("div", { className: "week" },
        //     days.map(function(day, i) {
        //         return React.createElement("div", { key: i, onClick: this.onSelect.bind(null, day), className: this.getDayClassName(day) }, DateUtilities.toDayOfMonthString(day))
        //     }.bind(this))
        // );
    }
}