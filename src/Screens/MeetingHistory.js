import { Text, TouchableOpacity, View } from "react-native";
import { COLOR_BG } from "../Color";
import { SafeArea } from "./StyleComponent";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const MettingHistory = ({ route, navigation }) => {
  return (
    <SafeArea>
      <View style={{ flex: 1, backgroundColor: COLOR_BG }}>
        <TouchableOpacity>
          <Text> 회의 세부 내용</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Calendar
          style={{ backgroundColor: COLOR_BG }}
          // Initially visible month. Default = now
          initialDate={"2023-01-16"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2012-05-10"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2023-01-16"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          //   renderArrow={(direction) => <Arrow />}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          firstDay={1}
          // Hide day names. Default = false
          //   hideDayNames={true}
          // Show week numbers to the left. Default = false
          //   showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter
          renderHeader={(date) => {
            return <Text>hello</Text>;
          }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </View>
    </SafeArea>
  );
};

export default MettingHistory;
