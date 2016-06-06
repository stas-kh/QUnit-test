var Utils = function () {
	this.isNotEmpty = function (value) {
		if (value !== null && value !== undefined && value !== "") {
			return true;
		} else {
			return false;
		}
	};
	this.getMessageKeyPart = function (key, partIndex) {
		return key.split("|")[partIndex].split(".").join("__");
	};
	this.clone = function (obj) {
		var copy;
		if (null === obj || "object" !== typeof obj) {
			return obj;
		}
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = this.clone(obj[i]);
			}
			return copy;
		}
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) {
					copy[attr] = this.clone(obj[attr]);
				}
			}
			return copy;
		}
	};
};