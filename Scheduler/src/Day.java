import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Alessandro on 26/11/2016.
 */
public class Day {

    private int day;
    private int freeHours;
    private boolean free;
    private List<Task> tasks = new ArrayList<>();

    public Day(int day) {
        this.day = day;
        freeHours = 6;
        free = true;
    }

    public int getFreeHours() {
        return freeHours;
    }

    public boolean isFree() {
        return free;
    }

    public void addTask(Task task) {
        tasks.add(task);
        freeHours -= task.getHours();
        if (freeHours < 0) {
            free = false;
        }
    }

    @Override
    public String toString() {
        return "Day " + day + ":\n\t" +
                tasks
                        .stream()
                        .map(t -> t.getName() + " " + t.getHours() + "hours \n\t")
                        .collect(Collectors.joining());
    }




}
