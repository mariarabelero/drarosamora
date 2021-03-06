
/*
* Title                   : Booking System PRO (WordPress Plugin)
* Version                 : 1.7
* File                    : jquery.dop.BackendBookingSystemPRO.js
* File Version            : 1.6
* Created / Last Modified : 31 July 2013
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Booking System PRO Back End jQuery plugin.
*/

(function($){
    $.fn.DOPBookingSystemPRO = function(options){
        var Data = {'AddLastHourToTotalPrice': true,
                    'AddtMonthViewText': 'Add Month View',
                    'AvailableDays': [true, true, true, true, true, true, true],
                    'AvailableLabel': 'No. Available',
                    'AvailableOneText': 'available',
                    'AvailableText': 'available',
                    'BookedText': 'booked',
                    'Currency': '$',
                    'DateEndLabel': 'End Date',
                    'DateStartLabel': 'Start Date',
                    'DateType': 1,
                    'DayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    'DetailsFromHours': true,
                    'FirstDay': 1,
                    'HoursEnabled': false,
                    'GroupDaysLabel': 'Group Days',
                    'GroupHoursLabel': 'Group Hours',
                    'HourEndLabel': 'End Hour',
                    'HourStartLabel': 'Start Hour',
                    'HoursAMPM': false,
                    'HoursDefinitions': [{"value": "00:00"}],
                    'HoursDefinitionsChangeLabel': 'Change Hours Definitions (changing the definitions will overwrite any previous hours data)',
                    'HoursDefinitionsLabel': 'Hours Definitions (hh:mm add one per line)',
                    'HoursSetDefaultDataLabel': 'Set default hours values for this day(s). This will overwrite any existing data.)',
                    'HoursIntervalEnabled': false,
                    'ID': 0,
                    'InfoLabel': 'Information (users will see this message)',
                    'MaxYear': new Date().getFullYear(),
                    'MonthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    'NextMonthText': 'Next Month',
                    'NotesLabel': 'Notes (only you will see this message)',
                    'PreviousMonthText': 'Previous Month',
                    'PriceLabel': 'Price',
                    'PromoLabel': 'Promo Price',
                    'Reinitialize': false,
                    'RemoveMonthViewText': 'Remove Month View',
                    'ResetConfirmation': 'Are you sure you want to reset data? If you reset days, hours data from those days will be reset to.',
                    'StatusAvailableText': 'Available',
                    'StatusBookedText': 'Booked',
                    'StatusLabel': 'Status',
                    'StatusSpecialText': 'Special',
                    'StatusUnavailableText': 'Unavailable',
                    'UnavailableText': 'unavailable'},
        Container = this,

        Schedule = {},

        StartDate = new Date(),
        StartYear = StartDate.getFullYear(),
        StartMonth = StartDate.getMonth()+1,
        StartDay = StartDate.getDate(),
        CurrYear = StartYear,
        CurrMonth = StartMonth,

        AddLastHourToTotalPrice = true,
        AddtMonthViewText = 'Add Month View',
        AvailableDays = [true, true, true, true, true, true, true],
        AvailableLabel = 'No. Available',
        AvailableOneText = 'available',
        AvailableText = 'available',
        BookedText = 'booked',
        Currency = '$',
        DateEndLabel = 'End Date',
        DateStartLabel = 'Start Date',
        DateType = 1,
        DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        DetailsFromHours = true,
        FirstDay = 1,
        HoursEnabled = true,
        GroupDaysLabel = 'Group Days',
        GroupHoursLabel = 'Group Hours',
        HourEndLabel = 'End Hour',
        HourStartLabel = 'Start Hour',
        HoursAMPM = false,
        HoursDefinitions = [{"value": "00:00"}],
        HoursDefinitionsChangeLabel = 'Change Hours Definitions (changing the definitions will overwrite any previous hours data)',
        HoursDefinitionsLabel = 'Hours Definitions (hh:mm add one per line)',
        HoursSetDefaultDataLabel = 'Set default hours values for this day(s). This will overwrite any existing data.)',
        HoursIntervalEnabled = false,
        ID = 0,
        InfoLabel = 'Informations',
        MaxYear = new Date().getFullYear(),
        MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        NextMonthText = 'Next Month',
        NotesLabel = 'Notes',
        PreviousMonthText = 'Previous Month',
        PriceLabel = 'Price',
        PromoLabel = 'Promo',
        RemoveMonthViewText = 'Remove Month View',
        ResetConfirmation = 'Are you sure you want to reset all data? Al previous data, from days and hours, will be deleted.',
        StatusAvailableText = 'Available',
        StatusBookedText = 'Booked',
        StatusLabel = 'Status',
        StatusSpecialText = 'Special',
        StatusUnavailableText = 'Unavailable',
        UnavailableText = 'unavailable',
        
        showCalendar = true,
        firstYearLoaded = false,
        
        noMonths = 1,
        dayStartSelection,
        dayEndSelection,
        dayFirstSelected = false,
        dayTimeDisplay = false,
        dayStartSelectionCurrMonth,
        dayNo = 0,
        
        hourStartSelection,
        hourEndSelection,
        hourDaySelection,
        hourFirstSelected = false,
        
        yearStartSave,
        monthStartSave,
        yearEndSave,
        monthEndSave,

        methods = {            
                    init:function( ){// Init Plugin.
                        return this.each(function(){
                            if (options){
                                $.extend(Data, options);
                            }
                            
                            if (!$(Container).hasClass('dopbsp-initialized') || Data['Reinitialize']){
                                $(Container).addClass('dopbsp-initialized');
                                methods.parseData();
                            }
                        });
                    },
                    parseData:function(){
                        AddLastHourToTotalPrice = Data['AddLastHourToTotalPrice'] == 'true' ? true:false;
                        AddtMonthViewText = Data['AddtMonthViewText'];
                        AvailableDays[0] = Data['AvailableDays'][0] == "true" ? true:false;
                        AvailableDays[1] = Data['AvailableDays'][1] == "true" ? true:false;
                        AvailableDays[2] = Data['AvailableDays'][2] == "true" ? true:false;
                        AvailableDays[3] = Data['AvailableDays'][3] == "true" ? true:false;
                        AvailableDays[4] = Data['AvailableDays'][4] == "true" ? true:false;
                        AvailableDays[5] = Data['AvailableDays'][5] == "true" ? true:false;
                        AvailableDays[6] = Data['AvailableDays'][6] == "true" ? true:false;                        
                        AvailableLabel = Data['AvailableLabel'];
                        AvailableOneText = Data['AvailableOneText'];
                        AvailableText = Data['AvailableText'];
                        BookedText = Data['BookedText'];
                        Currency = Data['Currency'];
                        DateEndLabel = Data['DateEndLabel'];
                        DateStartLabel = Data['DateStartLabel'];
                        DateType = Data['DateType'];
                        DayNames = Data['DayNames'];
                        DetailsFromHours = Data['DetailsFromHours'] == 'true' ? true:false;
                        FirstDay = Data['FirstDay'];
                        HoursEnabled = Data['HoursEnabled'] == 'true' ? true:false;
                        GroupDaysLabel = Data['GroupDaysLabel'];
                        GroupHoursLabel = Data['GroupHoursLabel'];
                        HourEndLabel = Data['HourEndLabel'];
                        HourStartLabel = Data['HourStartLabel'];
                        HoursAMPM = Data['HoursAMPM'] == 'true' ? true:false;
                        HoursDefinitions = Data['HoursDefinitions'];
                        HoursDefinitionsChangeLabel = Data['HoursDefinitionsChangeLabel'];
                        HoursDefinitionsLabel = Data['HoursDefinitionsLabel'];
                        HoursSetDefaultDataLabel = Data['HoursSetDefaultDataLabel'];
                        HoursIntervalEnabled = Data['HoursIntervalEnabled'] == 'true' ? true:false;
                        ID = Data['ID'];
                        InfoLabel = Data['InfoLabel'];
                        MaxYear = Data['MaxYear'];
                        MonthNames = Data['MonthNames'];
                        NextMonthText = Data['NextMonthText'];
                        NotesLabel = Data['NotesLabel'];
                        PreviousMonthText = Data['PreviousMonthText'];
                        PriceLabel = Data['PriceLabel'];
                        PromoLabel = Data['PromoLabel'];
                        RemoveMonthViewText = Data['RemoveMonthViewText'];
                        ResetConfirmation = Data['ResetConfirmation'];
                        StatusAvailableText = Data['StatusAvailableText'];
                        StatusBookedText = Data['StatusBookedText'];
                        StatusLabel = Data['StatusLabel'];
                        StatusSpecialText = Data['StatusSpecialText'];
                        StatusUnavailableText = Data['StatusUnavailableText'];
                        UnavailableText = Data['UnavailableText'];
                        
                        methods.parseCalendarData(new Date().getFullYear());
                    },
                    parseCalendarData:function(year){
                        $.post(ajaxurl, {action:'dopbsp_load_schedule', calendar_id:ID, year:year}, function(data){
                            if ($.trim(data) != ''){
                                $.extend(Schedule, JSON.parse($.trim(data)));
                            }
                            
                            if (showCalendar && (StartMonth < 12-noMonths+1 || firstYearLoaded)){
                                showCalendar = false;
                                dopbspToggleMessage('hide', DOPBSP_CALENDAR_LOADED);
                                methods.initCalendar();
                            }
                            
                            if (!firstYearLoaded){
                                firstYearLoaded = true;
                            }
                                                       
                            if (year >= MaxYear){
                                //dopbspToggleMessage('hide', DOPBSP_CALENDAR_LOADED);
                            }
                            else{
                                methods.parseCalendarData(year+1);
                            }
                        });
                    },
                    doMetaboxHideBuster:function(){
                        var isHidden = false;
                        
                        if ($('#dopsbsp-custom-post-meta').hasClass('closed')){
                            $('#dopsbsp-custom-post-meta').removeClass('closed');
                            isHidden = true;
                        }
                        
                        return isHidden;
                    },
                    undoMetaboxHideBuster:function(wasHidden){
                        if (wasHidden){
                            $('#dopsbsp-custom-post-meta').addClass('closed');
                        }
                    },

                    initCalendar:function(){// Init  Calendar
                        var HTML = new Array(), no;
                        
                        HTML.push('<div class="DOPBookingSystemPRO_Container">');                        
                        HTML.push('    <div class="DOPBookingSystemPRO_Navigation">');
                        HTML.push('        <div class="add_btn" title="'+AddtMonthViewText+'"></div>');                        
                        HTML.push('        <div class="remove_btn" title="'+RemoveMonthViewText+'"></div>');
                        HTML.push('        <div class="previous_btn" title="'+PreviousMonthText+'"></div>');
                        HTML.push('        <div class="next_btn" title="'+NextMonthText+'"></div>');
                        HTML.push('        <div class="month_year"></div>');
                        HTML.push('        <div class="week">');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div><br style="clear:both;" />');
                        HTML.push('        </div>');
                        HTML.push('    </div>');
                        HTML.push('    <div class="DOPBookingSystemPRO_Calendar"></div>');
                        HTML.push('</div>');

                        Container.html(HTML.join(''));
                        $('body').append('<div class="DOPBookingSystemPRO_Info" id="DOPBookingSystemPRO_Info'+ID+'"></div>');
                        
                        no = FirstDay-1;
                        
                        $('.DOPBookingSystemPRO_Navigation .week .day', Container).each(function(){
                            no++;
                            
                            if (no == 7){
                                no = 0;
                            }
                            $(this).html(DayNames[no]);
                        });
                        
                        methods.initSettings();
                    },
                    initSettings:function(){// Init  Settings
                        methods.initContainer();
                        methods.initNavigation();
                        methods.initInfo();
                        methods.generateCalendar(StartYear, StartMonth);
                    },
                    initContainer:function(){// Init  Container
                        var wasHidden = methods.doMetaboxHideBuster();
                        
                        $('.DOPBookingSystemPRO_Container', Container).width(Container.width());
                        methods.undoMetaboxHideBuster(wasHidden);
                    },
                    initNavigation:function(){// Init Navigation
                        var wasHidden = methods.doMetaboxHideBuster();
                        
                        $('.DOPBookingSystemPRO_Navigation .week .day', Container).width(parseInt(($('.DOPBookingSystemPRO_Navigation .week', Container).width()-parseInt($('.DOPBookingSystemPRO_Navigation .week', Container).css('padding-left'))+parseInt($('.DOPBookingSystemPRO_Navigation .week', Container).css('padding-right')))/7));
                        methods.undoMetaboxHideBuster(wasHidden);
                        
                        if (!prototypes.isTouchDevice()){
                            $('.DOPBookingSystemPRO_Navigation .previous_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });

                            $('.DOPBookingSystemPRO_Navigation .next_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });

                            $('.DOPBookingSystemPRO_Navigation .add_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });

                            $('.DOPBookingSystemPRO_Navigation .remove_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });
                        }
                        
                        $('.DOPBookingSystemPRO_Navigation .previous_btn', Container).click(function(){
                            methods.generateCalendar(StartYear, CurrMonth-1);

                            if (CurrMonth == StartMonth){
                                $('.DOPBookingSystemPRO_Navigation .previous_btn', Container).css('display', 'none');
                            }
                        });
                        
                        $('.DOPBookingSystemPRO_Navigation .next_btn', Container).click(function(){
                            methods.generateCalendar(StartYear, CurrMonth+1);
                            $('.DOPBookingSystemPRO_Navigation .previous_btn', Container).css('display', 'block');
                        });
                        
                        $('.DOPBookingSystemPRO_Navigation .add_btn', Container).click(function(){
                            methods.hideForm();
                            noMonths++;
                            methods.generateCalendar(StartYear, CurrMonth);
                            $('.DOPBookingSystemPRO_Navigation .remove_btn', Container).css('display', 'block');
                        });
                        
                        
                        $('.DOPBookingSystemPRO_Navigation .remove_btn', Container).click(function(){
                            methods.hideForm();
                            noMonths--;
                            methods.generateCalendar(StartYear, CurrMonth);
                            
                            if(noMonths == 1){
                                $('.DOPBookingSystemPRO_Navigation .remove_btn', Container).css('display', 'none');
                            }
                        });
                        
                        $('#DOPBSP-reservations').unbind('click');
                        $('#DOPBSP-reservations').bind('click', function(){
                            methods.showReservations();
                        });
                    },
                    
                    generateCalendar:function(year, month){// Init Calendar   
                        CurrYear = new Date(year, month, 0).getFullYear();
                        CurrMonth = parseInt(month, 10);    
                                                
                        $('.DOPBookingSystemPRO_Navigation .month_year', Container).html(MonthNames[(CurrMonth%12 != 0 ? CurrMonth%12:12)-1]+' '+CurrYear);                        
                        $('.DOPBookingSystemPRO_Calendar', Container).html('');                        
                        
                        for (var i=1; i<=noMonths; i++){
                            methods.initMonth(CurrYear, month = month%12 != 0 ? month%12:12, i);
                            month++;
                            
                            if (month % 12 == 1){
                                CurrYear++;
                                month = 1;
                            }                            
                        }
                    },
                    initMonth:function(year, month, position){// Init Month
                        var i, d, cyear, cmonth, cday, start, totalDays = 0,
                        noDays = new Date(year, month, 0).getDate(),
                        noDaysPreviousMonth = new Date(year, month-1, 0).getDate(),
                        firstDay = new Date(year, month-1, 2-FirstDay).getDay(),
                        lastDay = new Date(year, month-1, noDays-FirstDay+1).getDay(),
                        monthHTML = new Array(), 
                        day = methods.defaultDay();
                                 
                        dayNo = 0;
                        
                        monthHTML.push('<div class="DOPBookingSystemPRO_Month">');
                        
                        if (position > 1){
                            monthHTML.push('<div class="month_year">'+MonthNames[(month%12 != 0 ? month%12:12)-1]+' '+year+'</div>');
                        }
                                                
                        if (firstDay == 0){
                            start = 7;
                        }
                        else{
                            start = firstDay;
                        }
                        
                        for (i=start-1; i>=1; i--){
                            totalDays++;
                            
                            d = new Date(year, month-2, noDaysPreviousMonth-i+1);
                            cyear = d.getFullYear();
                            cmonth = prototypes.timeLongItem(d.getMonth()+1);
                            cday = prototypes.timeLongItem(d.getDate());
                            day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                            
                            if (StartYear == year && StartMonth == month){
                                monthHTML.push(methods.initDay('past_day', 
                                                               ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               '', '', '', '', '', '', 'none'));            
                            }
                            else{
                                monthHTML.push(methods.initDay('last_month'+(position>1 ?  ' mask':''), 
                                                               position>1 ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_last':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status']));
                            }
                        }
                        
                        for (i=1; i<=noDays; i++){
                            totalDays++;
                            
                            d = new Date(year, month-1, i);
                            cyear = d.getFullYear();
                            cmonth = prototypes.timeLongItem(d.getMonth()+1);
                            cday = prototypes.timeLongItem(d.getDate());
                            day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                            
                            if (StartYear == year && StartMonth == month && StartDay > d.getDate()){
                                monthHTML.push(methods.initDay('past_day', 
                                                               ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               '', '', '', '', '', '', 'none'));    
                            }
                            else{
                                monthHTML.push(methods.initDay('curr_month', 
                                                               ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status']));
                            }
                        }

                        if (totalDays+7 < 42){
                            for (i=1; i<=14-lastDay; i++){
                                d = new Date(year, month, i);
                                cyear = d.getFullYear();
                                cmonth = prototypes.timeLongItem(d.getMonth()+1);
                                cday = prototypes.timeLongItem(d.getDate());
                                day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                            
                                monthHTML.push(methods.initDay('next_month'+(position<noMonths ?  ' hide':''), 
                                                               position<noMonths ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_next':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status']));
                            }
                        }
                        else{
                            for (i=1; i<=7-lastDay; i++){
                                d = new Date(year, month, i);
                                cyear = d.getFullYear();
                                cmonth = prototypes.timeLongItem(d.getMonth()+1);
                                cday = prototypes.timeLongItem(d.getDate());
                                day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                                
                                monthHTML.push(methods.initDay('next_month'+(position<noMonths ?  ' hide':''), 
                                                               position<noMonths ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_next':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status']));
                            }
                        }

                        monthHTML.push('    <br class="DOPBookingSystemPRO_Clear" />');
                        monthHTML.push('</div>');
                        
                        monthHTML.push('<div class="DOPBookingSystemPRO_Hours" id="'+ID+'_'+year+'-'+prototypes.timeLongItem(month)+'_hours"></div>');
                        
                        $('.DOPBookingSystemPRO_Calendar', Container).append(monthHTML.join(''));
                        
                        methods.customizeDays();                        
                        methods.initDayEvents();
                    },
                    
                    initDay:function(type, id, day, available, bind, info, notes, price, promo, status){// Init Day
                        var dayHTML = Array(),
                        contentLine1 = '&nbsp;', 
                        contentLine2 = '&nbsp;';
                        
                        dayNo++;
                        
                        if (price > 0 && (bind == 0 || bind == 1)){
                            contentLine1 = Currency+price;
                        }
                                                
                        if (promo > 0 && (bind == 0 || bind == 1)){
                            contentLine1 = Currency+promo;
                        }

                        if (type != 'past_day'){
                            switch (status){
                                case 'available':
                                    type += ' available';
                                    
                                    if (bind == 0 || bind == 1){
                                        if (available > 1){
                                            contentLine2 = available+' '+AvailableText;
                                        }
                                        else if (available == 1){
                                            contentLine2 = available+' '+AvailableOneText;
                                        }
                                        else{
                                            contentLine2 = AvailableOneText;
                                        }
                                    }
                                    break;
                                case 'booked':
                                    type += ' booked';
                                    
                                    if (bind == 0 || bind == 1){
                                        contentLine2 = BookedText;
                                    }
                                    break;
                                case 'special':
                                    type += ' special';

                                    if (bind == 0 || bind == 1){
                                        if (available > 1){
                                            contentLine2 = available+' '+AvailableText;
                                        }
                                        else if (available == 1){
                                            contentLine2 = available+' '+AvailableOneText;
                                        }
                                    }
                                    break;
                                case 'unavailable':
                                    type += ' unavailable';
                                    
                                    if (bind == 0 || bind == 1){
                                        contentLine2 = UnavailableText;  
                                    }
                                    break;
                            }
                        }
                        
                        if (dayNo % 7 == 1){
                            type += ' first-column';
                        }
                        
                        if (dayNo % 7 == 0){
                            type += ' last-column';
                        }
                                                
                        dayHTML.push('<div class="DOPBookingSystemPRO_Day '+type+'" id="'+id+'">');
                        dayHTML.push('    <div class="bind-left'+(bind == 2 || bind == 3 ? '  enabled':'')+'">');
                        dayHTML.push('        <div class="header">&nbsp;</div>');
                        dayHTML.push('        <div class="content">&nbsp;</div>');
                        dayHTML.push('    </div>');                        
                        dayHTML.push('    <div class="bind-content group'+bind+'">');
                        dayHTML.push('        <div class="header">');
                        dayHTML.push('            <div class="day">'+day+'</div>');
                        
                        if (HoursEnabled && type != 'past_day' && status != 'unavailable' && (bind == 0 || bind == 3)){
                            dayHTML.push('            <div class="hours" id="'+id+'_hours"></div>');
                        }
                        
                        if (notes != '' && type != 'past_day' && (bind == 0 || bind == 3)){
                            dayHTML.push('            <div class="notes" id="'+id+'_notes"></div>');
                        }   
                        
                        if (info != '' && type != 'past_day' && (bind == 0 || bind == 3)){
                            dayHTML.push('            <div class="info" id="'+id+'_info"></div>');
                        }                     
                        dayHTML.push('            <br class="DOPBookingSystemPRO_Clear" />');
                        dayHTML.push('        </div>');
                        dayHTML.push('        <div class="content">');
                        dayHTML.push('            <div class="price">'+contentLine1+'</div>');
                        
                        if (promo > 0 && (bind == 0 || bind == 1)){
                            dayHTML.push('            <div class="old-price">'+Currency+price+'</div>');
                        }
                        dayHTML.push('            <br class="DOPBookingSystemPRO_Clear" />');
                        dayHTML.push('            <div class="available">'+contentLine2+'</div>');
                        dayHTML.push('        </div>');  
                        dayHTML.push('    </div>');
                        dayHTML.push('    <div class="bind-right'+(bind == 1 || bind == 2 ? '  enabled':'')+'">');
                        dayHTML.push('        <div class="header">&nbsp;</div>');
                        dayHTML.push('        <div class="content">&nbsp;</div>');
                        dayHTML.push('    </div>');
                        dayHTML.push('</div>');
                        
                        return dayHTML.join('');
                    },                    
                    defaultDay:function(day){
                        return {"available": "",
                                "bind": "0",
                                "info": "",
                                "hours_definitions": HoursDefinitions,
                                "hours": {},
                                "notes": "",
                                "price": "", 
                                "promo": "",
                                "status": AvailableDays[day] ? "none":"unavailable"}
                    },
                    customizeDays:function(){
                        var maxHeight = 0,
                        wasHidden = methods.doMetaboxHideBuster();
                        
                        
                        $('.DOPBookingSystemPRO_Day', Container).width(parseInt(($('.DOPBookingSystemPRO_Month', Container).width()-parseInt($('.DOPBookingSystemPRO_Month', Container).css('padding-left'))+parseInt($('.DOPBookingSystemPRO_Month', Container).css('padding-right')))/7));
                        $('.DOPBookingSystemPRO_Day .bind-content', Container).width($('.DOPBookingSystemPRO_Day', Container).width()-2);
                        
                        $('.DOPBookingSystemPRO_Day .bind-content .content', Container).each(function(){
                            if (maxHeight < $(this).height()){
                                maxHeight = $(this).height();
                            }
                        });
                        
                        $('.DOPBookingSystemPRO_Day .content', Container).height(maxHeight);
                        methods.undoMetaboxHideBuster(wasHidden);
                    },                    
                    initDayEvents:function(){// Init Events for the days of the Calendar.
                        $('.DOPBookingSystemPRO_Day .hours', Container).unbind('click');
                        $('.DOPBookingSystemPRO_Day .hours', Container).bind('click', function(){
                            dayTimeDisplay = true;
                            methods.initHours(ID+'_'+$(this).attr('id').split('_')[1]);
                        });
                        
                        $('.DOPBookingSystemPRO_Day', Container).unbind('click');
                        $('.DOPBookingSystemPRO_Day', Container).bind('click', function(){
                            var day = $(this);
                                
                            setTimeout(function(){
                                if (!dayTimeDisplay){
                                    if (!day.hasClass('mask')){
                                        if (!day.hasClass('past_day')){
                                            if (!dayFirstSelected){
                                                dayFirstSelected = true;
                                                dayStartSelection = day.attr('id');
                                                dayStartSelectionCurrMonth = CurrMonth;
                                                methods.hideForm();
                                                
                                                if (HoursEnabled){
                                                    methods.hideHours();                                                    
                                                }
                                            }
                                            else{
                                                dayFirstSelected = false;
                                                dayEndSelection = day.attr('id');
                                                methods.showForm('days');
                                            }
                                            methods.showDaySelection(day.attr('id'));
                                        }
                                    }
                                }
                                else{
                                    dayTimeDisplay = false;
                                }
                            }, 10);
                        });
                        
                        $('.DOPBookingSystemPRO_Day', Container).hover(function(){
                            var day = $(this);
                            
                            if (dayFirstSelected){
                                methods.showDaySelection(day.attr('id'));
                            }
                                    
                            if (HoursEnabled && !day.hasClass('selected')){
                                methods.showInfo($(this).attr('id').split('_')[1], '', 'hours', methods.initHoursInfo(day.attr('id')));
                            }
                        }, function(){
                            methods.hideInfo();
                        });
                        
                        $('.DOPBookingSystemPRO_Day .notes', Container).hover(function(){
                            methods.showInfo($(this).attr('id').split('_')[1], '', 'notes');
                        }, function(){
                            methods.hideInfo();
                        });
                        
                        $('.DOPBookingSystemPRO_Day .info', Container).hover(function(){
                            methods.showInfo($(this).attr('id').split('_')[1], '', 'info');
                        }, function(){
                            methods.hideInfo();
                        });
                    },
                    showDaySelection:function(id){
                        var day, maxHeight = 0;
                        
                        $('.DOPBookingSystemPRO_Day', Container).removeClass('selected');
                        methods.customizeDays();
                        
                        if (id < dayStartSelection){
                            $('.DOPBookingSystemPRO_Day', Container).each(function(){
                               day = $(this);
                               
                               if (day.attr('id') >= id && day.attr('id') <= dayStartSelection && !day.hasClass('past_day') && !day.hasClass('hide') && !day.hasClass('mask')){
                                   day.addClass('selected');
                               }
                            });
                        }
                        else{
                            $('.DOPBookingSystemPRO_Day', Container).each(function(){
                               day = $(this);   
                               
                               if (day.attr('id') >= dayStartSelection && day.attr('id') <= id && !day.hasClass('past_day') && !day.hasClass('hide') && !day.hasClass('mask')){
                                   day.addClass('selected');
                               }
                            });
                        }
                        
                        $('.DOPBookingSystemPRO_Day.selected .header', Container).removeAttr('style');
                        $('.DOPBookingSystemPRO_Day.selected .content', Container).removeAttr('style');
                        
                        $('.DOPBookingSystemPRO_Day .content', Container).each(function(){
                            if (maxHeight < $(this).height()){
                                maxHeight = $(this).height();
                            }
                        });
                        
                        $('.DOPBookingSystemPRO_Day .content', Container).height(maxHeight);
                    },
                    
                    initHours:function(id){
                        var HTML = new Array(), i,
                        hoursDef = HoursDefinitions,
                        hoursContainer,
                        date = id.split('_')[1],
                        year = date.split('-')[0],
                        month = date.split('-')[1],
                        day = date.split('-')[2],
                        hour,
                        currTime = new Date(),
                        currHour = currTime.getHours(),
                        currMin = currTime.getMinutes();
                        
                        dayStartSelection = ID+'_'+date;
                        dayEndSelection = ID+'_'+date;
                        
                        hourDaySelection = id;
                        
                        methods.hideForm();
                        $('.DOPBookingSystemPRO_Day', Container).removeClass('selected');
                        methods.customizeDays();
                        $('#'+ID+'_'+date).addClass('selected');
                        $('.DOPBookingSystemPRO_Day.selected .header', Container).removeAttr('style');
                        $('.DOPBookingSystemPRO_Day.selected .content', Container).removeAttr('style');

                        if (Schedule[date] != undefined){
                            hoursDef = Schedule[date]['hours_definitions'];
                        }
                        
                        for (i=0; i<hoursDef.length-(HoursIntervalEnabled || !AddLastHourToTotalPrice  ? 1:0); i++){
                            if (Schedule[date] != undefined && Schedule[date]['hours'][hoursDef[i]['value']] != undefined){
                                hour = Schedule[date]['hours'][hoursDef[i]['value']];
                            }
                            else{
                                hour = methods.defaultHour();
                            }
                            
                            if (hoursDef[i]['value'] < prototypes.timeLongItem(currHour)+':'+prototypes.timeLongItem(currMin) && StartYear+'-'+prototypes.timeLongItem(StartMonth)+'-'+prototypes.timeLongItem(StartDay) == year+'-'+month+'-'+day){                                
                                HTML.push(methods.initHour(ID+'_'+hoursDef[i]['value'],
                                                           hoursDef[i]['value'],
                                                           hour['available'], hour['bind'], hour['info'], hour['notes'], hour['price'], hour['promo'], 'past_hour', hoursDef));
                            }
                            else{
                                HTML.push(methods.initHour(ID+'_'+hoursDef[i]['value'],
                                                           hoursDef[i]['value'],
                                                           hour['available'], hour['bind'], hour['info'], hour['notes'], hour['price'], hour['promo'], hour['status'], hoursDef));
                            }
                        }
                        
                        if ($('#'+id).hasClass('next_month')){
                            $('.DOPBookingSystemPRO_Hours', Container).each(function(){
                                hoursContainer = $(this);
                            });
                            hoursContainer.html(HTML.join(''));
                        }
                        else if ($('#'+id).hasClass('last_month')){
                            $($('.DOPBookingSystemPRO_Hours', Container).get().reverse()).each(function(){
                                hoursContainer = $(this);
                            });
                            hoursContainer.html(HTML.join(''));
                        }
                        else{
                            $('#'+ID+'_'+year+'-'+month+'_hours').html(HTML.join(''));
                        }
                        
                        methods.initHourEvents();
                    },
                    initHoursInfo:function(id){
                        var HTML = new Array(), i,
                        hoursDef = HoursDefinitions,
                        date = id.split('_')[1],
                        year = date.split('-')[0],
                        month = date.split('-')[1],
                        day = date.split('-')[2],
                        hour,
                        currTime = new Date(),
                        currHour = currTime.getHours(),
                        currMin = currTime.getMinutes();
                        
                        if (Schedule[date] != undefined){
                            hoursDef = Schedule[date]['hours_definitions'];
                        }   
                        
                        for (i=0; i<hoursDef.length-(HoursIntervalEnabled || !AddLastHourToTotalPrice  ? 1:0); i++){
                            if (Schedule[date] != undefined && Schedule[date]['hours'][hoursDef[i]['value']] != undefined){
                                hour = Schedule[date]['hours'][hoursDef[i]['value']];
                            }
                            else{
                                hour = methods.defaultHour();
                            }
                            
                            if (hoursDef[i]['value'] < prototypes.timeLongItem(currHour)+':'+prototypes.timeLongItem(currMin) && StartYear+'-'+prototypes.timeLongItem(StartMonth)+'-'+prototypes.timeLongItem(StartDay) == year+'-'+month+'-'+day){                                
                                HTML.push(methods.initHour(ID+'_'+hoursDef[i]['value'].split(':')[0]+'-'+hoursDef[i]['value'].split(':')[1],
                                                           hoursDef[i]['value'],
                                                           hour['available'], hour['bind'], '', '', hour['price'], hour['promo'], 'past_hour', hoursDef));
                            }
                            else{
                                HTML.push(methods.initHour(ID+'_'+hoursDef[i]['value'].split(':')[0]+'-'+hoursDef[i]['value'].split(':')[1],
                                                           hoursDef[i]['value'],
                                                           hour['available'], hour['bind'], '', '', hour['price'], hour['promo'], hour['status'], hoursDef));
                            }
                        }   
                        
                        return HTML.join('');
                    },
                    initHour:function(id, hour, available, bind, info, notes, price, promo, status, hoursDef){
                        var hourHTML = new Array(),
                        priceContent = '&nbsp;',
                        availableContent = '&nbsp;',
                        type = '';
                        
                        if (status != 'past_hour'){
                            if (price > 0 && (bind == 0 || bind == 1)){
                                priceContent = Currency+price;
                            }

                            if (promo > 0 && (bind == 0 || bind == 1)){
                                priceContent = Currency+promo;
                            }

                            switch (status){
                                case 'available':
                                    type += ' available';
                                    
                                    if (bind == 0 || bind == 1){
                                        if (available > 1){
                                            availableContent = available+' '+AvailableText;
                                        }
                                        else if (available == 1){
                                            availableContent = available+' '+AvailableOneText;
                                        }
                                        else{
                                            availableContent = AvailableOneText;
                                        }
                                    }
                                    break;
                                case 'booked':
                                    type += ' booked';
                                    
                                    if (bind == 0 || bind == 1){
                                        availableContent = BookedText;
                                    }
                                    break;
                                case 'special':
                                    type += ' special';

                                    if (bind == 0 || bind == 1){
                                        if (available > 1){
                                            availableContent = available+' '+AvailableText;
                                        }
                                        else if (available == 1){
                                            availableContent = available+' '+AvailableOneText;
                                        }
                                    }
                                    break;
                                case 'unavailable':
                                    type += ' unavailable';
                                    
                                    if (bind == 0 || bind == 1){
                                        availableContent = UnavailableText;  
                                    }
                                    break;
                            }
                        }
                        else{
                            type = ' '+status;
                        }
            
                        hourHTML.push('<div class="DOPBookingSystemPRO_Hour'+type+'" id="'+id+'">');
                        hourHTML.push('    <div class="bind-top'+(bind == 2 || bind == 3 ? '  enabled':'')+'"><div class="hour">&nbsp;</div><br class="DOPBookingSystemPRO_Clear" /></div>');                        
                        hourHTML.push('    <div class="bind-content group'+bind+'">');
                        hourHTML.push('        <div class="hour">'+(HoursAMPM ? prototypes.timeToAMPM(hour):hour)+(HoursIntervalEnabled ? ' - '+(HoursAMPM ? prototypes.timeToAMPM(methods.nextHour(hour, hoursDef)):methods.nextHour(hour, hoursDef)):'')+'</div>');
                        
                        if (price > 0 && type != 'past_hour' && (bind == 0 || bind == 1)){
                            hourHTML.push('        <div class="'+(promo > 0 ? 'price-promo':'price')+'">'+priceContent+'</div>');      
                        }
                        
                        if (promo > 0 && type != 'past_hour' && (bind == 0 || bind == 1)){                                      
                            hourHTML.push('        <div class="old-price">'+Currency+price+'</div>');
                        }                        
                        hourHTML.push('        <div class="available">'+availableContent+'</div>');
                        
                        if (notes != '' && type != 'past_hour' && (bind == 0 || bind == 1)){
                            hourHTML.push('        <div class="notes" id="'+id+'_notes"></div>');
                        }
                                                
                        if (info != '' && type != 'past_hour' && (bind == 0 || bind == 1)){
                            hourHTML.push('        <div class="info" id="'+id+'_info"></div>');
                        }
                        hourHTML.push('        <br class="DOPBookingSystemPRO_Clear" />');
                        hourHTML.push('    </div>');
                        hourHTML.push('    <div class="bind-bottom'+(bind == 1 || bind == 2 ? '  enabled':'')+'"><div class="hour">&nbsp;</div><br class="DOPBookingSystemPRO_Clear" /></div>');
                        hourHTML.push('</div>');
                        
                        return hourHTML.join('');
                    },                    
                    defaultHour:function(){
                        return {"available": "",
                                "bind": "0",
                                "info": "",
                                "notes": "",
                                "price": "", 
                                "promo": "",
                                "status": "none"}
                    },
                    initHourEvents:function(){// Init Events for the days of the Calendar.                        
                        $('.DOPBookingSystemPRO_Hour', Container).unbind('click');
                        $('.DOPBookingSystemPRO_Hour', Container).bind('click', function(){
                            var hour = $(this);
                                
                            setTimeout(function(){
                                if (!hour.hasClass('past_hour')){
                                    if (!hourFirstSelected){
                                        hourFirstSelected = true;
                                        hourStartSelection = hour.attr('id');
                                        methods.hideForm();
                                    }
                                    else{
                                        hourFirstSelected = false;
                                        hourEndSelection = hour.attr('id');
                                        methods.showForm('hours');
                                    }
                                    methods.showHourSelection(hour.attr('id'));
                                }
                            }, 10);
                        });
                        
                        $('.DOPBookingSystemPRO_Hour', Container).hover(function(){
                            var hour = $(this);
                            
                            if (hourFirstSelected){
                                methods.showHourSelection(hour.attr('id'));
                            }
                        });
                        
                        $('.DOPBookingSystemPRO_Hour .notes', Container).hover(function(){
                            methods.showInfo(hourDaySelection.split('_')[1], $(this).attr('id').split('_')[1], 'notes');
                        }, function(){
                            methods.hideInfo();
                        });
                        
                        $('.DOPBookingSystemPRO_Hour .info', Container).hover(function(){
                            methods.showInfo(hourDaySelection.split('_')[1], $(this).attr('id').split('_')[1], 'info');
                        }, function(){
                            methods.hideInfo();
                        });
                    },
                    showHourSelection:function(id){
                        var hour;
                        
                        $('.DOPBookingSystemPRO_Hour', Container).removeClass('selected');
                        
                        if (id < hourStartSelection){
                            $('.DOPBookingSystemPRO_Hour', Container).each(function(){
                               hour = $(this);
                               
                               if (hour.attr('id') >= id && hour.attr('id') <= hourStartSelection && !hour.hasClass('past_hour')){
                                   hour.addClass('selected');
                               }
                            });
                        }
                        else{
                            $('.DOPBookingSystemPRO_Hour', Container).each(function(){
                               hour = $(this);   
                               
                               if (hour.attr('id') >= hourStartSelection && hour.attr('id') <= id && !hour.hasClass('past_hour')){
                                   hour.addClass('selected');
                               }
                            });
                        }       
                        
                        $('.DOPBookingSystemPRO_Hour.selected .bind-content', Container).removeAttr('style');  
                        $('.DOPBookingSystemPRO_Hour.selected .bind-content .hour', Container).removeAttr('style');         
                    },
                    hideHours:function(){
                        $('.DOPBookingSystemPRO_Hours', Container).html('');
                    },
                    
                    initInfo:function(){
                        var xPos = 0, yPos = 0;
                        
                        $(document).mousemove(function(e){
                            xPos = e.pageX+30;
                            yPos = e.pageY;
                            
                            if ($(document).scrollTop()+$(window).height() < yPos+$('#DOPBookingSystemPRO_Info'+ID).height()+parseInt($('#DOPBookingSystemPRO_Info'+ID).css('padding-top'))+parseInt($('#DOPBookingSystemPRO_Info'+ID).css('padding-bottom'))+10){
                               yPos = $(document).scrollTop()+$(window).height()-$('#DOPBookingSystemPRO_Info'+ID).height()-parseInt($('#DOPBookingSystemPRO_Info'+ID).css('padding-top'))-parseInt($('#DOPBookingSystemPRO_Info'+ID).css('padding-bottom'))-10;
                            }
                            
                            $('#DOPBookingSystemPRO_Info'+ID).css({'left': xPos, 'top': yPos});
                        }); 
                    },
                    
                    showInfo:function(date, hour, type, infoData){
                        var info = infoData != undefined ? infoData:(hour == '' ? Schedule[date][type]:Schedule[date]['hours'][hour][type]);
                        
                        $('#DOPBookingSystemPRO_Info'+ID).html(info);
                        $('#DOPBookingSystemPRO_Info'+ID).css('display', 'block');                         
                    },
                    hideInfo:function(){
                        $('#DOPBookingSystemPRO_Info'+ID).css('display', 'none');                        
                    },
                    
                    showForm:function(type){// Show Form
                        var headerHTML = new Array(),
                        HTML = new Array(),
                        hours = '', i,
                        hoursDef = HoursDefinitions,
                        startDate, sYear, sMonth, sMonthText, sDay,
                        endDate, eYear, eMonth, eMonthText, eDay,
                        startHour, sHour, sMinute,
                        endHour, eHour, eMinute;
                        
                        if (type == "days" && HoursEnabled){
                            for (i=0; i<HoursDefinitions.length; i++){
                                if (i == HoursDefinitions.length-1){
                                    hours += HoursDefinitions[i]['value'];
                                }
                                else{
                                    hours += HoursDefinitions[i]['value']+'\n';
                                }
                            }
                            hoursDef = HoursDefinitions;
                        }
                        
                        // ***************************************************** Start Form Buttons   
                        headerHTML.push('<input type="button" name="DOPBSP_submit" id="DOPBSP_submit" class="submit-style" title="Submit" value="Submit" />');
                        headerHTML.push('<input type="button" name="DOPBSP_reset" id="DOPBSP_reset" class="submit-style" title="Reset" value="Reset" />');
                        headerHTML.push('<input type="button" name="DOPBSP_close" id="DOPBSP_close" class="submit-style" title="Close" value="Close" />');
                        // ***************************************************** End Form Buttons   
                        
                        HTML.push('<div class="DOPBookingSystemPRO_Form">');
                        HTML.push('    <div class="container">');
                         
                        // ***************************************************** Start Dates/Hours Info
                        HTML.push('        <div class="section first">');
                        
                        if (type == 'days'){
                            if (dayStartSelection > dayEndSelection){
                                endDate = dayStartSelection.split('_')[1];
                                startDate = dayEndSelection.split('_')[1];
                            }
                            else{
                                startDate = dayStartSelection.split('_')[1];
                                endDate = dayEndSelection.split('_')[1];
                            }

                            sYear = startDate.split('-')[0];
                            sMonth = startDate.split('-')[1];
                            sMonthText = MonthNames[parseInt(sMonth, 10)-1];
                            sDay = startDate.split('-')[2];

                            eYear = endDate.split('-')[0];
                            eMonth = endDate.split('-')[1];
                            eMonthText = MonthNames[parseInt(eMonth, 10)-1];
                            eDay = endDate.split('-')[2];
                        }
                        else{            
                            startDate = hourDaySelection.split('_')[1];
                            sYear = startDate.split('-')[0];
                            sMonth = startDate.split('-')[1];
                            sMonthText = MonthNames[parseInt(sMonth, 10)-1];
                            sDay = startDate.split('-')[2];
                            
                            if (hourStartSelection > hourEndSelection){
                                endHour = hourStartSelection.split('_')[1];
                                startHour = hourEndSelection.split('_')[1];
                            }
                            else{
                                startHour = hourStartSelection.split('_')[1];
                                endHour = hourEndSelection.split('_')[1];
                            }
                            
                            hoursDef = Schedule[startDate] != undefined ? Schedule[startDate]['hours_definitions']:HoursDefinitions;

                            sHour = startHour.split(':')[0];
                            sMinute = startHour.split(':')[1];

                            eHour = endHour.split(':')[0];
                            eMinute = endHour.split(':')[1];
                        }
                        
                        if (type == 'days'){
                            if (dayStartSelection != dayEndSelection){
                                if (DateType == 1){
                                    HTML.push('            <div class="section-item">');
                                    HTML.push('                <label class="left">'+DateStartLabel+'</label>');
                                    HTML.push('                <span class="date">'+sMonthText+' '+sDay+', '+sYear+'</span>');
                                    HTML.push('                <br class="DOPBSP-clear" />');  
                                    HTML.push('            </div>');
                                    HTML.push('            <div class="section-item">');
                                    HTML.push('                <label class="left">'+DateEndLabel+'</label>');
                                    HTML.push('                <span class="date">'+eMonthText+' '+eDay+', '+eYear+'</span>');
                                    HTML.push('                <br class="DOPBSP-clear" />');  
                                    HTML.push('            </div>');
                                }
                                else{
                                    HTML.push('            <div class="section-item">');
                                    HTML.push('                <label class="left">'+DateStartLabel+'</label>');
                                    HTML.push('                <span class="date">'+sDay+' '+sMonthText+' '+sYear+'</span>');
                                    HTML.push('                <br class="DOPBSP-clear" />');  
                                    HTML.push('            </div>');
                                    HTML.push('            <div class="section-item">');
                                    HTML.push('                <label class="left">'+DateEndLabel+'</label>');
                                    HTML.push('                <span class="date">'+eDay+' '+eMonthText+' '+eYear+'</span>');
                                    HTML.push('                <br class="DOPBSP-clear" />');  
                                    HTML.push('            </div>');
                                }
                            }
                            else{      
                                HTML.push('            <div class="section-item">');                      
                                HTML.push('                <span class="date">'+(DateType == 1 ? sMonthText+' '+sDay+', '+sYear:sDay+' '+sMonthText+' '+sYear)+'</span>');
                                HTML.push('                <br class="DOPBSP-clear" />');  
                                HTML.push('            </div>');
                            }
                        }
                        else{
                            HTML.push('            <div class="section-item">');                      
                            HTML.push('                <span class="date">'+(DateType == 1 ? sMonthText+' '+sDay+', '+sYear:sDay+' '+sMonthText+' '+sYear)+'</span>');
                            HTML.push('                <br class="DOPBSP-clear" />');  
                            HTML.push('            </div>');   
                            
                            if (hourStartSelection != hourEndSelection || HoursIntervalEnabled){
                                HTML.push('            <div class="section-item">');
                                HTML.push('                <label class="left">'+HourStartLabel+'</label>');
                                HTML.push('                <span class="date">'+(HoursAMPM ? prototypes.timeToAMPM(sHour+':'+sMinute):(sHour+':'+sMinute))+'</span>');
                                HTML.push('                <br class="DOPBSP-clear" />');  
                                HTML.push('            </div>');
                                HTML.push('            <div class="section-item">');
                                HTML.push('                <label class="left">'+HourEndLabel+'</label>');
                                HTML.push('                <span class="date">'+(HoursAMPM ? prototypes.timeToAMPM(HoursIntervalEnabled ? methods.nextHour(eHour+':'+eMinute, hoursDef):eHour+':'+eMinute):(HoursIntervalEnabled ? methods.nextHour(eHour+':'+eMinute, hoursDef):eHour+':'+eMinute))+'</span>');
                                HTML.push('                <br class="DOPBSP-clear" />');  
                                HTML.push('            </div>');
                            }
                            else{      
                                HTML.push('            <div class="section-item">');
                                HTML.push('                <span class="date">'+(HoursAMPM ? prototypes.timeToAMPM(sHour+':'+sMinute):(sHour+':'+sMinute))+'</span>');
                                HTML.push('                <br class="DOPBSP-clear" />');  
                                HTML.push('            </div>');
                            }                       
                        }
                        HTML.push('        </div>');
                        // ***************************************************** End Dates/Hours Info
                        
                        // ***************************************************** Start Form Fields
                        HTML.push('        <div class="section'+(type == "days" && HoursEnabled ? '':' last')+'">');
                        
                        if ((type == 'days' && !HoursEnabled) || (type == 'days' && HoursEnabled && !DetailsFromHours) || type == 'hours'){
                            HTML.push('            <div class="section-item">');  
                            HTML.push('                <label class="type2" for="DOPBSP_status">'+StatusLabel+'</label>');
                            HTML.push('                <select name="DOPBSP_status" id="DOPBSP_status">');
                            HTML.push('                    <option value="available">'+StatusAvailableText+'</option>');
                            HTML.push('                    <option value="booked">'+StatusBookedText+'</option>');
                            HTML.push('                    <option value="special">'+StatusSpecialText+'</option>');
                            HTML.push('                    <option value="unavailable">'+StatusUnavailableText+'</option>');
                            HTML.push('                </select>');
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');     
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type2" for="DOPBSP_price">'+PriceLabel+'</label>');
                            HTML.push('                <input type="text" name="DOPBSP_price" id="DOPBSP_price" value="" /><span class="currency">'+Currency+'</span>');
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');                        
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type2" for="DOPBSP_promo">'+PromoLabel+'</label>');
                            HTML.push('                <input type="text" name="DOPBSP_promo" id="DOPBSP_promo" value="" disabled="disabled" /><span class="currency">'+Currency+'</span>'); 
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type2" for="DOPBSP_available">'+AvailableLabel+'</label>');
                            HTML.push('                <input type="text" name="DOPBSP_available" id="DOPBSP_available" value="1" />');
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');
                        }
                        HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type3" for="DOPBSP_info">'+InfoLabel+'</label>');
                        HTML.push('                <textarea name="DOPBSP_info" id="DOPBSP_info"></textarea>');  
                        HTML.push('            </div>');
                        HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type4" for="DOPBSP_notes">'+NotesLabel+'</label>');
                        HTML.push('                <textarea name="DOPBSP_notes" id="DOPBSP_notes"></textarea>'); 
                        HTML.push('            </div>');  
                        
                        if ((startDate != endDate && type == 'days' && !HoursEnabled) || (startHour != endHour && type == 'hours')){
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <input type="checkbox" name="DOPBSP_group" id="DOPBSP_group" />');
                            HTML.push('                <label class="type5" for="DOPBSP_group">'+(type == 'days' ? GroupDaysLabel:GroupHoursLabel)+'</label>');
                            //HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');   
                        }                 
                        HTML.push('        </div>');
                        // ***************************************************** End Form Fields
                        
                        
                        if (type == "days" && HoursEnabled){
                        // ***************************************************** Start Hours Definitions
                            HTML.push('        <div class="section">');
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <input type="checkbox" name="DOPBSP_change_hours_definitions" id="DOPBSP_change_hours_definitions" />');
                            HTML.push('                <label class="type5" for="DOPBSP_change_hours_definitions">'+HoursDefinitionsChangeLabel+'</label>');
                            HTML.push('            </div>'); 
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type4" for="DOPBSP_hours_definitions">'+HoursDefinitionsLabel+'</label>');
                            HTML.push('                <textarea name="DOPBSP_hours_definitions" id="DOPBSP_hours_definitions">'+hours+'</textarea>');
                            HTML.push('            </div>');
                            HTML.push('        </div>');
                        // ***************************************************** End Hours Definitions
                        
                        // ***************************************************** Start Hours Default Values
                            HTML.push('        <div class="section">');
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <input type="checkbox" name="DOPBSP_set_hours_default_data" id="DOPBSP_set_hours_default_data" />');
                            HTML.push('                <label class="type5" for="DOPBSP_set_hours_default_data">'+HoursSetDefaultDataLabel+'</label>');
                            HTML.push('            </div>'); 
                            HTML.push('            <div class="section-item">');  
                            HTML.push('                <label class="type2" for="DOPBSP_hours_status">'+StatusLabel+'</label>');
                            HTML.push('                <select name="DOPBSP_hours_status" id="DOPBSP_hours_status">');
                            HTML.push('                    <option value="available">'+StatusAvailableText+'</option>');
                            HTML.push('                    <option value="booked">'+StatusBookedText+'</option>');
                            HTML.push('                    <option value="special">'+StatusSpecialText+'</option>');
                            HTML.push('                    <option value="unavailable">'+StatusUnavailableText+'</option>');
                            HTML.push('                </select>');
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');     
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type2" for="DOPBSP_hours_price">'+PriceLabel+'</label>');
                            HTML.push('                <input type="text" name="DOPBSP_hours_price" id="DOPBSP_hours_price" value="" /><span class="currency">'+Currency+'</span>');
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');                        
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type2" for="DOPBSP_hours_promo">'+PromoLabel+'</label>');
                            HTML.push('                <input type="text" name="DOPBSP_hours_promo" id="DOPBSP_hours_promo" value="" disabled="disabled" /><span class="currency">'+Currency+'</span>'); 
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type2" for="DOPBSP_hours_available">'+AvailableLabel+'</label>');
                            HTML.push('                <input type="text" name="DOPBSP_hours_available" id="DOPBSP_hours_available" value="1" />');
                            HTML.push('                <br class="DOPBSP-clear" />');
                            HTML.push('            </div>');
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type3" for="DOPBSP_hours_info">'+InfoLabel+'</label>');
                            HTML.push('                <textarea name="DOPBSP_hours_info" id="DOPBSP_hours_info"></textarea>');  
                            HTML.push('            </div>');
                            HTML.push('            <div class="section-item">');
                            HTML.push('                <label class="type4" for="DOPBSP_hours_notes">'+NotesLabel+'</label>');
                            HTML.push('                <textarea name="DOPBSP_hours_notes" id="DOPBSP_hours_notes"></textarea>'); 
                            HTML.push('            </div>');  
                            HTML.push('        </div>');
                        // ***************************************************** End Hours Default Values
                        }
                        
                        HTML.push('    </div>');                      
                        HTML.push('</div>');
                                                
                        $('.DOPBSP-admin .column3 .column-header').html(headerHTML.join(''));
                        $('.DOPBSP-admin .column3 .column-content').html(HTML.join(''));
                        dopbspResizeOneTime();

                        // ----------------------------------------------------- Start Form Actions
                        if ((type == 'days' && !HoursEnabled) || (type == 'days' && HoursEnabled && !DetailsFromHours) || type == 'hours'){
                            $('#DOPBSP_status').unbind('change');
                            $('#DOPBSP_status').bind('change', function(){
                                switch ($(this).val()){
                                    case 'available':
                                        $('#DOPBSP_price').removeAttr('disabled');
                                        $('#DOPBSP_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_available').removeAttr('disabled');
                                        $('#DOPBSP_available').val('1');

                                        if (startDate != endDate && (type != 'days' && !HoursEnabled)){
                                            $('#DOPBSP_group').removeAttr('disabled');
                                        }
                                        break;
                                    case 'booked':
                                        $('#DOPBSP_price').attr('disabled', 'disabled');
                                        $('#DOPBSP_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_price').val('');
                                        $('#DOPBSP_promo').val('');
                                        $('#DOPBSP_available').attr('disabled', 'disabled');
                                        $('#DOPBSP_available').val('');

                                        if (startDate != endDate && (type != 'days' && !HoursEnabled)){
                                            $('#DOPBSP_group').removeAttr('disabled');
                                        }
                                        break;
                                    case 'special':
                                        $('#DOPBSP_price').removeAttr('disabled');
                                        $('#DOPBSP_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_available').removeAttr('disabled');
                                        $('#DOPBSP_available').val('1');

                                        if (startDate != endDate && (type != 'days' && !HoursEnabled)){
                                            $('#DOPBSP_group').removeAttr('disabled');
                                        }
                                        break;
                                    case 'unavailable':
                                        $('#DOPBSP_price').attr('disabled', 'disabled');
                                        $('#DOPBSP_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_price').val('');
                                        $('#DOPBSP_promo').val('');
                                        $('#DOPBSP_available').attr('disabled', 'disabled');
                                        $('#DOPBSP_available').val('');

                                        if (startDate != endDate && (type != 'days' && !HoursEnabled)){
                                            $('#DOPBSP_group').attr('disabled', 'disabled');
                                        }
                                        break;
                                }
                            });
                        
                            $('#DOPBSP_price').unbind('keyup');
                            $('#DOPBSP_price').bind('keyup', function(){
                                prototypes.cleanInput(this, '0123456789.', '0', '');

                                if ($(this).val() > '0'){
                                    $('#DOPBSP_promo').removeAttr('disabled');
                                }
                                else{
                                    $('#DOPBSP_promo').attr('disabled', 'disabled');
                                    $('#DOPBSP_promo').val('');                                
                                }
                            });

                            $('#DOPBSP_promo').unbind('keyup');
                            $('#DOPBSP_promo').bind('keyup', function(){
                                prototypes.cleanInput(this, '0123456789.', '0', '');
                            });
                        }
                        
                        if (type == 'days' && HoursEnabled){
                            $('#DOPBSP_hours_status').unbind('change');
                            $('#DOPBSP_hours_status').bind('change', function(){
                                switch ($(this).val()){
                                    case 'available':
                                        $('#DOPBSP_hours_price').removeAttr('disabled');
                                        $('#DOPBSP_hours_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_available').removeAttr('disabled');
                                        $('#DOPBSP_hours_available').val('1');
                                        break;
                                    case 'booked':
                                        $('#DOPBSP_hours_price').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_price').val('');
                                        $('#DOPBSP_hours_promo').val('');
                                        $('#DOPBSP_hours_available').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_available').val('');
                                        break;
                                    case 'special':
                                        $('#DOPBSP_hours_price').removeAttr('disabled');
                                        $('#DOPBSP_hours_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_available').removeAttr('disabled');
                                        $('#DOPBSP_hours_available').val('1');
                                        break;
                                    case 'unavailable':
                                        $('#DOPBSP_hours_price').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_promo').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_price').val('');
                                        $('#DOPBSP_hours_promo').val('');
                                        $('#DOPBSP_hours_available').attr('disabled', 'disabled');
                                        $('#DOPBSP_hours_available').val('');
                                        break;
                                }
                            });
                            
                            $('#DOPBSP_hours_price').unbind('keyup');
                            $('#DOPBSP_hours_price').bind('keyup', function(){
                                prototypes.cleanInput(this, '0123456789.', '0', '');

                                if ($(this).val() > '0'){
                                    $('#DOPBSP_hours_promo').removeAttr('disabled');
                                }
                                else{
                                    $('#DOPBSP_hours_promo').attr('disabled', 'disabled');
                                    $('#DOPBSP_hours_promo').val('');                                
                                }
                            });

                            $('#DOPBSP_hours_promo').unbind('keyup');
                            $('#DOPBSP_hours_promo').bind('keyup', function(){
                                prototypes.cleanInput(this, '0123456789.', '0', '');
                            });
                                                
                            $('#DOPBSP_hours_available').unbind('keyup');
                            $('#DOPBSP_hours_available').bind('keyup', function(){
                                prototypes.cleanInput(this, '0123456789', '0', '');
                            });
                        }
                                                
                        $('#DOPBSP_available').unbind('keyup');
                        $('#DOPBSP_available').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789', '0', '');
                        });

                        $('#DOPBSP_submit').unbind('click');
                        $('#DOPBSP_submit').bind('click', function(){
                            methods.setData(type);
                        });
                        
                        $('#DOPBSP_reset').unbind('click');
                        $('#DOPBSP_reset').bind('click', function(){
                            methods.resetData(type);
                        });
                        
                        $('#DOPBSP_close').unbind('click');
                        $('#DOPBSP_close').bind('click', function(){
                            methods.hideForm(type);
                        });
                        // ----------------------------------------------------- End Form Actions
                        
                        $('body').animate({scrollTop:0}, 'slow');
                    },
                    hideForm:function(type){
                        dopbspRemoveColumns(3);
                        
                        if (type == 'days'){
                            $('.DOPBookingSystemPRO_Day', Container).removeClass('selected');   
                            methods.customizeDays();
                        }
                        else{
                            $('.DOPBookingSystemPRO_Hour', Container).removeClass('selected');
                        }
                    },
            
                    setData:function(type){// Set submited data.
                        var hoursDefinitions = new Array(), 
                        hours = new Array(),
                        i, y, m, d, noDays, key,
                        startDate, sYear, sMonth, sDay,
                        endDate, eYear, eMonth, eDay,
                        startHour, sHour, sMinute,
                        endHour, eHour, eMinute,
                        fromMonth, toMonth, fromDay, toDay,
                        availableValue = $('#DOPBSP_available').val() != undefined ? $('#DOPBSP_available').val():'',
                        bindValue = 0,
                        hoursValue = {},
                        hoursDefinitionsValue,
                        infoValue = $('#DOPBSP_info').val().replace(/\n/gi, '<br />'),
                        notesValue = $('#DOPBSP_notes').val().replace(/\n/gi, '<br />'),
                        priceValue = $('#DOPBSP_price').val() != undefined ? $('#DOPBSP_price').val():'',
                        promoValue = $('#DOPBSP_promo').val() != undefined ? $('#DOPBSP_promo').val():'',
                        statusValue = $('#DOPBSP_status').val() != undefined ? $('#DOPBSP_status').val():'',
                        hoursAvailableValue = $('#DOPBSP_set_hours_default_data').is(':checked') && $('#DOPBSP_hours_available').val() != undefined ? $('#DOPBSP_hours_available').val():'',
                        hoursInfoValue = $('#DOPBSP_set_hours_default_data').is(':checked') && $('#DOPBSP_hours_info').val() != undefined ? $('#DOPBSP_hours_info').val().replace(/\n/gi, '<br />'):'',
                        hoursNotesValue = $('#DOPBSP_set_hours_default_data').is(':checked') && $('#DOPBSP_hours_notes').val() != undefined ? $('#DOPBSP_hours_notes').val().replace(/\n/gi, '<br />'):'',
                        hoursPriceValue = $('#DOPBSP_set_hours_default_data').is(':checked') && $('#DOPBSP_hours_price').val() != undefined ? $('#DOPBSP_hours_price').val():'',
                        hoursPromoValue = $('#DOPBSP_set_hours_default_data').is(':checked') && $('#DOPBSP_hours_promo').val() != undefined ? $('#DOPBSP_hours_promo').val():'',
                        hoursStatusValue = $('#DOPBSP_set_hours_default_data').is(':checked') && $('#DOPBSP_hours_status').val() != undefined ? $('#DOPBSP_hours_status').val():'none',
                        hourDefaultValue = {"available": hoursAvailableValue,
                                            "bind": "0",
                                            "info": hoursInfoValue,
                                            "notes": hoursNotesValue,
                                            "price": hoursPriceValue,
                                            "promo": hoursPromoValue,
                                            "status": hoursStatusValue};
                                               
                        if (type == 'days'){
                            startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1];
                            endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];

                            sYear = parseInt(startDate.split('-')[0], 10);
                            sMonth = parseInt(startDate.split('-')[1], 10);
                            sDay = parseInt(startDate.split('-')[2], 10);

                            eYear = parseInt(endDate.split('-')[0], 10);
                            eMonth = parseInt(endDate.split('-')[1], 10);
                            eDay = parseInt(endDate.split('-')[2], 10);

                            if (Schedule[methods.previousDay(startDate)] != undefined){
                                if (Schedule[methods.previousDay(startDate)]['bind'] == 1){
                                    Schedule[methods.previousDay(startDate)]['bind'] = 0;                                                                
                                }
                                else if (Schedule[methods.previousDay(startDate)]['bind'] == 2){
                                    Schedule[methods.previousDay(startDate)]['bind'] = 3;                                
                                }
                            }

                            if (Schedule[methods.nextDay(endDate)] != undefined){
                                if (Schedule[methods.nextDay(endDate)]['bind'] == 2){
                                    Schedule[methods.nextDay(endDate)]['bind'] = 1;                                                                
                                }
                                else if (Schedule[methods.nextDay(endDate)]['bind'] == 3){
                                    Schedule[methods.nextDay(endDate)]['bind'] = 0;                                
                                }
                            }
                        
                            if (HoursEnabled && $('#DOPBSP_change_hours_definitions').is(':checked') && $('#DOPBSP_hours_definitions').val() != undefined && $('#DOPBSP_hours_definitions').val() != ''){
                                hoursDefinitions = $('#DOPBSP_hours_definitions').val().split('\n');

                                for (i=0; i<hoursDefinitions.length; i++){
                                    hoursDefinitions[i] = hoursDefinitions[i].replace(/\s/g, "");
                                    
                                    if (hoursDefinitions[i] != ''){
                                        hours.push({'value': hoursDefinitions[i]});
                                        hoursValue[hoursDefinitions[i]] = hourDefaultValue;
                                        
                                        if ((HoursIntervalEnabled || !AddLastHourToTotalPrice) && i == hoursDefinitions.length-1){
                                             hoursValue[hoursDefinitions[i]] = methods.defaultHour();
                                        }
                                    }
                                }
                            }
                            else{
                                key = sYear+'-'+prototypes.timeLongItem(sMonth)+'-'+prototypes.timeLongItem(sDay);
                                
                                if (Schedule[key] != undefined){
                                    for (i=0; i<Schedule[key]['hours_definitions'].length; i++){
                                        hoursValue[Schedule[key]['hours_definitions'][i]['value']] = hourDefaultValue;
                                        
                                        if ((HoursIntervalEnabled || !AddLastHourToTotalPrice) && i == Schedule[key]['hours_definitions'].length-1){
                                            hoursValue[Schedule[key]['hours_definitions'][i]['value']] = methods.defaultHour();
                                        }
                                    }
                                }
                                else{
                                    for (i=0; i<HoursDefinitions.length; i++){
                                        hoursValue[HoursDefinitions[i]['value']] = hourDefaultValue;
                                        
                                        if ((HoursIntervalEnabled || !AddLastHourToTotalPrice) && i == HoursDefinitions.length-1){
                                            hoursValue[HoursDefinitions[i]['value']] = methods.defaultHour();
                                        }
                                    }
                                }
                            }
                            
                            for (y=sYear; y<=eYear; y++){
                                fromMonth = 1;
                                
                                if (y == sYear){
                                    fromMonth = sMonth;
                                }

                                toMonth = 12;
                                
                                if (y == eYear){
                                    toMonth = eMonth;
                                }

                                for (m=fromMonth; m<=toMonth; m++){
                                    noDays = new Date(y, m, 0).getDate();
                                    fromDay = 1;
                                    
                                    if (y == sYear && m == sMonth){
                                        fromDay = sDay;
                                    }

                                    toDay = noDays;
                                    
                                    if (y == eYear && m == eMonth){
                                        toDay = eDay;
                                    }

                                    for (d=fromDay; d<=toDay; d++){
                                        key = y+'-'+prototypes.timeLongItem(m)+'-'+prototypes.timeLongItem(d);

                                        if ($('#DOPBSP_group').is(':checked')){
                                            if (key == startDate){
                                                bindValue = 1;
                                            }                 
                                            else if (key == endDate){
                                                bindValue = 3;
                                            }   
                                            else{
                                                bindValue = 2;                                            
                                            }
                                        }
                                        
                                        if ($('#DOPBSP_change_hours_definitions').is(':checked') && $('#DOPBSP_hours_definitions').val() != undefined && $('#DOPBSP_hours_definitions').val() != ''){
                                            hoursDefinitionsValue = hours;
                                        }
                                        else{
                                            if (Schedule[key] != undefined){
                                                hoursValue = $('#DOPBSP_set_hours_default_data').is(':checked') ? hoursValue:Schedule[key]['hours'];
                                                hoursDefinitionsValue = Schedule[key]['hours_definitions'];
                                            }
                                            else{
                                                hoursDefinitionsValue = HoursDefinitions;
                                            }
                                        }

                                        Schedule[key] = {"available": availableValue,
                                                         "bind": bindValue,
                                                         "hours": $.extend(true, {}, hoursValue),
                                                         "hours_definitions": hoursDefinitionsValue,
                                                         "info": infoValue,
                                                         "notes": notesValue,
                                                         "price": priceValue,
                                                         "promo": promoValue,
                                                         "status": statusValue};
                                       
                                        if (HoursEnabled && DetailsFromHours){
                                            methods.setDayFromHours(key);
                                        }
                                    }
                                }
                            }
                            
                            methods.generateCalendar(startDate.split('-')[0], startDate.split('-')[1]); 
                        }
                        else{
                            startDate = hourDaySelection.split('_')[1];
                            sYear = startDate.split('-')[0];
                            sMonth = startDate.split('-')[1];
                            sDay = startDate.split('-')[2];
                           
                            if (hourStartSelection > hourEndSelection){
                                endHour = hourStartSelection.split('_')[1];
                                startHour = hourEndSelection.split('_')[1];
                            }
                            else{
                                startHour = hourStartSelection.split('_')[1];
                                endHour = hourEndSelection.split('_')[1];
                            }

                            sHour = startHour.split(':')[0];
                            sMinute = startHour.split(':')[1];

                            eHour = endHour.split(':')[0];
                            eMinute = endHour.split(':')[1];
                            
                            if (Schedule[sYear+'-'+sMonth+'-'+sDay] == undefined){
                                Schedule[sYear+'-'+sMonth+'-'+sDay] = methods.defaultDay(methods.weekDay(sYear, sMonth, sDay));
                            }
                            
                            if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])] != undefined){
                                if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 1){
                                    Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 0;                                                                
                                }
                                else if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 2){
                                    Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 3;                                
                                }
                            }

                            if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])] != undefined){
                                if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 2){
                                    Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 1;                                                                
                                }
                                else if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 3){
                                    Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 0;                                
                                }
                            }
                            
                            for (i=0; i<Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'].length; i++){
                                key = Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'][i]['value'];
                                
                                if ($('#DOPBSP_group').is(':checked')){
                                    if (key == startHour){
                                        bindValue = 1;
                                    }                 
                                    else if (key == endHour){
                                        bindValue = 3;
                                    }   
                                    else{
                                        bindValue = 2;                                            
                                    }
                                }
                                
                                if (sHour+':'+sMinute <= key && key <= eHour+':'+eMinute){
                                    Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][key] = {"available": availableValue,
                                                                                         "bind": bindValue,
                                                                                         "info": infoValue,
                                                                                         "notes": notesValue,
                                                                                         "price": priceValue,
                                                                                         "promo": promoValue,
                                                                                         "status": statusValue};                                 
                                }
                            }
                            
                            if (HoursEnabled && DetailsFromHours){
                                methods.setDayFromHours(startDate);
                                methods.generateCalendar(startDate.split('-')[0], startDate.split('-')[1]); 
                            }
                            
                            methods.initHours(hourDaySelection);
                            window.location = '#'+ID+'_'+startHour;                            
                            $('body').scrollTop($('body').scrollTop()-50);
                        }
                         
                        methods.saveData();
                    },  
                    saveData:function(){// Save data.
                        var startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                        endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];
        
                        yearStartSave = parseInt(startDate.split('-')[0], 10);
                        monthStartSave = parseInt(startDate.split('-')[1], 10);
                        yearEndSave = parseInt(endDate.split('-')[0], 10);
                        monthEndSave = parseInt(endDate.split('-')[1], 10);
                                                
                        dopbspToggleMessage('show', DOPBSP_SAVE);
                        methods.hideForm();
                        
                        methods.saveDataSection(yearStartSave, monthStartSave);
                    },                    
                    saveDataSection:function(year, month){                     
                        var schedule = Schedule.constructor(),
                        nextYear = month == 12 ? year+1:year, 
                        nextMonth = month == 12 ? 1:month+1,
                        startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                        endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];
                        
                        for (var day in Schedule){
                            if (day.indexOf(year+'-'+prototypes.timeLongItem(month)) != -1){
                                if (startDate <= day && day <= endDate){
                                    schedule[day] = Schedule[day];
                                }
                            }                            
                        }         
                            
                        if (yearStartSave != year || monthStartSave != month){
                            methods.generateCalendar(StartYear, (year-StartYear)*12+month);
                        
                            if (StartMonth != month){
                                $('.DOPBookingSystemPRO_Navigation .previous_btn', Container).css('display', 'block');
                            }
                        }

                        $.post(ajaxurl, {action:'dopbsp_save_schedule', calendar_id:ID, schedule:schedule}, function(data){    
                            if (year == yearEndSave && month == monthEndSave){
                                dopbspToggleMessage('success', data);
                            }                            
                            else{
                                methods.saveDataSection(nextYear, nextMonth);                      
                            }  
                        });
                    },                    
                    resetData:function(type){// Reset Selected days.
                        var i, key,
                        startDate, sYear, sMonth, sDay,
                        startHour, sHour, sMinute,
                        endHour, eHour, eMinute;
                        
                        if (confirm(ResetConfirmation)){
                            if (type == 'days'){
                                methods.deleteData();
                            }
                            else{
                                startDate = hourDaySelection.split('_')[1];
                                sYear = startDate.split('-')[0];
                                sMonth = startDate.split('-')[1];
                                sDay = startDate.split('-')[2];

                                if (hourStartSelection > hourEndSelection){
                                    endHour = hourStartSelection.split('_')[1];
                                    startHour = hourEndSelection.split('_')[1];
                                }
                                else{
                                    startHour = hourStartSelection.split('_')[1];
                                    endHour = hourEndSelection.split('_')[1];
                                }

                                sHour = startHour.split(':')[0];
                                sMinute = startHour.split(':')[1];

                                eHour = endHour.split(':')[0];
                                eMinute = endHour.split(':')[1];

                                if (Schedule[sYear+'-'+sMonth+'-'+sDay] == undefined){
                                    Schedule[sYear+'-'+sMonth+'-'+sDay] = methods.defaultDay(methods.weekDay(sYear, sMonth, sDay));
                                }

                                if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])] != undefined){
                                    if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 1){
                                        Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 0;                                                                
                                    }
                                    else if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 2){
                                        Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.previousHour(startHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 3;                                
                                    }
                                }

                                if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])] != undefined){
                                    if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 2){
                                        Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 1;                                                                
                                    }
                                    else if (Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] == 3){
                                        Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][methods.nextHour(endHour, Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'])]['bind'] = 0;                                
                                    }
                                }

                                for (i=0; i<Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'].length; i++){
                                    key = Schedule[sYear+'-'+sMonth+'-'+sDay]['hours_definitions'][i]['value'];

                                    if (sHour+':'+sMinute <= key && key <= eHour+':'+eMinute){
                                        Schedule[sYear+'-'+sMonth+'-'+sDay]['hours'][key] = methods.defaultHour();
                                    }
                                }
                            
                                if (HoursEnabled && DetailsFromHours){
                                    methods.setDayFromHours(startDate);
                                }

                                methods.initHours(hourDaySelection);
                                window.location = '#'+ID+'_'+startHour;                            
                                $('body').scrollTop($('body').scrollTop()-50);                        
                                methods.saveData();
                            }
                        }
                    },                  
                    deleteData:function(){// Save data.
                        var startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                        endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];
                                
                        yearStartSave = parseInt(startDate.split('-')[0], 10);
                        monthStartSave = parseInt(startDate.split('-')[1], 10);
                        yearEndSave = parseInt(endDate.split('-')[0], 10);
                        monthEndSave = parseInt(endDate.split('-')[1], 10);
                                                
                        dopbspToggleMessage('show', DOPBSP_SAVE);
                        methods.hideForm();
                        
                        methods.deleteDataSection(yearStartSave, monthStartSave);
                    },                    
                    deleteDataSection:function(year, month){
                        var schedule = Schedule.constructor(),
                        nextYear = month == 12 ? year+1:year, 
                        nextMonth = month == 12 ? 1:month+1,
                        startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                        endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];
                        
                        for (var day in Schedule){
                            if (day.indexOf(year+'-'+prototypes.timeLongItem(month)) != -1){
                                if (startDate <= day && day <= endDate){
                                    schedule[day] = Schedule[day];                                        
                                    delete Schedule[day];
                                }
                            }                            
                        }
                            
                        if (yearStartSave != year || monthStartSave != month){
                            methods.generateCalendar(StartYear, CurrMonth+1);
                        }
                        else{
                            methods.generateCalendar(StartYear, dayStartSelectionCurrMonth); 
                        }

                        $.post(ajaxurl, {action:'dopbsp_delete_schedule', calendar_id:ID, schedule:schedule}, function(data){                            
                            if (year == yearEndSave && month == monthEndSave){
                                dopbspToggleMessage('success', data);
                            }                            
                            else{
                                methods.deleteDataSection(nextYear, nextMonth);                     
                            }   
                        });
                    },
                    setDayFromHours:function(day){
                        if (Schedule[day] != undefined){
                            var available = 0,
                            price = '',
                            status = 'none';
                                
                            for (var hour in Schedule[day]['hours']){
                                // No Available Check
                                if (Schedule[day]['hours'][hour]['bind'] == 0 || Schedule[day]['hours'][hour]['bind'] == 1){
                                    if (Schedule[day]['hours'][hour]['available'] != ''){
                                        available += parseInt(Schedule[day]['hours'][hour]['available']);
                                    }

                                    // Price Check
                                    if (Schedule[day]['hours'][hour]['price'] != '' && (price == '' || parseInt(Schedule[day]['hours'][hour]['price']) < price)){
                                        price = parseInt(Schedule[day]['hours'][hour]['price']);
                                    }

                                    if (Schedule[day]['hours'][hour]['promo'] != '' && (price == '' || parseInt(Schedule[day]['hours'][hour]['promo']) < price)){
                                        price = parseInt(Schedule[day]['hours'][hour]['promo']);
                                    }

                                    // Status Check
                                    if (Schedule[day]['hours'][hour]['status'] == 'unavailable' && status == 'none'){
                                        status = 'unavailable';
                                    }

                                    if (Schedule[day]['hours'][hour]['status'] == 'booked' && (status == 'none' || status == 'unavailable')){
                                        status = 'booked';
                                    }

                                    if (Schedule[day]['hours'][hour]['status'] == 'special' && (status == 'none' || status == 'unavailable' || status == 'booked')){
                                        status = 'special';
                                    }

                                    if (Schedule[day]['hours'][hour]['status'] == 'available'){
                                        status = 'available';
                                    }
                                }
                            }
                            
                            Schedule[day]['available'] = available == 0 ? '':available;
                            Schedule[day]['price'] = price;
                            Schedule[day]['status'] = status;
                        }
                    },
                                        
                    previousDay:function(date){
                        var previousDay = new Date(),
                        parts = date.split('-');
                        
                        previousDay.setFullYear(parts[0], parseInt(parts[1])-1, parts[2]);
                        previousDay.setTime(previousDay.getTime()-86400000);
                                                
                        return previousDay.getFullYear()+'-'+prototypes.timeLongItem(previousDay.getMonth()+1)+'-'+prototypes.timeLongItem(previousDay.getDate());                        
                    },
                    nextDay:function(date){
                        var nextDay = new Date(),
                        parts = date.split('-');
                        
                        nextDay.setFullYear(parts[0], parts[1], parts[2]);
                        nextDay.setTime(nextDay.getTime()+86400000);
                                                
                        return nextDay.getFullYear()+'-'+prototypes.timeLongItem(nextDay.getMonth())+'-'+prototypes.timeLongItem(nextDay.getDate());
                    },
                    weekDay:function(year, month, day){
                        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        date = new Date(eval('"'+day+' '+months[parseInt(month, 10)-1]+', '+year+'"'));
                        
                        return date.getDay();
                    },
                    yearMonth:function(year, month){
                        return new Date(year, month, 0).getMonth();
                    },
                    nextHour:function(hour, hours){
                        var nextHour = '24:00', i;
                        
                        for (i=hours.length-1; i>=0; i--){
                            if (hours[i]['value'] > hour){
                                nextHour = hours[i]['value'];
                            }
                        }
                        
                        return nextHour;
                    },
                    previousHour:function(hour, hours){
                        var previousHour = '00:00', i;
                        
                        for (i=0; i<hours.length; i++){
                            if (hours[i]['value'] < hour){
                                previousHour = hours[i]['value'];
                            }
                        }
                        
                        return previousHour;
                    },
                    
                    showReservations:function(){
                        if (clearClick){
                            dopbspRemoveColumns(3);
                            dopbspToggleMessage('show', DOPBSP_LOAD);
                            
                            $.post(ajaxurl, {action:'dopbsp_show_reservations', calendar_id:ID}, function(data){
                                $('.DOPBSP-admin .column3 .column-content').html(data);
                                dopbspToggleMessage('hide', '');
                                
                                methods.initToggleReservation();
                                methods.initJumpDayReservation();
                                methods.initApproveReservation();
                                methods.initRejectReservation(); 
                                methods.initCancelReservation();                                
                            });                        
                        }
                    },
                    initToggleReservation:function(id){                        
                        $('.DOPBookingSystemPRO_Reservation .toggle').unbind('click');
                        $('.DOPBookingSystemPRO_Reservation .toggle').bind('click', function(){
                            var id = $(this).attr('id').split('DOPBSP_Reservation_ToggleID')[1];

                            $('.DOPBookingSystemPRO_Day', Container).removeClass('selected');
                            $('.DOPBookingSystemPRO_Hour', Container).removeClass('selected');
                            $('.DOPBookingSystemPRO_Reservation .section.content').css('display', 'none');

                            if ($('#DOPBSP_Reservation_ToggleID'+id).html() == '+'){
                                $('.DOPBookingSystemPRO_Reservation .toggle').html('+'); 
                                $('#DOPBSP_Reservation_ToggleID'+id).html('-');
                                $('#DOPBSP_Reservation_ContentID'+id).css('display', 'block');
                            }
                            else{ 
                                $('.DOPBookingSystemPRO_Reservation .toggle').html('+');                           
                            }
                        });                                
                    },
                    initJumpDayReservation:function(){                                
                        $('.DOPBookingSystemPRO_Message_JumpDay').unbind('click');
                        $('.DOPBookingSystemPRO_Message_JumpDay').bind('click', function(){
                            var date = $(this).attr('id').split('DOPBookingSystemPRO_Message_JumpDay_')[1],
                            year = parseInt(date.split('-')[0], 10),
                            month = parseInt(date.split('-')[1], 10);

                            methods.generateCalendar(StartYear, (year-StartYear)*12+month);
                        });
                    },
                    initApproveReservation:function(){                                
                        $('.DOPBookingSystemPRO_ReservationApprove').unbind('click');
                        $('.DOPBookingSystemPRO_ReservationApprove').bind('click', function(){
                            if (clearClick){
                                if (confirm(DOPBSP_RESERVATIONS_APPROVE_CONFIRMATION)){
                                    var id = $(this).attr('id').split('DOPBookingSystemPRO_ReservationApprove')[1],
                                    year, month;

                                    dopbspMoveTop();
                                    dopbspToggleMessage('show', DOPBSP_SAVE);
                                    
                                    $.post(ajaxurl, {action:'dopbsp_approve_reservation', calendar_id:ID, reservation_id:id}, function(data){
                                        data = $.trim(data);
                                        data = methods.cleanReservationAction(data);
                                        
                                        year = parseInt(data.split('-')[0]);
                                        month = parseInt(data.split('-')[1]);
                                        
                                        for (var day in Schedule){
                                            if (day.indexOf(year) != -1){                                      
                                                delete Schedule[day];
                                            }                            
                                        }
                        
                                        $.post(ajaxurl, {action:'dopbsp_load_schedule', calendar_id:ID, year:year}, function(data){
                                            dopbspToggleMessage('hide', DOPBSP_RESERVATIONS_APPROVE_SUCCESS);
                                            if ($.trim(data) != ''){
                                                $.extend(Schedule, JSON.parse($.trim(data)));
                                            }
                                            
                                            $('#DOPBSP_Reservation_StatusID'+id).html(DOPBSP_RESERVATIONS_STATUS_APPROVED);
                                            $('#DOPBookingSystemPRO_ReservationApprove'+id).css('display', 'none');
                                            $('#DOPBookingSystemPRO_ReservationReject'+id).css('display', 'none');
                                            $('#DOPBookingSystemPRO_ReservationCancel'+id).css('display', 'inline-block');
                                            methods.generateCalendar(StartYear, (year-StartYear)*12+month);
                                        });
                                    });   
                                }
                            }
                        }); 
                    },
                    initRejectReservation:function(){                                
                        $('.DOPBookingSystemPRO_ReservationReject').unbind('click');
                        $('.DOPBookingSystemPRO_ReservationReject').bind('click', function(){
                            if (clearClick){
                                if (confirm(DOPBSP_RESERVATIONS_REJECT_CONFIRMATION)){
                                    var id = $(this).attr('id').split('DOPBookingSystemPRO_ReservationReject')[1],
                                    noReservations = 0;

                                    dopbspToggleMessage('show', DOPBSP_SAVE);
    
                                    $.post(ajaxurl, {action:'dopbsp_reject_reservation', calendar_id:ID, reservation_id:id}, function(data){
                                        noReservations = $('#DOPBSP-reservations span').html() == '' ? 0:parseInt($('#DOPBSP-reservations span').html(), 10)-1;
                                        $('#DOPBSP_Reservation_ID'+id).css('display', 'none');
                                        
                                        if (noReservations == 0){                                            
                                            $('#DOPBSP-reservations').removeClass('new');
                                            $('#DOPBSP-reservations span').html('');
                                        }
                                        else{                                            
                                            $('#DOPBSP-reservations span').html(noReservations);
                                        }
                                        dopbspToggleMessage('hide', DOPBSP_RESERVATIONS_REJECT_SUCCESS);
                                    });
                                }
                            }
                        });                        
                    },
                    initCancelReservation:function(){                                
                        $('.DOPBookingSystemPRO_ReservationCancel').unbind('click');
                        $('.DOPBookingSystemPRO_ReservationCancel').bind('click', function(){
                            if (clearClick){
                                if (confirm(DOPBSP_RESERVATIONS_CANCEL_CONFIRMATION)){
                                    var id = $(this).attr('id').split('DOPBookingSystemPRO_ReservationCancel')[1],
                                    noReservations = 0;

                                    dopbspToggleMessage('show', DOPBSP_SAVE);
                                    
                                    $.post(ajaxurl, {action:'dopbsp_cancel_reservation', calendar_id:ID, reservation_id:id}, function(data){
                                        noReservations = $('#DOPBSP-reservations span').html() == '' ? 0:parseInt($('#DOPBSP-reservations span').html(), 10)-1;
                                        $('#DOPBSP_Reservation_ID'+id).css('display', 'none');
                                        
                                        if (noReservations == 0){                                            
                                            $('#DOPBSP-reservations').removeClass('new');
                                            $('#DOPBSP-reservations span').html('');
                                        }
                                        else{                                            
                                            $('#DOPBSP-reservations span').html(noReservations);
                                        }
                                        dopbspToggleMessage('hide', DOPBSP_RESERVATIONS_CANCEL_SUCCESS);
                                    });
                                }
                            }
                        });                        
                    },
                    cleanReservationAction:function(data){
                        var result = data.split('>');
                        
                        if (result[1] != undefined){
                            data = result[result.length-1];
                        }
                        else{
                            data = data;
                        }
                        
                        return data;
                    }
                  },

        prototypes = {
                        resizeItem:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item is 100% visible)
                            var currW = 0, currH = 0;

                            if (dw <= cw && dh <= ch){
                                currW = dw;
                                currH = dh;
                            }
                            else{
                                currH = ch;
                                currW = (dw*ch)/dh;

                                if (currW > cw){
                                    currW = cw;
                                    currH = (dh*cw)/dw;
                                }
                            }

                            child.width(currW);
                            child.height(currH);
                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },
                        resizeItem2:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item covers all the container)
                            var currW = 0, currH = 0;

                            currH = ch;
                            currW = (dw*ch)/dh;

                            if (currW < cw){
                                currW = cw;
                                currH = (dh*cw)/dw;
                            }

                            child.width(currW);
                            child.height(currH);

                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },

                        topItem:function(parent, child, ch){// Position item on Top
                            parent.height(ch);
                            child.css('margin-top', 0);
                        },
                        bottomItem:function(parent, child, ch){// Position item on Bottom
                            parent.height(ch);
                            child.css('margin-top', ch-child.height());
                        },
                        leftItem:function(parent, child, cw){// Position item on Left
                            parent.width(cw);
                            child.css('margin-left', 0);
                        },
                        rightItem:function(parent, child, cw){// Position item on Right
                            parent.width(cw);
                            child.css('margin-left', parent.width()-child.width());
                        },
                        hCenterItem:function(parent, child, cw){// Position item on Horizontal Center
                            parent.width(cw);
                            child.css('margin-left', (cw-child.width())/2);
                        },
                        vCenterItem:function(parent, child, ch){// Position item on Vertical Center
                            parent.height(ch);
                            child.css('margin-top', (ch-child.height())/2);
                        },
                        centerItem:function(parent, child, cw, ch){// Position item on Center
                            prototypes.hCenterItem(parent, child, cw);
                            prototypes.vCenterItem(parent, child, ch);
                        },
                        tlItem:function(parent, child, cw, ch){// Position item on Top-Left
                            prototypes.topItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        tcItem:function(parent, child, cw, ch){// Position item on Top-Center
                            prototypes.topItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        trItem:function(parent, child, cw, ch){// Position item on Top-Right
                            prototypes.topItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        mlItem:function(parent, child, cw, ch){// Position item on Middle-Left
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        mrItem:function(parent, child, cw, ch){// Position item on Middle-Right
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        blItem:function(parent, child, cw, ch){// Position item on Bottom-Left
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        bcItem:function(parent, child, cw, ch){// Position item on Bottom-Center
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        brItem:function(parent, child, cw, ch){// Position item on Bottom-Right
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        
                        touchNavigation:function(parent, child){// One finger navigation for touchscreen devices
                            var prevX, prevY, currX, currY, touch, childX, childY;
                            
                            parent.bind('touchstart', function(e){
                                touch = e.originalEvent.touches[0];
                                prevX = touch.clientX;
                                prevY = touch.clientY;
                            });

                            parent.bind('touchmove', function(e){                                
                                touch = e.originalEvent.touches[0];
                                currX = touch.clientX;
                                currY = touch.clientY;
                                childX = currX>prevX ? parseInt(child.css('margin-left'))+(currX-prevX):parseInt(child.css('margin-left'))-(prevX-currX);
                                childY = currY>prevY ? parseInt(child.css('margin-top'))+(currY-prevY):parseInt(child.css('margin-top'))-(prevY-currY);

                                if (childX < (-1)*(child.width()-parent.width())){
                                    childX = (-1)*(child.width()-parent.width());
                                }
                                else if (childX > 0){
                                    childX = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                if (childY < (-1)*(child.height()-parent.height())){
                                    childY = (-1)*(child.height()-parent.height());
                                }
                                else if (childY > 0){
                                    childY = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                prevX = currX;
                                prevY = currY;

                                if (parent.width() < child.width()){
                                    child.css('margin-left', childX);
                                }
                                
                                if (parent.height() < child.height()){
                                    child.css('margin-top', childY);
                                }
                            });

                            parent.bind('touchend', function(e){
                                if (!prototypes.isChromeMobileBrowser()){
                                    e.preventDefault();
                                }
                            });
                        },

			rgb2hex:function(rgb){// Convert RGB color to HEX
                            var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                            return (isNaN(rgb[1]) ? '00':hexDigits[(rgb[1]-rgb[1]%16)/16]+hexDigits[rgb[1]%16])+
                                   (isNaN(rgb[2]) ? '00':hexDigits[(rgb[2]-rgb[2]%16)/16]+hexDigits[rgb[2]%16])+
                                   (isNaN(rgb[3]) ? '00':hexDigits[(rgb[3]-rgb[3]%16)/16]+hexDigits[rgb[3]%16]);
			},
			idealTextColor:function(bgColor){// Set text color depending on the background color
			    var rgb = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(bgColor);
    
			    if (rgb != null){
			        return parseInt(rgb[1], 10)+parseInt(rgb[2], 10)+parseInt(rgb[3], 10) < 3*256/2 ? 'white' : 'black';
			    }
			    else{
			        return parseInt(bgColor.substring(0, 2), 16)+parseInt(bgColor.substring(2, 4), 16)+parseInt(bgColor.substring(4, 6), 16) < 3*256/2 ? 'white' : 'black';
			    }
			},

                        dateDiference:function(date1, date2){// Diference between 2 dates
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return parseInt(diff/(one_day))+1;
                        },
                        previousTime:function(time, size, type){
                            var timePieces = time.split(':'),
                            hours = parseInt(timePieces[0], 10),
                            minutes = timePieces[1] == undefined ? 0:parseInt(timePieces[1], 10),
                            seconds = timePieces[2] == undefined ? 0:parseInt(timePieces[2], 10);
                            
                            switch (type){
                                case 'seconds':
                                    seconds = seconds-size;
                                    
                                    if (seconds < 0){
                                        seconds = 60+seconds;
                                        minutes = minutes-1;
                                        
                                        if (minutes < 0){
                                            minutes = 60+minutes;
                                            hours = hours-1 < 0 ? 0:hours-1;
                                        }
                                    }
                                    break;
                                case 'minutes':
                                        minutes = minutes-size;
                                        
                                        if (minutes < 0){
                                            minutes = 60+minutes;
                                            hours = hours-1 < 0 ? 0:hours-1;
                                        }
                                    break;
                                default:
                                    hours = hours-size < 0 ? 0:hours-size;
                            }
                            
                            return prototypes.timeLongItem(hours)+(timePieces[1] == undefined ? '':':'+prototypes.timeLongItem(minutes)+(timePieces[2] == undefined ? '':':'+prototypes.timeLongItem(seconds)));
                        },
                        noDays:function(date1, date2){// Returns no of days between 2 days
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return Math.round(diff/(one_day))+1;
                        },
                        timeLongItem:function(item){// Return day/month with 0 in front if smaller then 10
                            if (item < 10){
                                return '0'+item;
                            }
                            else{
                                return item;
                            }
                        },
                        timeToAMPM:function(item){// Returns time in AM/PM format
                            var hour = parseInt(item.split(':')[0], 10),
                            minutes = item.split(':')[1],
                            result = '';
                            
                            if (hour == 0){
                                result = '12';
                            }
                            else if (hour > 12){
                                result = prototypes.timeLongItem(hour-12);
                            }
                            else{
                                result = prototypes.timeLongItem(hour);
                            }
                            
                            result += ':'+minutes+' '+(hour < 12 ? 'AM':'PM');
                            
                            return result;
                        },

                        stripslashes:function(str){// Remove slashes from string
                            return (str + '').replace(/\\(.?)/g, function (s, n1) {
                                switch (n1){
                                    case '\\':
                                        return '\\';
                                    case '0':
                                        return '\u0000';
                                    case '':
                                        return '';
                                    default:
                                        return n1;
                                }
                            });
                        },
                        
                        randomize:function(theArray){// Randomize the items of an array
                            theArray.sort(function(){
                                return 0.5-Math.random();
                            });
                            return theArray;
                        },
                        randomString:function(string_length){// Create a string with random elements
                            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
                            random_string = '';

                            for (var i=0; i<string_length; i++){
                                var rnum = Math.floor(Math.random()*chars.length);
                                random_string += chars.substring(rnum,rnum+1);
                            }
                            return random_string;
                        },

                        isIE8Browser:function(){// Detect the browser IE8
                            var isIE8 = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie 8') != -1){
                                isIE8 = true;
                            }
                            return isIE8;
                        },
                        isIEBrowser:function(){// Detect the browser IE
                            var isIE = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie') != -1){
                                isIE = true;
                            }
                            return isIE;
                        },
                        isChromeMobileBrowser:function(){// Detect the browser Mobile Chrome
                            var isChromeMobile = false,
                            agent = navigator.userAgent.toLowerCase();
                            
                            if ((agent.indexOf('chrome') != -1 || agent.indexOf('crios') != -1) && prototypes.isTouchDevice()){
                                isChromeMobile = true;
                            }
                            return isChromeMobile;
                        },
                        isAndroid:function(){// Detect the browser Mobile Chrome
                            var isAndroid = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('android') != -1){
                                isAndroid = true;
                            }
                            return isAndroid;
                        },
                        isTouchDevice:function(){// Detect touchscreen devices
                            var os = navigator.platform;
                            
                            if (os.toLowerCase().indexOf('win') != -1){
                                return window.navigator.msMaxTouchPoints;
                            }
                            else {
                                return 'ontouchstart' in document;
                            }
                        },

                        openLink:function(url, target){// Open a link
                            switch (target.toLowerCase()){
                                case '_blank':
                                    window.open(url);
                                    break;
                                case '_top':
                                    top.location.href = url;
                                    break;
                                case '_parent':
                                    parent.location.href = url;
                                    break;
                                default:    
                                    window.location = url;
                            }
                        },

                        validateCharacters:function(str, allowedCharacters){// Verify if a string contains allowed characters
                            var characters = str.split(''), i;

                            for (i=0; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) == -1){
                                    return false;
                                }
                            }
                            return true;
                        },
                        cleanInput:function(input, allowedCharacters, firstNotAllowed, min){// Remove characters that aren't allowed from a string
                            var characters = $(input).val().split(''),
                            returnStr = '', i, startIndex = 0;

                            if (characters.length > 1 && characters[0] == firstNotAllowed){
                                startIndex = 1;
                            }
                            
                            for (i=startIndex; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) != -1){
                                    returnStr += characters[i];
                                }
                            }
                                
                            if (min > returnStr){
                                returnStr = min;
                            }
                            
                            $(input).val(returnStr);
                        },
                        validEmail:function(email){// Validate email
                            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            
                            if (filter.test(email)){
                                return true;
                            }
                            return false;
                        },
                        
                        $_GET:function(variable){// Parse $_GET variables
                            var url = window.location.href.split('?')[1],
                            variables = url != undefined ? url.split('&'):[],
                            i; 
                            
                            for (i=0; i<variables.length; i++){
                                if (variables[i].indexOf(variable) != -1){
                                    return variables[i].split('=')[1];
                                    break;
                                }
                            }
                            
                            return undefined;
                        },
                        acaoBuster:function(dataURL){// Access-Control-Allow-Origin buster
                            var topURL = window.location.href,
                            pathPiece1 = '', pathPiece2 = '';
                            
                            if (dataURL.indexOf('https') != -1 || dataURL.indexOf('http') != -1){
                                if (topURL.indexOf('http://www.') != -1){
                                    pathPiece1 = prototypes.isSubdomain(dataURL) ? 'http://':'http://www.';
                                }
                                else if (topURL.indexOf('http://') != -1){
                                    pathPiece1 = 'http://';
                                }
                                else if (topURL.indexOf('https://www.') != -1){
                                    pathPiece1 = prototypes.isSubdomain(dataURL) ? 'https://':'https://www.';
                                }
                                else if (topURL.indexOf('https://') != -1){
                                    pathPiece1 = 'https://';
                                }
                                    
                                if (dataURL.indexOf('http://www.') != -1){
                                    pathPiece2 = dataURL.split('http://www.')[1];
                                }
                                else if (dataURL.indexOf('http://') != -1){
                                    pathPiece2 = dataURL.split('http://')[1];
                                }
                                else if (dataURL.indexOf('https://www.') != -1){
                                    pathPiece2 = dataURL.split('https://www.')[1];
                                }
                                else if (dataURL.indexOf('https://') != -1){
                                    pathPiece2 = dataURL.split('https://')[1];
                                }
                                
                                return pathPiece1+pathPiece2;
                            }
                            else{
                                return dataURL;
                            }
                        },
                        isSubdomain:function(url){
                            var subdomain;
 
                            url = url.replace(new RegExp(/^\s+/),""); // Remove white spaces from the begining of the url.
                            url = url.replace(new RegExp(/\s+$/),""); // Remove white spaces from the end of the url.
                            url = url.replace(new RegExp(/\\/g),"/"); // If found , convert back slashes to forward slashes.
                            url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),""); // If there, removes 'http://', 'https://' or 'ftp://' from the begining.
                            url = url.replace(new RegExp(/^www\./i),""); // If there, removes 'www.' from the begining.
                            url = url.replace(new RegExp(/\/(.*)/),""); // Remove complete string from first forward slaash on.
 
                            if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))){ // Remove '.??.??' or '.???.??' from end - e.g. '.CO.UK', '.COM.AU'
                                url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");
                            }
                            else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))){ // Removes '.??' or '.???' or '.????' from end - e.g. '.US', '.COM', '.INFO'
                                url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
                            }
                            subdomain = (url.match(new RegExp(/\./g))) ? true : false; // Check to see if there is a dot '.' left in the string.

                            return(subdomain);
                        },
                        
                        doHideBuster:function(item){// Make all parents & current item visible
                            var parent = item.parent(),
                            items = new Array();
                                
                            if (item.prop('tagName') != undefined && item.prop('tagName').toLowerCase() != 'body'){
                                items = prototypes.doHideBuster(parent);
                            }
                            
                            if (item.css('display') == 'none'){
                                item.css('display', 'block');
                                items.push(item);
                            }
                            
                            return items;
                        },
                        undoHideBuster:function(items){// Hide items in the array
                            var i;
                            
                            for (i=0; i<items.length; i++){
                                items[i].css('display', 'none');
                            }
                        },
                       
                        setCookie:function(c_name, value, expiredays){// Set cookie (name, value, expire in no days)
                            var exdate = new Date();
                            exdate.setDate(exdate.getDate()+expiredays);

                            document.cookie = c_name+"="+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString())+";javahere=yes;path=/";
                        },
                        readCookie:function(name){// Read cookie (name) 
                            var nameEQ = name+"=",
                            ca = document.cookie.split(";");

                            for (var i=0; i<ca.length; i++){
                                var c = ca[i];

                                while (c.charAt(0)==" "){
                                    c = c.substring(1,c.length);            
                                } 

                                if (c.indexOf(nameEQ) == 0){
                                    return unescape(c.substring(nameEQ.length, c.length));
                                } 
                            }
                            return null;
                        },
                        deleteCookie:function(c_name, path, domain){// Delete cookie (name, path, domain)
                            if (readCookie(c_name)){
                                document.cookie = c_name+"="+((path) ? ";path="+path:"")+((domain) ? ";domain="+domain:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
                            }
                        }
                    };

        return methods.init.apply(this);
    }
})(jQuery);