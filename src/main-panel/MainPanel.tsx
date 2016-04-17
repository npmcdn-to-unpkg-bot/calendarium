/**__________________________________________________________________________________________________________________
 * | MainPanel is a React component.
 * | Uses inside Calendarium to manage its.
 * |
 * @author sumbad
 */

import * as React from 'react';

import {DateUtilities} from '../DateUtilities';
import {DatePanel} from '../date-panel/DatePanel'


interface IMainPanelProps {
    selectedDate: Date;
    handleClick: (DatePanel) => void;
}

interface IMainPanelState {

}


export class MainPanel extends React.Component<IMainPanelProps, IMainPanelState> {

    constructor(props: IMainPanelProps) {
        super(props);
    }

    render() {
        let day = DateUtilities.toDayOfMonthString(this.props.selectedDate);
        let month = DateUtilities.toMonthString(this.props.selectedDate);
        let year = this.props.selectedDate.getFullYear().toString();
        let hours = DateUtilities.pad(this.props.selectedDate.getHours().toString(), 2);
        let minutes = DateUtilities.pad(this.props.selectedDate.getMinutes().toString(), 2);

        return (
            <div className="main-panel">
                <label onClick={this.handleClickDay.bind(this) } className="chosen-day selected">{day}</label>
                <label onClick={this.handleClickMonth.bind(this) } className="chosen-month">{month}</label>
                <label onClick={this.handleClickYear.bind(this) } className="chosen-year">{year}</label>
                <label className="chosen-time">
                    <div className="chosen-time__hour">
                        <div className="arrow-up"></div>
                        <span onClick={this.handleClickHours.bind(this) }>{hours}</span>
                        <div className="arrow-down"></div>
                    </div>
                    <div className="chosen-time__colon">
                        <span>: </span>
                    </div>
                    <div className="chosen-time__minute">
                        <div className="arrow-up"></div>
                        <span onClick={this.handleClickMinutes.bind(this) }>{minutes}</span>
                        <div className="arrow-down"></div>
                    </div>
                </label>
            </div>
        );
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ADDITIONAL METHODS
    //


    handleClickDay() {
        this.props.handleClick(DatePanel.Weeks);
    }


    handleClickMonth() {
        this.props.handleClick(DatePanel.Months);
    }


    handleClickYear() {
        this.props.handleClick(DatePanel.Years);
    }


    handleClickHours() {
        this.props.handleClick(DatePanel.Hours);
    }


    handleClickMinutes() {
        this.props.handleClick(DatePanel.Minutes);
    }


    //
    // ADDITIONAL METHODS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}