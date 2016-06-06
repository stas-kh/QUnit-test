var lcUtils = new Utils();

QUnit.test("notEmpty", function (assert) {
	assert.ok(lcUtils.isNotEmpty("32"));
	assert.ok(lcUtils.isNotEmpty("   "));
	assert.ok(lcUtils.isNotEmpty(" 34 23"));
	assert.ok(lcUtils.isNotEmpty("null"));
});

QUnit.test("getMessageKeyPart", function (assert) {
	var message = "Game.Bingo.Server|warning_round_failed_during_presentation|channel.Instant",
		partIndex = 1;

	assert.equal(lcUtils.getMessageKeyPart(message, partIndex), "warning_round_failed_during_presentation");
});

QUnit.test("wrongIndex", function (assert) {
	var message = "Game.Bingo.Server|warning_round_failed_during_presentation|channel.Instant",
		index = 33,
		errorMessage = "Index isn't found inside result. Test is failed";

	assert.throws(function () {
		lcUtils.getMessageKeyPart(message, index);
	}, Error, errorMessage);
});

QUnit.test("clone", function (assert) {
	var a = {
		prop: {
			a: true,
			b: true
		},
		grow: false
	};

	var b = lcUtils.clone(a);
	assert.equal(JSON.stringify(a), JSON.stringify(b));
	assert.equal(a.prop.a, b.prop.a);
	assert.equal(b.grow, false);
});

QUnit.test("observableTest", function (assert) {
	var rockets = {
		"B-123": new AltitudeNotifier(300, 12, ".rocket1"),
		"BCS-2355": new AltitudeNotifier(150, 10, ".rocket2")
	};

	rockets["B-123"].add(new Cosmonaut("Stas", "Kh"));
	rockets["B-123"].add(new Cosmonaut("Alink", "In"));
	rockets["B-123"].add(new Cosmonaut("Ole", "Pro"));
	assert.ok(rockets["B-123"].cosmonauts.length === 3);

	rockets["BCS-2355"].add(new Cosmonaut("Bombay", "Sapphire"));
	rockets["BCS-2355"].add(new Cosmonaut("Bob", "Marley"));
	rockets["BCS-2355"].add(new Cosmonaut("Jack", "Daniels"));
	rockets["BCS-2355"].add(new Cosmonaut("Calvin", "Klein"));
	rockets["BCS-2355"].add(new Cosmonaut("Kevin", "Hart"));
	rockets["BCS-2355"].add(new Cosmonaut("Tila", "Tequila"));
	assert.ok((rockets["BCS-2355"].cosmonauts instanceof Array) === true);
});
