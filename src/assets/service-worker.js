var data = [];

var Calendar = function(){
	this.days = [];

	this.initializeDays();
}

var Day = function(day){
	this.day = day;
	this.freeHours = 6;
	this.isFree = true;
	this.tasks = [];
}

var Task = function(name, hours, priority, startDate, endDate){
	this.name = name;
	this.hours = hours;
	this.priority = priority;
	this.startDate = startDate;
	this.endDate = endDate;
	this.absolutePriority = hours/(endDate-startDate);
}

var Scheduler = function(){
	this.calendar = new Calendar();
	this.tasks = [];

	this.initializeTasks();
	this.schedule();

	for(var i=0;i<this.calendar.days.length;i++){
		this.calendar.days[i].printTasks();
	}
}

Calendar.prototype.initializeDays = function() {
	for(var i=0;i<31;i++){
		this.days[this.days.length] = new Day(i);
	}
};

Day.prototype.addTask = function(task){
	this.tasks[this.tasks.length] = task;
	this.freeHours -= task.hours;
	if(this.freeHours <= 0){
		this.isFree = false;
	}
}

Day.prototype.printTasks = function(){
	console.log("Day " + this.day + ":\n");
	for(var i=0;i<this.tasks.length;i++){
		console.log(this.tasks[i].name + " is occupying " + this.tasks[i].hours + " hours.");
	}
}

Scheduler.prototype.schedule = function(tasks) {
	this.tasks.sort(this.tasks.sortTasksByPriorityThenByHours);

	for(var i=0;i<this.tasks.length;i++){
		var days = this.tasks[i].endDate - this.tasks[i].startDate;
		var hoursCounter = this.tasks[i].hours;
		var workingDays = this.tasks[i].hours/4;

		var interval = Math.floor((days/workingDays));

		while(hoursCounter>0){
			console.log(this.tasks);
			for (var j=this.tasks[i].startDate;j<this.tasks[i].endDate;j++) {
				var bestDay = j;

				for (var k=j+1;k<j+interval;k++) {
					if (k < this.calendar.days.length) {
						if (this.calendar.days[k].freeHours >= this.calendar.days[bestDay].freeHours) {
							bestDay = k;
						}
					}
				}

				var day = this.calendar.days[bestDay];

				console.log(hoursCounter + " " + bestDay + " " + interval);
				if (day.isFree) {
					var hours = Math.min(day.freeHours, Math.min(4, hoursCounter));
					day.addTask(new Task(this.tasks[i].name, hours));
					hoursCounter -= hours;
				}
				j = bestDay;
				if (hoursCounter <= 0) {
					break;
				}
			}

		}

	}
}

Scheduler.prototype.initializeTasks = function(){
    this.tasks[this.tasks.length] = new Task("Maths", 8, 5, 8, 13);
    this.tasks[this.tasks.length] = new Task("Programming", 20, 7, 3, 12);
    this.tasks[this.tasks.length] = new Task("Compilers", 50, 10, 1, 28);
    this.tasks[this.tasks.length] = new Task("Stats", 10, 5, 6, 17);
    this.tasks[this.tasks.length] = new Task("Software Design", 10, 2, 19, 23);
}

Scheduler.prototype.sortTasksByPriorityThenByHours = function(a, b){
    
    if(a.absolutePriority > b.absolutePriority){
    	return true;
    }else if(a.absolutePriority == b.absolutePriority){
    	return a.hours > b.hours;
    }else{
    	return false;
    }
}

var scheduler = new Scheduler();

onmessage = function(data) {
	this.data = data.data;
}