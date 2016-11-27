import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Alessandro on 26/11/2016.
 */
public class Scheduler {

    public static int today = 2;

    public static void main(String[] args) {
        Calendar calendar = new Calendar();
        List<Task> tasks = new ArrayList<>();
        initialiseTasks(tasks);
        schedule(tasks);
    }

    private static void schedule(List<Task> tasks) {
        tasks = sortTasksByPriorityThenByHours(tasks);
        tasks.forEach(t -> System.out.println(t.getPriority() + " " + t.getHours()));

        tasks.forEach(t -> {
            System.out.println("#####" + t.getName());
            int days = t.getEndDate() - t.getStartDate();
            int hoursCounter = t.getHours();
            int workingDays = t.getHours() / 4;
            System.out.println(workingDays);
            System.out.println(days);
                int interval = Math.floorDiv(days, workingDays);
                while (hoursCounter > 0) {
                    System.out.println("Here!");
                    for (int i = t.getStartDate(); i < t.getEndDate(); i++) {
                        int bestDay = i;
                        for (int j = i + 1; j < i + interval; j++) {
                            if (j < Calendar.getDays().size()) {
                                if (Calendar.getDays().get(j).getFreeHours() >=
                                        Calendar.getDays().get(bestDay).getFreeHours()) {
                                    bestDay = j;
                                }
                            }
                        }
                        Day day = Calendar.getDays().get(bestDay);
                        System.out.println(hoursCounter + " " + bestDay + " " + interval);
                        if (day.isFree()) {
                            int hours = Math.min(day.getFreeHours(), Math.min(4, hoursCounter));
                            day.addTask(new Task(t.getName(), hours));
                            hoursCounter -= hours;
                        }
                        i = bestDay;
                        if (hoursCounter <= 0) {
                            break;
                        }
                    }
                }
           // }

        });

        Calendar.getDays().forEach(d -> System.out.println(d.toString()));

    }



    private static void initialiseTasks(List<Task> tasks) {
        tasks.add(new Task("Maths", 8, 5, 8, 13));
        tasks.add(new Task("Programming", 20, 7, 3, 12));
        tasks.add(new Task("Compilers", 50, 10, 1, 28));
        tasks.add(new Task("Stats", 10, 5, 6, 17));
        tasks.add(new Task("Software Design", 10, 2, 19, 23));
    }

    private static List<Task> sortTasksByPriorityThenByHours(List<Task> tasks) {
        tasks = tasks.stream().sorted(Comparator.comparing(Task::getAbsolutePriority).
                thenComparing(Task::getPriority)).collect(Collectors.toList());
        Collections.reverse(tasks);
        return tasks;
    }

}
