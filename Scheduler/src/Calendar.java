import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alessandro on 26/11/2016.
 */
public class Calendar {

    private static List<Day> days = new ArrayList<>();

    public Calendar() {
        intialiseDays();
    }

    public static List<Day> getDays() {
        return days;
    }

    private void intialiseDays() {
        for (int i = 0; i < 30; i++) {
            days.add(new Day(i));
        }
    }

}
