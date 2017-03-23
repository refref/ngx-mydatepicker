import {
    Directive,
    Input,
    ComponentRef,
    ElementRef,
    ViewContainerRef,
    Renderer,
    ComponentFactoryResolver,
    forwardRef,
    EventEmitter,
    Output,
    SimpleChanges,
    OnChanges,
    HostListener
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {
    IMyDate,
    IMyDateRange,
    IMyDayLabels,
    IMyMonthLabels,
    IMyOptions,
    IMyDateModel,
    IMyCalendarViewChanged,
    IMyInputFieldChanged
} from "./interfaces/index";
import {NgxMyDatePicker} from "./ngx-my-date-picker.component";
import {UtilService} from "./services/ngx-my-date-picker.util.service";

const NGX_DP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxMyDatePickerDirective),
    multi: true
};

@Directive({
    selector: "[ngx-mydatepicker]",
    exportAs: "ngx-mydatepicker",
    providers: [UtilService, NGX_DP_VALUE_ACCESSOR]
})
export class NgxMyDatePickerDirective implements OnChanges, ControlValueAccessor {
    @Input() options: IMyOptions;
    @Input() defaultMonth: string;

    @Output() dateChanged: EventEmitter<IMyDateModel> = new EventEmitter<IMyDateModel>();
    @Output() inputFieldChanged: EventEmitter<IMyInputFieldChanged> = new EventEmitter<IMyInputFieldChanged>();
    @Output() calendarViewChanged: EventEmitter<IMyCalendarViewChanged> = new EventEmitter<IMyCalendarViewChanged>();
    @Output() calendarToggle: EventEmitter<number> = new EventEmitter<number>();

    private cRef: ComponentRef<NgxMyDatePicker> = null;

    private MIN_YEAR: number = 1000;
    private MAX_YEAR: number = 9999;
    private inputText: string = "";
    private preventClose: boolean = false;

    // Default options
    private opts: IMyOptions = {
        dayLabels: <IMyDayLabels> {su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat"},
        monthLabels: <IMyMonthLabels> {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        },
        dateFormat: <string> "yyyy-mm-dd",
        showTodayBtn: <boolean> true,
        todayBtnTxt: <string> "Today",
        firstDayOfWeek: <string> "mo",
        sunHighlight: <boolean> true,
        markCurrentDay: <boolean> true,
        editableMonthAndYear: <boolean> true,
        disableHeaderButtons: <boolean> true,
        showWeekNumbers: <boolean> false,
        disableUntil: <IMyDate> {year: 0, month: 0, day: 0},
        disableSince: <IMyDate> {year: 0, month: 0, day: 0},
        disableDates: <Array<IMyDate>> [],
        enableDates: <Array<IMyDate>> [],
        disableDateRanges: <Array<IMyDateRange>> [],
        disableWeekends: <boolean> false,
        alignSelectorRight: <boolean> false,
        openSelectorTopOfInput: <boolean> false,
        minYear: <number> this.MIN_YEAR,
        maxYear: <number> this.MAX_YEAR,
        showSelectorArrow: <boolean> true,
        ariaLabelPrevMonth: <string> "Previous Month",
        ariaLabelNextMonth: <string> "Next Month",
        ariaLabelPrevYear: <string> "Previous Year",
        ariaLabelNextYear: <string> "Next Year",
    };

    onChangeCb: (_: any) => void = () => {
    };
    onTouchedCb: () => void = () => {
    };

    constructor(private utilService: UtilService, private vcRef: ViewContainerRef, private cfr: ComponentFactoryResolver, private renderer: Renderer, private elem: ElementRef) {
    }

    @HostListener("keyup", ["$event"]) onKeyUp(evt: KeyboardEvent) {
        if (evt.keyCode === 27) {
            this.closeSelector(3);
        }
        else {
            let date: IMyDate = this.utilService.isDateValid(this.elem.nativeElement.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
            if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
                let dateModel: IMyDateModel = this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels);
                this.emitDateChanged(dateModel);
                this.updateModel(dateModel);
                this.emitInputFieldChanged(dateModel.formatted, true);
                this.closeSelector(2);
            }
            else {
                if (this.inputText !== this.elem.nativeElement.value) {
                    if (this.elem.nativeElement.value === "") {
                        this.clearDate();
                    }
                    else {
                        this.onChangeCb("");
                        this.emitInputFieldChanged(this.elem.nativeElement.value, false);
                    }
                }
            }
            this.inputText = this.elem.nativeElement.value;
        }
    }

    @HostListener("document:click", ["$event"]) onClick(evt: MouseEvent) {
        if (!this.preventClose && evt.target && this.cRef !== null && this.elem.nativeElement !== evt.target && !this.cRef.location.nativeElement.contains(evt.target)) {
            this.closeSelector(4);
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty("options")) {
            this.parseOptions(changes["options"].currentValue);
        }

        if (changes.hasOwnProperty("defaultMonth")) {
            this.defaultMonth = changes["defaultMonth"].currentValue;
        }
    }

    public parseOptions(opts: IMyOptions): void {
        if (opts !== undefined) {
            Object.keys(opts).forEach((k) => {
                (<IMyOptions>this.opts)[k] = opts[k];
            });
        }
        if (this.opts.minYear < this.MIN_YEAR) {
            this.opts.minYear = this.MIN_YEAR;
        }
        if (this.opts.maxYear > this.MAX_YEAR) {
            this.opts.maxYear = this.MAX_YEAR;
        }
    }

