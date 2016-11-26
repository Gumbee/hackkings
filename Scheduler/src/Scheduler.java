import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Alessandro on 26/11/2016.
 */
public class Scheduler {

    public static void main(String[] args) {
        Calendar calendar = new Calendar();
        List<Task> tasks = new ArrayList<>();
        initialiseTasks(tasks);
        schedule(calendar, tasks);
    }

    private static void schedule(Calendar calendar, List<Task> tasks) {
        tasks = sortTasksByPriorityThenByHours(tasks);
        tasks.forEach(t -> System.out.println(t.getPriority() + " " + t.getHours()));
    }



    private static void initialiseTasks(List<Task> tasks) {
        tasks.add(new Task("Maths", 8, 5, 8, 13));
        tasks.add(new Task("Programming", 20, 7, 3, 12));
        tasks.add(new Task("Compilers", 50, 10, 1, 30));
        tasks.add(new Task("Stats", 10, 5, 6, 10));
        tasks.add(new Task("Software Design", 4, 2, 19, 23));
    }

    private static List<Task> sortTasksByPriorityThenByHours(List<Task> tasks) {
        tasks = tasks.stream().sorted(Comparator.comparing(Task::getPriority).thenComparing(Task::getHours)).collect(Collectors.toList());
        Collections.reverse(tasks);
        return tasks;
    }

}
