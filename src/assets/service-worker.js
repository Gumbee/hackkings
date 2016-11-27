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

var Scheduler = function(data){
	this.calendar = new Calendar();
	this.tasks = [];

	this.initializeTasks(data);
	this.schedule();

	for(var i=0;i<this.calendar.days.length;i++){
		this.calendar.days[i].printTasks();
	}

	postMessage(this.calendar.days);
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

		var iterations = 0;

		while(hoursCounter>0 && iterations < this.tasks.length*2){
			console.log(this.tasks);
			console.log(this.tasks[i]);
			for (var j=this.tasks[i].startDate-1;j<this.tasks[i].endDate-1;j++) {
				var bestDay = j;

				for (var k=j+1;k<j+interval && k<this.tasks[i].endDate;k++) {
					if (k < this.calendar.days.length) {
						if (this.calendar.days[k].freeHours >= this.calendar.days[bestDay].freeHours) {
							console.log(this.calendar.days[k]);
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

			iterations++;
		}

	}
}

Scheduler.prototype.initializeTasks = function(data){
	for(var i=0;i<data.length;i++){
		this.tasks[this.tasks.length] = new Task(data[i].name, data[i].hours, data[i].priority, data[i].startDate, data[i].endDate);
	}
}

Scheduler.prototype.sortTasksByPriorityThenByHours = function(a, b){
    
    if(a.absolutePriority > b.absolutePriority){
    	return true;
    }else if(a.priority == b.priority){
    	return a.hours > b.hours;
    }else{
    	return false;
    }
}


onmessage = function(data) {
	var userData = data.data;
	var scheduler = new Scheduler(userData);
}