    public writeValue(value: Object): void {
        if (typeof value === 'string') {

            let val: any = this.parseISO8601(this.convertDateFormat(value));
            let date = {
                year: val.getFullYear(),
                month: val.getMonth() + 1,
                day: val.getDate()
            };
            let formatted: string = this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
            this.setInputValue(formatted);
            this.emitInputFieldChanged(formatted, true);
        }
        if (value && value instanceof Date) {
            let date = {
                year: value.getFullYear(),
                month: value.getMonth() + 1,
                day: value.getDate()
            };
            let formatted: string = this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
            this.setInputValue(formatted);
            this.emitInputFieldChanged(formatted, true);
        }
        else if (value && value["date"]) {
            let formatted: string = this.utilService.formatDate(value["date"], this.opts.dateFormat, this.opts.monthLabels);
            this.setInputValue(formatted);
            this.emitInputFieldChanged(formatted, true);
        }
        else if (!value || value === "") {
            this.setInputValue("");
            this.emitInputFieldChanged("", false);
        }
    }

    public registerOnChange(fn: any): void {
        this.onChangeCb = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedCb = fn;
    }

    public openCalendar() {
        this.preventClose = true;
        if (this.cRef === null) {
            let cf = this.cfr.resolveComponentFactory(NgxMyDatePicker);
            this.cRef = this.vcRef.createComponent(cf);
            this.cRef.instance.initialize(
                this.opts,
                this.defaultMonth,
                this.elem.nativeElement.value,
                this.elem.nativeElement.offsetWidth,
                this.elem.nativeElement.offsetHeight,
                (dm: IMyDateModel) => {
                    this.emitDateChanged(dm);
                    this.updateModel(dm);
                    this.closeSelector(2);
                }, (cvc: IMyCalendarViewChanged) => {
                    this.emitCalendarChanged(cvc);
                });
            this.emitCalendarToggle(1);
        }
        setTimeout(() => {
            this.preventClose = false;
        }, 20);
    }

    public closeCalendar() {
        this.closeSelector(3);
    }

    public toggleCalendar() {
        if (this.cRef === null) {
            this.openCalendar();
        }
        else {
            this.closeSelector(3);
        }
    }

    /**
     * Convert string to date, tested works on ie 11
     * @param date
     * @returns {Date}
     */
    public parseISO8601 (date:string){
        return new Date(date.substring(0, 10));
    };

    public getLocalISOString(date: any) {
        // Get local time as ISO string with offset at the end
        let tzo = -date.getTimezoneOffset();
        let dif = tzo >= 0 ? '+' : '-';
        let pad = function (n: any, width: any) {
            width = width || 2;
            n = Math.abs(Math.floor(n)) + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        };
        return date.getFullYear()
            + '-' + pad(date.getMonth() + 1, null)
            + '-' + pad(date.getDate(), null)
            + 'T' + pad(date.getHours(), null)
            + ':' + pad(date.getMinutes(), null)
            + ':' + pad(date.getSeconds(), null)
            + '.' + pad(date.getMilliseconds(), 3)
            + dif + pad(tzo / 60, null)
            + ':' + pad(tzo % 60, null);
    }

    /**
     * Converts 2013-08-03T02:00:00Z to 2013-08-03
     */
    private dt: any;
    private month: any;

    public convertDateFormat(val:string){
        let date = this.parseISO8601(val);

        let year = date.getFullYear();
        this.month = date.getMonth()+1;
        this.dt = date.getDate();

        if (this.dt < 10) {
            this.dt = '0' + this.dt;
        }
        if (this.month < 10) {
            this.month = '0' + this.month;
        }
        return(year+'-' +this.month + '-'+this.dt);
    }

    public clearDate() {
        this.emitDateChanged({date: {year: 0, month: 0, day: 0}, jsdate: null, formatted: "", epoc: 0});
        this.emitInputFieldChanged("", false);
        this.onChangeCb("");
        this.setInputValue("");
        this.closeSelector(3);
    }

    private closeSelector(reason: number) {
        if (this.cRef !== null) {
            this.vcRef.remove(this.vcRef.indexOf(this.cRef.hostView));
            this.cRef = null;
            this.emitCalendarToggle(reason);
        }
    }

    private updateModel(model: IMyDateModel) {
        this.onChangeCb(this.getLocalISOString(new Date(model.jsdate)));
        this.setInputValue(model.formatted);
    }

    private setInputValue(value: string) {
        this.inputText = value;
        this.renderer.setElementProperty(this.elem.nativeElement, "value", value);
    }

    private emitDateChanged(dateModel: IMyDateModel) {
        this.dateChanged.emit(dateModel);
    }

    private emitInputFieldChanged(value: string, valid: boolean) {
        this.inputFieldChanged.emit({value: value, dateFormat: this.opts.dateFormat, valid: valid});
    }

    private emitCalendarChanged(cvc: IMyCalendarViewChanged) {
        this.calendarViewChanged.emit(cvc);
    }

    private emitCalendarToggle(reason: number) {
        this.calendarToggle.emit(reason);
    }
}