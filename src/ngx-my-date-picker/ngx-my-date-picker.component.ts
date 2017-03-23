import { Component, ElementRef, ViewEncapsulation, Renderer } from "@angular/core";
import { IMyDate, IMyMonth, IMyCalendarDay, IMyWeek, IMyOptions } from "./interfaces/index";
import { UtilService } from "./services/ngx-my-date-picker.util.service";

/*
declare var require: any;
const myDpStyles: string = require("./ngx-my-date-picker.component.css");
const myDpTpl: string = require("./ngx-my-date-picker.component.html");
*/

@Component({
    selector: "ngx-my-date-picker",
    styles: [`.ngxmdp{position:relative}.ngxmdp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.ngxmdp .selector{margin-top:2px;margin-left:-1px;position:absolute;width:252px;padding:0;border:1px solid #CCC;border-radius:4px;z-index:100;animation:selectorfadein 60ms}.ngxmdp .selector:focus{border:1px solid #ADD8E6;outline:0}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.ngxmdp .selectorarrow{background:#FAFAFA;margin-top:12px;padding:0}.ngxmdp .selectorarrow:after,.ngxmdp .selectorarrow:before{bottom:100%;border:solid transparent;content:" ";height:0;width:0;position:absolute}.ngxmdp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#FAFAFA;border-width:10px;margin-left:-10px}.ngxmdp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#CCC;border-width:11px;margin-left:-11px}.ngxmdp .selectorarrow:focus:before{border-bottom-color:#ADD8E6}.ngxmdp .selectorarrowleft:after,.ngxmdp .selectorarrowleft:before{left:24px}.ngxmdp .selectorarrowright:after,.ngxmdp .selectorarrowright:before{left:224px}.ngxmdp .invalidmonth,.ngxmdp .invalidyear{background-color:#F1DEDE}.ngxmdp ::-ms-clear{display:none}.ngxmdp .headerbtnenabled,.ngxmdp .headertodaybtnenabled{cursor:pointer}.ngxmdp .headerbtndisabled,.ngxmdp .headertodaybtndisabled{cursor:not-allowed}.ngxmdp .headerbtndisabled{opacity:.4}.ngxmdp .headertodaybtn{background:#FFF}.ngxmdp .header{width:100%;height:30px;border-radius:4px 4px 0 0;background-color:#FAFAFA}.ngxmdp .header td{vertical-align:middle;border:none;line-height:0}.ngxmdp .header td:nth-child(1){padding-left:4px}.ngxmdp .header td:nth-child(2){text-align:center}.ngxmdp .header td:nth-child(3){padding-right:4px}.ngxmdp .caltable{table-layout:fixed;width:100%;background-color:#FFF;border-radius:0 0 4px 4px;font-size:14px}.mydp .caltable tbody tr:nth-child(6) td:first-child{border-bottom-left-radius:4px}.mydp .caltable tbody tr:nth-child(6) td:last-child{border-bottom-right-radius:4px}.ngxmdp .caltable,.ngxmdp .daycell,.ngxmdp .weekdaytitle{border-collapse:collapse;color:#036;line-height:1.1}.ngxmdp .daycell,.ngxmdp .weekdaytitle{padding:5px;text-align:center}.ngxmdp .weekdaytitle{background-color:#DDD;font-size:12px;font-weight:700;vertical-align:middle;max-width:36px;overflow:hidden;white-space:nowrap}.ngxmdp .weekdaytitleweeknbr{width:20px;border-right:1px solid #BBB}.ngxmdp .daycell{cursor:pointer;height:30px}.ngxmdp .daycell div{background-color:inherit;vertical-align:middle}.ngxmdp .daycell div span{vertical-align:middle}.ngxmdp .daycellweeknbr{font-size:10px;border-right:1px solid #CCC;cursor:default;color:#000}.ngxmdp .nextmonth,.ngxmdp .prevmonth{color:#CCC}.ngxmdp .disabled{cursor:default!important;color:#CCC!important;background:#FBEFEF!important}.ngxmdp .sunday{color:#C30000}.ngxmdp .sundayDim{opacity:.5}.ngxmdp .currmonth{background-color:#F6F6F6;font-weight:700}.ngxmdp .currday{text-decoration:underline}.ngxmdp .selectedday div{border:1px solid #004198;background-color:#8EBFFF!important;border-radius:2px}.ngxmdp .headerbtncell{background-color:#FAFAFA;display:table-cell;vertical-align:middle}.ngxmdp .headerbtn,.ngxmdp .headerlabelbtn{background:#FAFAFA;border:none;height:18px}.ngxmdp .headerbtn{width:16px}.ngxmdp .headerlabelbtn{font-size:14px;outline:0}.ngxmdp .headerlabelbtnnotedit{cursor:default}.ngxmdp .headertodaybtn,.ngxmdp .monthinput,.ngxmdp .yearinput{border:1px solid #CCC}.ngxmdp .headerbtn,.ngxmdp .headermonthtxt,.ngxmdp .headertodaybtn,.ngxmdp .headeryeartxt{color:#000}.ngxmdp .headertodaybtn{padding:0 4px;border-radius:2px;font-size:11px;height:22px;min-width:60px;max-width:70px;overflow:hidden;white-space:nowrap}.ngxmdp button::-moz-focus-inner{border:0}.ngxmdp .headermonthtxt,.ngxmdp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.ngxmdp .headertodaybtn:focus{background:#ADD8E6}.ngxmdp .headerbtn:focus,.ngxmdp .monthlabel:focus,.ngxmdp .yearlabel:focus{color:#ADD8E6;outline:0}.ngxmdp .daycell:focus{outline:#CCC solid 1px}.ngxmdp .icon-calendar,.ngxmdp .icon-cross{font-size:16px}.ngxmdp .icon-left,.ngxmdp .icon-right{color:#222;font-size:16px;vertical-align:middle}.ngxmdp table{display:table;border-spacing:0}.ngxmdp table td{padding:0}.ngxmdp table,.ngxmdp td,.ngxmdp th{border:none}.ngxmdp .headertodaybtnenabled:hover,.ngxmdp .tablesingleday:hover{background-color:#8BDAF4}.ngxmdp .monthlabel,.ngxmdp .yearlabel{cursor:pointer}.ngxmdp .monthinput,.ngxmdp .yearinput{width:40px;height:22px;text-align:center;font-weight:700;outline:0;border-radius:2px}.ngxmdp .headerbtnenabled:hover,.ngxmdp .monthlabel:hover,.ngxmdp .yearlabel:hover{color:#8BDAF4}@font-face{font-family:ngx-mydatepicker;src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SAssAAAC8AAAAYGNtYXDMUczTAAABHAAAAGxnYXNwAAAAEAAAAYgAAAAIZ2x5ZmFQ1q4AAAGQAAABbGhlYWQGZuTFAAAC/AAAADZoaGVhB4IDyQAAAzQAAAAkaG10eBYAAnAAAANYAAAAIGxvY2EBdAE0AAADeAAAABJtYXhwABUAPgAAA4wAAAAgbmFtZQ5R9RkAAAOsAAABnnBvc3QAAwAAAAAFTAAAACAAAwOaAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmBwPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAUAAAABAAEAADAAAAAQAg5gDmAuYF5gf//f//AAAAAAAg5gDmAuYF5gf//f//AAH/4xoEGgMaARoAAAMAAQAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAMAEAAAAPAA4AABAAJAA4AEwAYAB0AIgAnACwAMQA2ADsAABMRMxEjFyE1IRUDITUhFQERMxEjJRUzNSMTFTM1IzMVMzUjMxUzNSMBFTM1IzMVMzUjMxUzNSMTFTM1I0Bzc0ADAP0AQAOA/IADDXNz/ZOAgCCAgMCAgMCAgP6AgIDAgIDAgIAggIADAP1AAsBzc3P9c3NzAwD9QALAgMDA/sCAgICAgID/AICAgICAgAJAwMAAAAAAAgBwADADkANQAAQACQAANwEnARcDATcBB+kCp3n9WXl5Aqd5/Vl5MAKnef1ZeQKn/Vl5Aqd5AAABAOAAAAMgA4AAAwAAAQMBJQMgA/3DASADgPyAAcPfAAEA4AAAAyADgAADAAA3EwEF4AMCPf7gAAOA/j3fAAAAAQAAAAEAAF0/BsNfDzz1AAsEAAAAAADRxFAkAAAAANHEUCQAAAAAA8ADgAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADwAABAAAAAAAAAAAAAAAAAAAACAQAAAAAAAAAAAAAAAIAAAAEAABABAAAcAQAAOAEAADgAAAAAAAKABQAHgB6AJYApgC2AAAAAQAAAAgAPAAMAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAkAAAABAAAAAAACAAcAcgABAAAAAAADAAkAPAABAAAAAAAEAAkAhwABAAAAAAAFAAsAGwABAAAAAAAGAAkAVwABAAAAAAAKABoAogADAAEECQABABIACQADAAEECQACAA4AeQADAAEECQADABIARQADAAEECQAEABIAkAADAAEECQAFABYAJgADAAEECQAGABIAYAADAAEECQAKADQAvHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclJlZ3VsYXIAUgBlAGcAdQBsAGEAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAckZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format('truetype');font-weight:400;font-style:normal}.ngxmdp .ngxmdpicon{font-family:ngx-mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngxmdp .icon-calendar:before{content:"\\e600"}.ngxmdp .icon-cross:before{content:"\\e602"}.ngxmdp .icon-left:before{content:"\\e605"}.ngxmdp .icon-right:before{content:"\\e607"}`],
    template: `<div class="ngxmdp"><div class="selector" [ngxfocus]="1" [ngStyle]="{'bottom': opts.openSelectorTopOfInput?((inputHeight + 2)+'px') : 'initial', 'left': opts.alignSelectorRight ? (inputWidth-selectorWidth+1)+'px' : '0'}" [ngClass]="{'selectorarrow': opts.showSelectorArrow, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight}" tabindex="0"><table class="header"><tr><td><div style="float:left"><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevMonth" class="headerbtn ngxmdpicon icon-left" (click)="prevMonth()" [disabled]="prevMonthDisabled" [ngClass]="{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}"></button></div><div class="headermonthtxt"><input type="text" *ngIf="editMonth" class="monthinput" maxlength="10" [ngxfocus]="2" [value]="visibleMonth.monthTxt" (keyup)="userMonthInput($event)" (click)="$event.stopPropagation()" [ngClass]="{'invalidmonth': invalidMonth}"> <button class="headerlabelbtn" [ngClass]="{'monthlabel': opts.editableMonthAndYear, 'headerlabelbtnnotedit': !opts.editableMonthAndYear}" type="button" *ngIf="!editMonth" (click)="editMonthClicked($event)" tabindex="{{opts.editableMonthAndYear?'0':'-1'}}">{{visibleMonth.monthTxt}}</button></div><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextMonth" class="headerbtn ngxmdpicon icon-right" (click)="nextMonth()" [disabled]="nextMonthDisabled" [ngClass]="{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}"></button></div></div></td><td *ngIf="opts.showTodayBtn"><button type="button" class="headertodaybtn" (click)="todayClicked()" [disabled]="disableTodayBtn" [ngClass]="{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}">{{opts.todayBtnTxt}}</button></td><td><div style="float:right"><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevYear" class="headerbtn ngxmdpicon icon-left" (click)="prevYear()" [disabled]="prevYearDisabled" [ngClass]="{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}"></button></div><div class="headeryeartxt"><input type="text" *ngIf="editYear" class="yearinput" maxlength="4" [ngxfocus]="2" [value]="visibleMonth.year" (keyup)="userYearInput($event)" (click)="$event.stopPropagation()" [ngClass]="{'invalidyear': invalidYear}"> <button class="headerlabelbtn" [ngClass]="{'yearlabel': opts.editableMonthAndYear, 'headerlabelbtnnotedit': !opts.editableMonthAndYear}" type="button" *ngIf="!editYear" (click)="editYearClicked($event)" tabindex="{{opts.editableMonthAndYear?'0':'-1'}}">{{visibleMonth.year}}</button></div><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextYear" class="headerbtn ngxmdpicon icon-right" (click)="nextYear()" [disabled]="nextYearDisabled" [ngClass]="{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}"></button></div></div></td></tr></table><table class="caltable"><thead><tr><th class="weekdaytitle weekdaytitleweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'">#</th><th class="weekdaytitle" scope="col" *ngFor="let d of weekDays">{{d}}</th></tr></thead><tbody><tr *ngFor="let w of dates"><td class="daycell daycellweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'">{{w.weekNbr}}</td><td class="daycell" *ngFor="let d of w.week" [ngClass]="{'currmonth':d.cmo===CURR_MONTH&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===CURR_MONTH, 'disabled': d.disabled, 'tablesingleday': d.cmo===CURR_MONTH&&!d.disabled}" (click)="!d.disabled&&cellClicked(d);$event.stopPropagation()" (keydown)="cellKeyDown($event, d)" tabindex="0"><div [ngClass]="{'prevmonth':d.cmo===PREV_MONTH,'currmonth':d.cmo===CURR_MONTH,'nextmonth':d.cmo===NEXT_MONTH,'sunday':d.dayNbr === 0 && opts.sunHighlight}"><span [ngClass]="{'currday':d.currDay&&opts.markCurrentDay, 'sundayDim': opts.sunHighlight && d.dayNbr === 0 && (d.cmo===PREV_MONTH || d.cmo===NEXT_MONTH || d.disabled)}">{{d.dateObj.day}}</span></div></td></tr></tbody></table></div></div>`,
    providers: [UtilService],
    encapsulation: ViewEncapsulation.None
})

