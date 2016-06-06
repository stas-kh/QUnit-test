var IObservable = function () {
	this.add = function () {
	};
	this.remove = function () {
	};
	this.notify = function () {
	};
};

var ISubscriber = function () {
	this.update = function () {
	};
};

var Cosmonaut = function (name, surname) {
	this.name = name;
	this.surname = surname;

	this.update = function (data) {
		console.log(this.name + " " + this.surname + " " + " is on : " + data + " altitude.");
	};
};
Cosmonaut.prototype = new ISubscriber();

var CosmonautsNotifier = function () {
	this.cosmonauts = [];

	this.add = function (cosmonaut) {
		this.cosmonauts.push(cosmonaut);
	};
	this.remove = function (cosmonaut) {
		this.cosmonauts.splice(this.indexOf(cosmonaut), 1);
	};
	this.indexOf = function (cosmonaut) {
		var len = this.cosmonauts.length,
			index = 0;
		for (; index < len; index++) {
			if (this.cosmonauts[index].name === cosmonaut.name && this.cosmonauts[index].surname === cosmonaut.surname) {
				return index;
			}
		}
		return -1;
	};

	this.notify = function (data) {
		this.cosmonauts.forEach(function (item) {
			item.update(data);
		})
	};
};
CosmonautsNotifier.prototype = new IObservable();

var AltitudeNotifier = function (speed, airResistance, container) {
	this.cosmonauts = [];
	this.speed = speed;
	this.airResistance = airResistance;
	this.altitude = 0;
	this.currentAltitude = 0;

	this.STATUS_UPDATE_INTERVAL_MS = 500;
	this.STEP_TO_NOTIFY = 500;

	this.step = this.speed / this.airResistance;

	this.start = function () {
		var _self = this;
		setInterval(function () {
			_self.altitude += _self.step;
			_self.currentAltitude += _self.step;
			_self.updateView();

			if (_self.currentAltitude > _self.STEP_TO_NOTIFY) {
				_self.currentAltitude = 0;
				console.log("---------------------------------------------------");
				_self.notify(_self.altitude);
				console.log("---------------------------------------------------\n");

			}
		}, _self.STATUS_UPDATE_INTERVAL_MS);
	};

	this.updateView = function () {
		document.querySelector(container).style.left = this.altitude + "px";
	};
};
AltitudeNotifier.prototype = new CosmonautsNotifier();