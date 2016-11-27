/**
 * Created by Alessandro on 26/11/2016.
 */


public class Task {

    private int hours;
    private int priority;
    private int startDate;
    private int endDate;
    private String name;

    public Task(String name, int hours, int priority, int startDate, int endDate) {
        this.name = name;
        this.hours = hours;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Task(String name, int hours) {
        this.name = name;
        this.hours = hours;
    }

    public String getName() {
        return name;
    }

    public int getHours() {
        return hours;
    }

    public int getPriority() {
        return priority;
    }

    public int getStartDate() {
        return startDate;
    }

    public int getEndDate() {
        return endDate;
    }

}