export class NgxMyDatePicker {
    opts: IMyOptions;
    visibleMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedDate: IMyDate = {year: 0, month: 0, day: 0};
    weekDays: Array<string> = [];
    dates: Array<IMyWeek> = [];
    disableTodayBtn: boolean = false;
    dayIdx: number = 0;
    weekDayOpts: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];

    editMonth: boolean = false;
    invalidMonth: boolean = false;
    editYear: boolean = false;
    invalidYear: boolean = false;

    dateChanged: Function;
    calendarViewChanged: Function;
    inputWidth: number = 0;
    inputHeight: number = 0;
    selectorWidth: number = 0;

    prevMonthDisabled: boolean = false;
    nextMonthDisabled: boolean = false;
    prevYearDisabled: boolean = false;
    nextYearDisabled: boolean = false;

    PREV_MONTH: number = 1;
    CURR_MONTH: number = 2;
    NEXT_MONTH: number = 3;

    constructor(public elem: ElementRef, private renderer: Renderer, private utilService: UtilService) {
        renderer.listen(elem.nativeElement, "click", (evt: MouseEvent) => {
            if (this.opts.editableMonthAndYear && evt.target) {
                this.resetMonthYearEdit();
            }
        });
    }

    initialize(opts: IMyOptions, defaultMonth: string, inputValue: string, inputWidth: number, inputHeight: number, dc: Function, cvc: Function): void {
        this.opts = opts;
        this.weekDays.length = 0;

        this.isTodayDisabled();
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx: number = this.dayIdx;
            for (let i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }

        let date: IMyDate = this.utilService.isDateValid(inputValue, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
        if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
            this.selectedDate = date;
        }
        else {
            if (defaultMonth !== null && defaultMonth !== undefined && defaultMonth !== "") {
                this.selectedMonth = this.utilService.parseDefaultMonth(defaultMonth);
            }
        }

        this.dateChanged = dc;
        this.calendarViewChanged = cvc;
        this.inputWidth = inputWidth;
        this.inputHeight = inputHeight;
        this.selectorWidth = this.elem.nativeElement.children[0].children[0].offsetWidth;

        this.setVisibleMonth();
    }

    resetMonthYearEdit(): void {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    }

    editMonthClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editMonth = true;
        }
    }

    editYearClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editYear = true;
        }
    }

    userMonthInput(event: any): void {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidMonth = false;

        let m: number = this.utilService.isMonthLabelValid(event.target.value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            if (m !== this.visibleMonth.monthNbr) {
                this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: this.visibleMonth.year};
                this.generateCalendar(m, this.visibleMonth.year);
            }
        }
        else {
            this.invalidMonth = true;
        }
    }

    userYearInput(event: any): void {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidYear = false;

        let y: number = this.utilService.isYearLabelValid(Number(event.target.value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            if (y !== this.visibleMonth.year) {
                this.visibleMonth = {monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y};
                this.generateCalendar(this.visibleMonth.monthNbr, y);
            }
        }
        else {
            this.invalidYear = true;
        }
    }

    isTodayDisabled(): void {
        this.disableTodayBtn = this.utilService.isDisabledDay(this.getToday(), this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates);
    }

    setVisibleMonth(): void {
        // Sets visible month of calendar
        let y: number = 0, m: number = 0;
        if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                let today: IMyDate = this.getToday();
                y = today.year;
                m = today.month;
            } else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};

        // Create current month
        this.generateCalendar(m, y);
    }

    prevMonth(): void {
        // Previous month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    nextMonth(): void {
        // Next month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    prevYear(): void {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    nextYear(): void {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    todayClicked(): void {
        // Today button clicked
        let today: IMyDate = this.getToday();
        this.selectDate(today);
    }

    cellClicked(cell: any): void {
        // Cell clicked on the calendar
        if (cell.cmo === this.PREV_MONTH) {
            // Previous month of day
            this.prevMonth();
        }
        else if (cell.cmo === this.CURR_MONTH) {
            // Current month of day
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.NEXT_MONTH) {
            // Next month of day
            this.nextMonth();
        }
        this.resetMonthYearEdit();
    }

    cellKeyDown(event: any, cell: any) {
        // Cell keyboard handling
        if ((event.keyCode === 13 || event.keyCode === 32) && !cell.disabled) {
            event.preventDefault();
            this.cellClicked(cell);
        }
    }

    selectDate(date: IMyDate): void {
        // Notifies parent using callback
        this.dateChanged(this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels));
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        // Return number of days of the previous month
        let d: Date = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }

    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.CURR_MONTH;
    }

    getToday(): IMyDate {
        let date: Date = new Date();
        return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    }

    getDayNumber(date: IMyDate): number {
        // Get day number: su=0, mo=1, tu=2, we=3 ...
        let d: Date = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    }

    getWeekday(date: IMyDate): string {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    }

    getDate(year: number, month: number, day: number): Date {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number): void {
        this.dates.length = 0;
        let today: IMyDate = this.getToday();
        let monthStart: number = this.monthStartIdx(y, m);
        let dInThisM: number = this.daysInMonth(m, y);
        let dInPrevM: number = this.daysInPrevMonth(m, y);

        let dayNbr: number = 1;
        let cmo: number = this.PREV_MONTH;
        for (let i = 1; i < 7; i++) {
            let week: Array<IMyCalendarDay> = [];
            if (i === 1) {
                // First week
                let pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = {year: y, month: m - 1, day: j};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.utilService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates)});
                }

                cmo = this.CURR_MONTH;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.utilService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates)});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    let date: IMyDate = {year: y, month: cmo === this.CURR_MONTH ? m : m + 1, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.utilService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates)});
                    dayNbr++;
                }
            }
            let weekNbr: number = this.opts.showWeekNumbers  && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({week: week, weekNbr: weekNbr});
        }

        this.setHeaderBtnDisabledState(m, y);

        // Notify parent
        this.calendarViewChanged({year: y, month: m, first: {number: 1, weekday: this.getWeekday({year: y, month: m, day: 1})}, last: {number: dInThisM, weekday: this.getWeekday({year: y, month: m, day: dInThisM})}});
    }

    setHeaderBtnDisabledState(m: number, y: number): void {
        let dpm: boolean = false;
        let dpy: boolean = false;
        let dnm: boolean = false;
        let dny: boolean = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y)}, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({year: y - 1, month: m, day: this.daysInMonth(m, y - 1)}, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1}, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({year: y + 1, month: m, day: 1}, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    }
}
